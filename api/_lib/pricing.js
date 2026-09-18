import { createClient } from "@supabase/supabase-js";

export const CUSTOMISATION_FEE = 1000;

function getSupabase() {
  return createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

// ===== FETCH PRODUCT PRICES FROM SUPABASE =====
async function getProductPrices(numericIds) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("numeric_id, price")
    .in("numeric_id", numericIds);

  if (error) throw new Error("Failed to fetch product prices: " + error.message);

  const map = {};
  for (const row of data) {
    map[row.numeric_id] = row.price / 100; // stored in kobo, return in Naira
  }
  return map;
}

// ===== FETCH DELIVERY FEE FROM SUPABASE =====
async function getDeliveryFee(state) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("delivery_fees")
    .select("fee_kobo")
    .eq("state", state)
    .single();

  if (error || !data) {
    throw new Error(`Unknown delivery state: ${state}`);
  }

  return data.fee_kobo / 100; // return in Naira
}

// ===== VALIDATE CART =====
export async function validateCart(cart, res) {
  if (!Array.isArray(cart) || cart.length === 0) {
    res.status(400).json({ error: "Cart is empty or invalid" });
    return false;
  }

  const numericIds = cart.map((item) => item.id);
  let priceMap;
  try {
    priceMap = await getProductPrices(numericIds);
  } catch (err) {
    res.status(500).json({ error: "Failed to validate products" });
    return false;
  }

  for (const item of cart) {
    if (priceMap[item.id] === undefined) {
      res.status(400).json({ error: `Invalid product id: ${item.id}` });
      return false;
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      res.status(400).json({ error: `Invalid quantity for product ${item.id}` });
      return false;
    }
  }

  return true;
}

// ===== CALCULATE TOTAL =====
export async function calculateTotal(cart, deliveryState) {
  const numericIds = cart.map((item) => item.id);
  const [priceMap, deliveryFee] = await Promise.all([
    getProductPrices(numericIds),
    getDeliveryFee(deliveryState),
  ]);

  const productsTotal = cart.reduce((sum, item) => {
    const basePrice = priceMap[item.id];
    const customFee = item.isCustomised ? CUSTOMISATION_FEE : 0;
    return sum + (basePrice + customFee) * item.quantity;
  }, 0);

  return productsTotal + deliveryFee;
}

// ===== BUILD ORDER SUMMARY =====
export async function buildOrderSummary(cart, deliveryState) {
  const numericIds = cart.map((item) => item.id);
  const [priceMap, deliveryFee] = await Promise.all([
    getProductPrices(numericIds),
    getDeliveryFee(deliveryState),
  ]);

  let productsTotal = 0;
  let customisationTotal = 0;

  const rows = cart.map((item) => {
    const basePrice = priceMap[item.id];
    const customFee = item.isCustomised ? CUSTOMISATION_FEE : 0;
    const lineTotal = (basePrice + customFee) * item.quantity;
    productsTotal += basePrice * item.quantity;
    customisationTotal += customFee * item.quantity;

    return `<tr>
      <td style="padding:8px;border:1px solid #e5e7eb;">${item.name}${item.color ? ` — ${item.color}` : ""}</td>
      <td style="padding:8px;border:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #e5e7eb;">${item.isCustomised ? "Yes" : "No"}</td>
      <td style="padding:8px;border:1px solid #e5e7eb;text-align:right;">₦${lineTotal.toLocaleString()}</td>
    </tr>`;
  });

  const grandTotal = productsTotal + customisationTotal + deliveryFee;

  const html = `
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <thead>
        <tr style="background:#f9f5f0;">
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Item</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;">Qty</th>
          <th style="padding:8px;border:1px solid #e5e7eb;">Personalised</th>
          <th style="padding:8px;border:1px solid #e5e7eb;text-align:right;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows.join("")}</tbody>
    </table>`;

  return { productsTotal, customisationTotal, deliveryFee, grandTotal, html, priceMap };
}