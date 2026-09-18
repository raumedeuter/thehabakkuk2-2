import { validateCart, calculateTotal } from './_lib/pricing.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { cart, deliveryState, email } = req.body

  try {
    // ===== VALIDATE EMAIL =====
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'A valid email is required' })
    }

    // ===== VALIDATE CART =====
    if (!await validateCart(cart, res)) return

    // ===== VALIDATE DELIVERY STATE =====
    if (!deliveryState || !deliveryState.trim()) {
      return res.status(400).json({ error: 'Delivery state is required' })
    }

    // ===== CALCULATE TOTAL (now async) =====
    const total = await calculateTotal(cart, deliveryState)

    // ===== INITIALIZE WITH PAYSTACK =====
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: total * 100,
        currency: 'NGN',
      }),
    })

    if (!paystackResponse.ok) {
      return res.status(502).json({ error: 'Could not reach Paystack to initialize payment' })
    }

    const data = await paystackResponse.json()

    if (data.status !== true) {
      return res.status(400).json({ error: 'Could not initialize payment' })
    }

    return res.status(200).json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
      amount: total,
    })

  } catch (error) {
    console.error('Initialize payment error:', error)
    return res.status(500).json({ error: error.message || 'Something went wrong initializing payment' })
  }
}