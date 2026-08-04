// ─── Product prices in Naira ─────────────────────────────────────────────────
// Update prices here only. Changes apply to validation, checkout and emails.
export const products = {
  1:  8000,  // Loom Journal
  2:  0,     // Ridge Gift Set (N/A)
  3:  5500,  // Y-Axis Journal
  4:  5000,  // Elastic Strap Journal
  5:  5000,  // Ridge Journal
  6:  0,     // Orbit Gift Set (N/A)
  7:  6500,  // Horizon Journal
  8:  6500,  // Frame Journal
  9:  5500,  // Slate Journal
  10: 6500,  // Archive Journal
  11: 6500,  // Steady Suede Journal
  12: 13000, // Grain Gift Set
  13: 7000,  // Denim Journal
  14: 5500,  // Arrow Journal
  15: 4000,  // Pocket Journal
  16: 5500,  // Edge Journal
}

export const CUSTOMISATION_FEE = 1000

// ─── Delivery fees per Nigerian state in Naira ───────────────────────────────
// Update fees here only. Changes apply to checkout and emails.
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

// ─── Cart validation ─────────────────────────────────────────────────────────
/**
 * Validates every item in the cart against known products.
 * Strips variant slugs from item IDs before validation.
 * Returns true if valid; sends a 400 response and returns false if not.
 * Maximum quantity per item is 100.
 */
export const validateCart = (cart, res) => {
  if (!Array.isArray(cart) || cart.length === 0) {
    res.status(400).json({ error: 'Cart must be a non-empty array' })
    return false
  }

  for (const item of cart) {
    const numericId = parseInt(item.id.toString().split('-')[0])
    const validId = Number.isInteger(numericId) && products[numericId] !== undefined
    const validQuantity = Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 100

    if (!validId) {
      res.status(400).json({ error: `Invalid product id: ${item.id}` })
      return false
    }
    if (!validQuantity) {
      res.status(400).json({
        error: `Invalid quantity for product id: ${item.id} — must be between 1 and 100`,
      })
      return false
    }
  }

  return true
}

// ─── Total calculation ───────────────────────────────────────────────────────
/**
 * Calculates the verified order total from cart and delivery state.
 * Strips variant slugs from item IDs before price lookup.
 * Adds CUSTOMISATION_FEE per personalised item.
 * Throws if the delivery state is not recognised.
 */
export const calculateTotal = (cart, deliveryState) => {
  if (!deliveryState || deliveryFees[deliveryState] === undefined) {
    throw new Error(`Invalid delivery state: ${deliveryState}`)
  }

  const subtotal = cart.reduce((sum, item) => {
    const numericId = parseInt(item.id.toString().split('-')[0])
    const basePrice = products[numericId]
    const customFee = item.isCustomised ? CUSTOMISATION_FEE : 0
    return sum + (basePrice + customFee) * item.quantity
  }, 0)

  const deliveryFee = deliveryFees[deliveryState]
  return subtotal + deliveryFee
}

// ─── Email HTML builder ──────────────────────────────────────────────────────
/**
 * Builds the order summary HTML block for EmailJS templates.
 * Used by verify-payment.js to generate both the seller and customer emails.
 * All prices come from the same products/CUSTOMISATION_FEE constants above,
 * so they are always in sync with what Paystack actually charged.
 *
 * @param {Array}  cart          - verified cart items from the request body
 * @param {string} deliveryState - selected Nigerian state
 * @param {string} [mode]        - 'seller' includes font/text; 'customer' does too
 * @returns {{ html: string, productsTotal: number, customisationTotal: number, deliveryFee: number, grandTotal: number }}
 */
