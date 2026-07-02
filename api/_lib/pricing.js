// Product prices in Naira — update here when prices change
export const products = {
  1: 5000,  // Cobalt Elastic Strap
  2: 5000,  // Red Elastic Strap
  3: 6000,  // Ridge Teal
  4: 6000,  // Ridge Bronze
  5: 6000,  // Ridge Onyx
  6: 6000,  // Ridge Scarlet
  7: 6000,  // Ridge Navy
  8: 6000,  // Orbit Onyx
  9: 6000,  // Orbit Scarlet
  10: 6000, // Orbit Navy
  11: 6000, // Orbit Bronze
  12: 6000, // Orbit Pine
}

// Delivery fees per Nigerian state in Naira — update here when logistics pricing changes
export const deliveryFees = {
  "Abia": 3500, "Adamawa": 5000, "Akwa Ibom": 4000, "Anambra": 3500,
  "Bauchi": 5000, "Bayelsa": 4500, "Benue": 4500, "Borno": 5500,
  "Cross River": 4000, "Delta": 3500, "Ebonyi": 4000, "Edo": 3500,
  "Ekiti": 3500, "Enugu": 3500, "FCT Abuja": 3000, "Gombe": 5000,
  "Imo": 3500, "Jigawa": 5500, "Kaduna": 5000, "Kano": 5000,
  "Katsina": 5500, "Kebbi": 5500, "Kogi": 4500, "Kwara": 4000,
  "Lagos": 2500, "Nasarawa": 4500, "Niger": 4500, "Ogun": 2500,
  "Ondo": 3500, "Osun": 3500, "Oyo": 3000, "Plateau": 4500,
  "Rivers": 4000, "Sokoto": 5500, "Taraba": 5000, "Yobe": 5500,
  "Zamfara": 5500,
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