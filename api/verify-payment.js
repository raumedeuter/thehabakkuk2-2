import { validateCart, calculateTotal } from "./_lib/pricing.js";

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
    if (!validateCart(cart, res)) return;

    // // ===== VALIDATE DELIVERY STATE =====
    // if (!deliveryState || deliveryFees[deliveryState] === undefined) {
    //   return res.status(400).json({ error: "Invalid delivery state" });
    // }

    // ===== CALCULATE EXPECTED AMOUNT =====
    const expectedAmount = calculateTotal(cart, deliveryState);

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

    console.log("Cart:", cart);
    console.log("Expected:", expectedAmount);
    console.log("Paid:", amountPaid);

    if (amountPaid !== expectedAmount) {
      return res.status(400).json({
        error: "Payment amount mismatch — possible tampering detected",
      });
    }

    // ===== SEND EMAILS =====
    const sendEmail = async (templateId, templateParams) => {
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
            template_params: templateParams,
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
        sendEmail(process.env.EMAILJS_ORDER_TEMPLATE_ID, orderDetails),
        sendEmail(process.env.EMAILJS_CUSTOMER_TEMPLATE_ID, orderDetails),
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
