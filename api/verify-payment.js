import { validateCart, calculateTotal, buildOrderSummary } from './_lib/pricing.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { reference, cart, deliveryState, orderDetails } = req.body

  try {
    // ===== VALIDATE REFERENCE =====
    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({ error: 'A valid reference is required' })
    }

    // ===== VALIDATE CART =====
    if (!validateCart(cart, res)) return

    // ===== VALIDATE DELIVERY STATE =====
    if (!deliveryState || !deliveryState.trim()) {
      return res.status(400).json({ error: 'Delivery state is required' })
    }

    // ===== CALCULATE EXPECTED AMOUNT =====
    const expectedAmount = calculateTotal(cart, deliveryState)

    // ===== VERIFY WITH PAYSTACK =====
    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    if (!verifyResponse.ok) {
      return res.status(502).json({ error: 'Could not reach Paystack to verify payment' })
    }

    const data = await verifyResponse.json()

    if (data.status !== true) {
      return res.status(400).json({ error: 'Paystack verification request failed' })
    }

    if (data.data.status !== 'success') {
      return res.status(400).json({ error: 'Payment was not successful' })
    }

    if (data.data.reference !== reference) {
      return res.status(400).json({ error: 'Reference mismatch — possible tampering detected' })
    }

    if (data.data.currency !== 'NGN') {
      return res.status(400).json({ error: 'Unexpected currency — only NGN is supported' })
    }

    const amountPaid = data.data.amount / 100

    if (amountPaid !== expectedAmount) {
      return res.status(400).json({
        error: 'Payment amount mismatch — possible tampering detected',
      })
    }

    // ===== BUILD ORDER SUMMARY HTML =====
    // Generated server-side from the same pricing constants used above.
    // Totals in both emails are guaranteed to match what Paystack charged.
    const summary = buildOrderSummary(cart, deliveryState)

    // ===== BUILD EMAIL PARAMS =====
    // Shared fields sent to both seller and customer templates
    const sharedParams = {
      customer_name:    orderDetails?.customer_name    || '',
      customer_email:   orderDetails?.customer_email   || '',
      customer_phone:   orderDetails?.customer_phone   || '',
      customer_state:   orderDetails?.customer_state   || deliveryState,
      delivery_option:  orderDetails?.delivery_option  || '',
      customer_address: orderDetails?.customer_address || '',
      delivery_fee:     `₦${summary.deliveryFee.toLocaleString()}`,
      order_total:      `₦${summary.grandTotal.toLocaleString()}`,
      payment_status:   'Paid via Paystack',
      payment_reference: reference,
      email_subject:    `🟢 New Paid Order ${orderDetails?.customer_name || 'Customer'}`,
      // Dynamic order summary HTML — replaces static order_items table
      order_summary_html: summary.html,
      // Legacy fields kept for backward compatibility with existing template variables
      message: '',
      order_items: '',
    }

    // ===== SEND EMAILS =====
    const sendEmail = async (templateId, params) => {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:    process.env.EMAILJS_SERVICE_ID,
          template_id:   templateId,
          user_id:       process.env.EMAILJS_PUBLIC_KEY,
          accessToken:   process.env.EMAILJS_PRIVATE_KEY,
          template_params: params,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`EmailJS failed (${response.status}): ${errorText}`)
      }

      return response
    }

    try {
      await Promise.all([
        // Seller email — full production order sheet
        sendEmail(process.env.EMAILJS_ORDER_TEMPLATE_ID, {
          ...sharedParams,
          email_subject: `New Order from ${orderDetails?.customer_name || 'Customer'}`,
        }),
        // Customer email — clean order confirmation
        sendEmail(process.env.EMAILJS_CUSTOMER_TEMPLATE_ID, {
          ...sharedParams,
          email_subject: `Order Confirmed — Thank You ${orderDetails?.customer_name || ''}!`,
        }),
      ])
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message)
      // Payment already verified — do not fail the request over email
    }

    return res.status(200).json({
      verified: true,
      amountPaid,
      customerEmail: data.data.customer.email,
      paidAt: data.data.paid_at,
    })

  } catch (error) {
    console.error('Verify payment error:', error)
    return res.status(500).json({ error: 'Something went wrong verifying payment' })
  }
}