export const buildOrderSummary = (cart, deliveryState, mode = 'seller') => {
  let productsTotal = 0
  let customisationTotal = 0

  const itemsHtml = cart.map((item, index) => {
    const numericId = parseInt(item.id.toString().split('-')[0])
    const basePrice = products[numericId]
    const customFee = item.isCustomised ? CUSTOMISATION_FEE : 0
    const itemSubtotal = (basePrice + customFee) * item.quantity

    productsTotal += basePrice * item.quantity
    customisationTotal += customFee * item.quantity

    const customisationBlock = item.isCustomised && item.customisation
      ? `
        <tr>
          <td colspan="2" style="padding: 6px 8px; background-color: #f9f6f0; border: 1px solid #e5e7eb;">
            <span style="color: #C9A84C; font-size: 12px; font-weight: bold;">✦ Personalised</span>
          </td>
        </tr>
        ${item.customisation.font ? `
        <tr>
          <td style="padding: 4px 8px; font-size: 12px; color: #6b7280; border: 1px solid #e5e7eb;">Font Style</td>
          <td style="padding: 4px 8px; font-size: 12px; color: #2C1A0E; border: 1px solid #e5e7eb;">${item.customisation.font}</td>
        </tr>` : ''}
        ${item.customisation.message ? `
        <tr>
          <td style="padding: 4px 8px; font-size: 12px; color: #6b7280; border: 1px solid #e5e7eb;">Custom Text</td>
          <td style="padding: 4px 8px; font-size: 12px; color: #2C1A0E; font-style: italic; border: 1px solid #e5e7eb;">${item.customisation.message}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 4px 8px; font-size: 12px; color: #6b7280; border: 1px solid #e5e7eb;">Personalisation Fee</td>
          <td style="padding: 4px 8px; font-size: 12px; color: #2C1A0E; border: 1px solid #e5e7eb;">₦${(customFee * item.quantity).toLocaleString()}</td>
        </tr>`
      : `
        <tr>
          <td colspan="2" style="padding: 6px 8px; background-color: #f9f9f9; border: 1px solid #e5e7eb;">
            <span style="color: #87A878; font-size: 12px;">Standard Journal</span>
          </td>
        </tr>`

    return `
      <div style="margin-bottom: 16px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #FAF7F2; padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">
          <span style="font-size: 11px; color: #C9A84C; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            Journal ${index + 1}
          </span>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb; width: 40%;">Journal</td>
            <td style="padding: 8px; font-size: 13px; color: #2C1A0E; font-weight: bold; border: 1px solid #e5e7eb;">${item.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb;">Colour</td>
            <td style="padding: 8px; font-size: 13px; color: #2C1A0E; border: 1px solid #e5e7eb;">${item.color || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb;">Quantity</td>
            <td style="padding: 8px; font-size: 13px; color: #2C1A0E; border: 1px solid #e5e7eb;">${item.quantity}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb;">Base Price</td>
            <td style="padding: 8px; font-size: 13px; color: #2C1A0E; border: 1px solid #e5e7eb;">₦${(basePrice * item.quantity).toLocaleString()}</td>
          </tr>
          ${customisationBlock}
          <tr>
            <td style="padding: 8px; font-size: 13px; font-weight: bold; color: #2C1A0E; border: 1px solid #e5e7eb; background-color: #FAF7F2;">Subtotal</td>
            <td style="padding: 8px; font-size: 13px; font-weight: bold; color: #87A878; border: 1px solid #e5e7eb; background-color: #FAF7F2;">₦${itemSubtotal.toLocaleString()}</td>
          </tr>
        </table>
      </div>`
  }).join('')

  const deliveryFee = deliveryFees[deliveryState] || 0
  const grandTotal = productsTotal + customisationTotal + deliveryFee

  const totalsHtml = `
    <div style="margin-top: 20px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #FAF7F2; padding: 10px 12px; border-bottom: 1px solid #e5e7eb;">
        <span style="font-size: 11px; color: #C9A84C; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
          Order Total
        </span>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb;">Products Total</td>
          <td style="padding: 8px; font-size: 13px; color: #2C1A0E; border: 1px solid #e5e7eb;">₦${productsTotal.toLocaleString()}</td>
        </tr>
        ${customisationTotal > 0 ? `
        <tr>
          <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb;">Personalisation Total</td>
          <td style="padding: 8px; font-size: 13px; color: #C9A84C; border: 1px solid #e5e7eb;">₦${customisationTotal.toLocaleString()}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px; font-size: 13px; color: #6b7280; border: 1px solid #e5e7eb;">Delivery Fee</td>
          <td style="padding: 8px; font-size: 13px; color: #2C1A0E; border: 1px solid #e5e7eb;">₦${deliveryFee.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 10px 8px; font-size: 14px; font-weight: bold; color: #2C1A0E; border: 1px solid #e5e7eb; background-color: #FAF7F2;">Amount Paid</td>
          <td style="padding: 10px 8px; font-size: 14px; font-weight: bold; color: #87A878; border: 1px solid #e5e7eb; background-color: #FAF7F2;">₦${grandTotal.toLocaleString()}</td>
        </tr>
      </table>
    </div>`

  return {
    html: itemsHtml + totalsHtml,
    productsTotal,
    customisationTotal,
    deliveryFee,
    grandTotal,
  }
}