import {
  validateCart,
  calculateTotal,
  buildOrderSummary,
  CUSTOMISATION_FEE,
} from "./_lib/pricing.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference, cart, deliveryState, orderDetails } = req.body;

  try {
    // ===== VALIDATE REFERENCE =====
    if (!reference || typeof reference !== "string") {
      return res.status(400).json({ error: "A valid reference is required" });
    }

    // ===== VALIDATE CART =====
    if (!await validateCart(cart, res)) return;

    // ===== VALIDATE DELIVERY STATE =====
    if (!deliveryState || !deliveryState.trim()) {
      return res.status(400).json({ error: "Delivery state is required" });
    }

    // ===== CALCULATE EXPECTED AMOUNT =====
    const expectedAmount = await calculateTotal(cart, deliveryState);

    // ===== VERIFY WITH PAYSTACK =====
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    if (!verifyResponse.ok) {
      return res
        .status(502)
        .json({ error: "Could not reach Paystack to verify payment" });
    }

    const data = await verifyResponse.json();

    if (data.status !== true) {
      return res
        .status(400)
        .json({ error: "Paystack verification request failed" });
    }

    if (data.data.status !== "success") {
      return res.status(400).json({ error: "Payment was not successful" });
    }

    if (data.data.reference !== reference) {
      return res
        .status(400)
        .json({ error: "Reference mismatch — possible tampering detected" });
    }

    if (data.data.currency !== "NGN") {
      return res
        .status(400)
        .json({ error: "Unexpected currency — only NGN is supported" });
    }

    const amountPaid = data.data.amount / 100;

    if (amountPaid !== expectedAmount) {
      return res.status(400).json({
        error: "Payment amount mismatch — possible tampering detected",
      });
    }

    // ===== BUILD ORDER SUMMARY =====
    const summary = await buildOrderSummary(cart, deliveryState);

    // ===== SAVE ORDER TO SUPABASE =====
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseAdmin = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      );

      // ── Idempotency check: reject duplicate references ──
      // The UNIQUE constraint on paystack_reference is the primary guard,
      // but this check returns a clean 409 instead of a raw DB error.
      const { data: existing } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("paystack_reference", reference)
        .maybeSingle();

      if (existing) {
        // Reference already processed — return success without creating a duplicate
        return res.status(200).json({
          verified: true,
          amountPaid,
          customerEmail: data.data.customer.email,
          paidAt: data.data.paid_at,
          duplicate: true,
        });
      }

      // Sanitise customer-supplied strings saved to the database
      // (these come from the browser; trim and enforce max length)
      const safeName    = String(orderDetails?.customer_name  || "").slice(0, 200).trim();
      const safeEmail   = String(orderDetails?.customer_email || "").slice(0, 254).trim();
      const safePhone   = String(orderDetails?.customer_phone || "").slice(0, 20).trim();
      const safeAddress = String(orderDetails?.customer_address || "").slice(0, 500).trim();
      const safeDeliveryOption = String(orderDetails?.delivery_option || "").slice(0, 50).trim();
      const safeNote = String(orderDetails?.order_note || "").slice(0, 1000).trim();

      // Insert the order record
      const { data: savedOrder, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          paystack_reference: reference,
          customer_name: safeName,
          customer_email: safeEmail,
          customer_phone: safePhone,
          delivery_state: deliveryState,
          delivery_option: safeDeliveryOption,
          delivery_address: safeAddress,
          order_note: safeNote || null,
          delivery_fee: summary.deliveryFee * 100,
          products_total: summary.productsTotal * 100,
          customisation_total: summary.customisationTotal * 100,
          grand_total: summary.grandTotal * 100,
          payment_status: "paid",
          paid_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (orderError) {
        // Unique constraint violation means the reference was just processed
        // in a concurrent request — safe to treat as duplicate
        if (orderError.code === "23505") {
          return res.status(200).json({
            verified: true,
            amountPaid,
            customerEmail: data.data.customer.email,
            paidAt: data.data.paid_at,
            duplicate: true,
          });
        }
        console.error("Order save error:", orderError.code, orderError.message);
      } else {
        // Build order items using prices from the already-fetched summary
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
          console.error("Order items save error:", itemsError);
        } else {
          console.log("Order saved to Supabase:", savedOrder.id);
        }
      }
    } catch (dbError) {
      console.error("Database error:", dbError);
      // Never block payment confirmation over a DB error
    }

    // ===== BUILD EMAIL PARAMS =====
    // Re-use the already-sanitised strings from the DB insert above.
    // If the order save failed (savedOrder undefined), fall back to sanitised strings.
    const safeName2    = String(orderDetails?.customer_name  || "").slice(0, 200).trim();
    const safeEmail2   = String(orderDetails?.customer_email || "").slice(0, 254).trim();
    const safePhone2   = String(orderDetails?.customer_phone || "").slice(0, 20).trim();
    const safeAddress2 = String(orderDetails?.customer_address || "").slice(0, 500).trim();
    const safeDelivOpt = String(orderDetails?.delivery_option || "").slice(0, 50).trim();
    const safeState    = String(orderDetails?.customer_state || deliveryState).slice(0, 100).trim();
    const safeNote2    = String(orderDetails?.order_note || "").slice(0, 1000).trim();

    const sharedParams = {
      customer_name: safeName2,
      customer_email: safeEmail2,
      customer_phone: safePhone2,
      customer_state: safeState,
      delivery_option: safeDelivOpt,
      customer_address: safeAddress2,
      delivery_fee: `₦${summary.deliveryFee.toLocaleString()}`,
      order_total: `₦${summary.grandTotal.toLocaleString()}`,
      payment_status: "Paid via Paystack",
      payment_reference: reference,
      email_subject: `🟢 New Paid Order ${orderDetails?.customer_name || "Customer"}`,
      order_summary_html: summary.html,
      message: "",
      order_items: "",
      order_note: safeNote2 || "—",
    };

    // ===== SEND EMAILS =====
    const sendEmail = async (templateId, params) => {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: templateId,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
            template_params: params,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`EmailJS failed (${response.status}): ${errorText}`);
      }

      return response;
    };

    try {
      await Promise.all([
        sendEmail(process.env.EMAILJS_ORDER_TEMPLATE_ID, {
          ...sharedParams,
          email_subject: `New Order from ${orderDetails?.customer_name || "Customer"}`,
        }),
        sendEmail(process.env.EMAILJS_CUSTOMER_TEMPLATE_ID, {
          ...sharedParams,
          email_subject: `Order Confirmed — Thank You ${orderDetails?.customer_name || ""}!`,
        }),
      ]);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    return res.status(200).json({
      verified: true,
      amountPaid,
      customerEmail: data.data.customer.email,
      paidAt: data.data.paid_at,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong verifying payment" });
  }
}