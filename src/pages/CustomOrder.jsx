import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send } from 'lucide-react'
import Spinner from '../components/Spinner'

function CustomOrder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: '',
    cover: '',
    color: '',
    pages: '',
    quantity: '',
    budget: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  

 const validate = () => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address.')
    return false
  }

  // Phone validation — Nigerian numbers (11 digits starting with 0)
  const phoneRegex = /^0[0-9]{10}$/
  if (formData.phone && !phoneRegex.test(formData.phone)) {
    alert('Please enter a valid Nigerian phone number e.g. 08012345678')
    return false
  }

  return true
}
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.description) {
      alert('Please fill in all required fields.')
      return
    }

    if (!validate()) return

    setLoading(true)

    const customOrderMessage = `
CUSTOM JOURNAL REQUEST

Journal Size: ${formData.size || 'Not specified'}
Cover Type: ${formData.cover || 'Not specified'}
Color/Theme: ${formData.color || 'Not specified'}
Number of Pages: ${formData.pages || 'Not specified'}
Quantity: ${formData.quantity || 'Not specified'}
Budget Range: ${formData.budget || 'Not specified'}

Additional Description:
${formData.description}
    `

    emailjs.send(
      'service_onfv43n',
      'template_uuyjtac',
       {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        message: customOrderMessage,
        email_subject: `Custom Journal Request from ${formData.name}`,
        // Hide order fields
        order_items: '',
        delivery_fee: '',
        order_total: '',
        payment_status: '',
        customer_state: '',
        delivery_option: '',
        customer_address: '',
  },
      'M7acGxFDmKQz81172'
    )
    .then(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        size: '',
        cover: '',
        color: '',
        pages: '',
        quantity: '',
        budget: '',
        description: '',
      })
    })
    .catch((error) => {
      setLoading(false)
      console.error('EmailJS error:', error)
      alert('Something went wrong. Please try again.')
    })
  }

  if (success) {
    return (
      <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 py-24">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Request Received
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-4">
          Thank You {formData.name}!
        </h2>
        <p className="text-brand-brown opacity-70 max-w-md mx-auto mb-8 text-sm md:text-base">
          We have received your custom journal request and will get back
          to you shortly with a quote.
        </p>
        <a
          href="/shop"
          className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-green-dark transition"
        >
          Back to Shop
        </a>
      </div>
    )
  }

  return (
    <div className="bg-brand-cream min-h-screen">

      {/* ===== HERO SECTION ===== */}
      <section className="px-6 md:px-16 py-16 md:py-24 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Made Just For You
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
          Custom Journal
        </h1>
        <p className="text-brand-brown opacity-70 text-sm md:text-base max-w-xl mx-auto">
          Have a unique vision for your journal? Tell us about it and we
          will bring it to life — just for you.
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center pb-8 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== CUSTOM ORDER FORM ===== */}
      <section className="px-6 md:px-16 py-10 md:py-16 max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-3xl p-6 md:p-10">

          {/* Name */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Email */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Phone */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Journal Size */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Journal Size{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            >
              <option value="">-- Select a size --</option>
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="Pocket Size">Pocket Size</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>

          {/* Cover Type */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Cover Type{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
            </label>
            <select
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            >
              <option value="">-- Select cover type --</option>
              <option value="Hardcover">Hardcover</option>
              <option value="Softcover">Softcover</option>
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>

          {/* Color/Theme */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Color/Theme Preference{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g. Rose gold, Sage green, Minimalist black..."
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Number of Pages */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Number of Pages{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              placeholder="e.g. 100, 200, 300..."
              min="1"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Quantity */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Quantity{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="How many journals do you need?"
              min="1"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Budget */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Budget Range{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            >
              <option value="">-- Select budget range --</option>
              <option value="Under ₦10,000">Under ₦10,000</option>
              <option value="₦10,000 - ₦25,000">₦10,000 - ₦25,000</option>
              <option value="₦25,000 - ₦50,000">₦25,000 - ₦50,000</option>
              <option value="Above ₦50,000">Above ₦50,000</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-6 md:mb-8">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Describe Your Vision
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us everything about your dream journal — the feel, the purpose, any specific details you have in mind..."
              rows="5"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Submit Button */}
         <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-brand-green text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {loading ? (
                <>
                <Spinner />
                Sending...
                </>
            ) : (
                <>
                <Send className="w-5 h-5" />
                Send Message
                </>
            )}
         </button>

        </div>
      </section>

    </div>
  )
}

export default CustomOrder