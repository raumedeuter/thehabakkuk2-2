import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import {
  buildOrderSummary,
  validateCart,
  CUSTOMISATION_FEE,
} from "./_lib/pricing.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── 1. Verify Paystack webhook signature ──
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("PAYSTACK_SECRET_KEY not set");
    return res.status(500).end();
  }

  const paystackSignature = req.headers["x-paystack-signature"];
  if (!paystackSignature) {
    return res.status(400).json({ error: "Missing signature" });
  }

  const rawBody =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body);

  const expectedSig = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  if (expectedSig !== paystackSignature) {
    console.warn("Webhook signature mismatch — possible spoofing attempt");
    return res.status(401).json({ error: "Invalid signature" });
  }

  // ── 2. Parse the event ──
  let event;
  try {
    event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (event.event !== "charge.success") {
    return res.status(200).json({ received: true });
  }

  const paymentData = event.data;
  const reference = paymentData?.reference;

  if (!reference) {
    return res.status(400).json({ error: "Missing reference in webhook event" });
  }

  // ── 3. Idempotency check ──
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  const { data: existing } = await supabaseAdmin
    .from("orders")
    .select("id")
    .eq("paystack_reference", reference)
    .maybeSingle();

  if (existing) {
    return res.status(200).json({ received: true, duplicate: true });
  }

  // ── 4. Re-verify with Paystack API ──
  const verifyResponse = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secret}` } },
  );

  if (!verifyResponse.ok) {
    console.error("Could not verify webhook transaction with Paystack API");
    return res.status(502).json({ error: "Could not verify with Paystack" });
  }

  const verifyData = await verifyResponse.json();

  if (
    verifyData.status !== true ||
    verifyData.data.status !== "success" ||
    verifyData.data.reference !== reference ||
    verifyData.data.currency !== "NGN"
  ) {
    console.warn("Webhook transaction failed verification", reference);
    return res.status(400).json({ error: "Transaction verification failed" });
  }

  // ── 5. Check for cart metadata ──
  const metadata = verifyData.data.metadata || {};
  const cart = metadata.cart;
  const deliveryState = metadata.deliveryState;

  if (!cart || !deliveryState) {
    console.log("Webhook received but no cart metadata — browser flow handles this order.");
    return res.status(200).json({ received: true });
  }

  // ── 6. Validate and calculate ──
  let cartError = null;
  const fakeRes = {
    status: () => ({ json: (body) => { cartError = body; } }),
  };

  const cartValid = await validateCart(cart, fakeRes);
  if (!cartValid) {
    console.error("Webhook cart validation failed:", cartError);
    return res.status(200).json({ received: true });
  }

  const summary = await buildOrderSummary(cart, deliveryState);
  const amountPaid = verifyData.data.amount / 100;

  if (amountPaid !== summary.grandTotal) {
    console.error(
      `Webhook amount mismatch: paid ${amountPaid}, expected ${summary.grandTotal}`,
      reference,
    );
    return res.status(200).json({ received: true });
  }

  // ── 7. Save the order ──
  const customerEmail = verifyData.data.customer?.email || "";

  const { data: savedOrder, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      paystack_reference: reference,
      customer_name: metadata.customer_name || "",
      customer_email: customerEmail,
      customer_phone: metadata.customer_phone || "",
      delivery_state: deliveryState,
      delivery_option: metadata.delivery_option || "",
      delivery_address: metadata.delivery_address || "",
      delivery_fee: summary.deliveryFee * 100,
      products_total: summary.productsTotal * 100,
      customisation_total: summary.customisationTotal * 100,
      grand_total: summary.grandTotal * 100,
      payment_status: "paid",
      paid_at: verifyData.data.paid_at || new Date().toISOString(),
      created_via: "webhook",
    })
    .select()
    .single();

  if (orderError) {
    if (orderError.code === "23505") {
      return res.status(200).json({ received: true, duplicate: true });
    }
    console.error("Webhook order save error:", orderError.message);
    return res.status(500).json({ error: "Failed to save order" });
  }

  // ── 8. Save order items ──
  const orderItems = cart.map((item) => {
    const unitPrice = summary.priceMap[item.id];
    const customFee = item.isCustomised ? CUSTOMISATION_FEE : 0;
    const subtotal = (unitPrice + customFee) * item.quantity;
    return {
      order_id: savedOrder.id,
      product_name: item.name,
      variant_color: item.color || "",
      quantity: item.quantity,
      unit_price: unitPrice * 100,
      is_customised: item.isCustomised || false,
      customisation_font: item.customisation?.font || null,
      customisation_message: item.customisation?.message || null,
      customisation_fee: customFee * 100,
      subtotal: subtotal * 100,
    };
  });

  const { error: itemsError } = await supabaseAdmin
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Webhook order items error:", itemsError.message);
  }

  console.log("Webhook: order saved successfully", savedOrder.id, reference);
  return res.status(200).json({ received: true });
}