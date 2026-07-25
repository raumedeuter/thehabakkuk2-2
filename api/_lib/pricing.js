// Product prices in Naira — update here when prices change
export const products = {
  1: 6000,  // Loom Journal
  2: 7000,  // Ridge Journal Gift Set
  3: 6000,  // Y-Axis Journal
  4: 5000,  // Elastic Strap Journal
  5: 6000,  // Ridge Journal
  6: 6000,  // Orbit Journal Gift Set
  7: 6000,  // Horizon Journal
  8: 6000,  // Frame Journal
  9: 6000,  // Slate Journal
  10: 6000, // Archive Journal
  11: 6000, // Steady Suede Journal
  12: 6000, // Grain Journal Gift Set

}

// Delivery fees per Nigerian state in Naira — update here when logistics pricing changes
export const deliveryFees = {
  "Abia": 5000, "Adamawa": 7000, "Akwa Ibom": 7000, "Anambra": 7000,
  "Bauchi": 7000, "Bayelsa": 7000, "Benue": 7000, "Borno": 7000,
  "Cross River": 7000, "Delta": 7000, "Ebonyi": 7000, "Edo": 7000,
  "Ekiti": 7000, "Enugu": 7000, "FCT Abuja": 7000, "Gombe": 7000,
  "Imo": 7000, "Jigawa": 7000, "Kaduna": 7000, "Kano": 7000,
  "Katsina": 7000, "Kebbi": 7000, "Kogi": 7000, "Kwara": 7000,
  "Lagos": 7000, "Nasarawa": 7000, "Niger": 7000, "Ogun": 7000,
  "Ondo": 7000, "Osun": 7000, "Oyo": 7000, "Plateau": 7000,
  "Rivers": 7000, "Sokoto": 7000, "Taraba": 7000, "Yobe": 7000,
  "Zamfara": 7000,
}

/**
 * Validates cart items against known products.
 * Returns true if valid, sends a 400 response and returns false if invalid.
 * Maximum quantity per item is 100.
 */
export const validateCart = (cart, res) => {
  if (!Array.isArray(cart) || cart.length === 0) {
    res.status(400).json({ error: 'Cart must be a non-empty array' })
    return false
  }

  for (const item of cart) {
    const validId = Number.isInteger(item.id) && products[item.id] !== undefined
    const validQuantity = Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 100

    if (!validId) {
      res.status(400).json({ error: `Invalid product id: ${item.id}` })
      return false
    }
    if (!validQuantity) {
      res.status(400).json({ error: `Invalid quantity for product id: ${item.id} — must be between 1 and 100` })
      return false
    }
  }

  return true
}

/**
 * Calculates the total order amount including delivery fee.
 * Throws an error if the delivery state is not recognised.
 */
export const calculateTotal = (cart, deliveryState) => {
  if (!deliveryState || deliveryFees[deliveryState] === undefined) {
    throw new Error(`Invalid delivery state: ${deliveryState}`)
  }

  const subtotal = cart.reduce((sum, item) => {
    return sum + products[item.id] * item.quantity
  }, 0)

  const deliveryFee = deliveryFees[deliveryState]
  return subtotal + deliveryFee
}