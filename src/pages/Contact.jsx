import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send } from 'lucide-react'
import Spinner from '../components/Spinner'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
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

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }

    if (!validate()) return

    setLoading(true)

    emailjs.send(
      'service_onfv43n',
      'template_uuyjtac',
      {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        message: formData.message,
        email_subject: `New Enquiry from ${formData.name}`,

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
      setFormData({ name: '', email: '', phone: '', message: '' })
    })
    .catch((error) => {
      setLoading(false)
      console.error('EmailJS error:', error)
      alert('Something went wrong. Please try again.')
    })
  }


  return (
    <div className="bg-brand-cream min-h-screen">

      {/* ===== HERO SECTION ===== */}
      <section className="px-6 md:px-16 py-16 md:py-24 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Reach Out
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
          Get In Touch
        </h1>
        <p className="text-brand-brown opacity-70 text-sm md:text-base max-w-xl mx-auto">
          Have a question, bulk order enquiry or just want to say hello?
          We would love to hear from you!
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center pb-8 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== CONTACT FORM ===== */}
      <section className="px-6 md:px-16 py-10 md:py-16 max-w-3xl mx-auto">

        {/* Success Message */}
        {success && (
          <div className="bg-white border border-brand-gold border-opacity-30 text-brand-brown rounded-2xl px-6 py-4 mb-8 text-center">
            <p className="font-semibold text-brand-green">Message sent successfully!</p>
            <p className="text-sm mt-1 opacity-70">We will get back to you as soon as possible.</p>
          </div>
        )}

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
              Phone Number{' '}
              <span className="text-brand-brown opacity-40 font-normal">(optional)</span>
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

          {/* Message */}
          <div className="mb-6 md:mb-8">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
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

        {/* Contact Info */}
        <div className="mt-8 md:mt-10 text-center text-brand-brown opacity-60 text-sm">
          <p>You can also reach us directly at</p>
          <a
            href="mailto:thehabakkukwrite@gmail.com"
            className="text-brand-gold font-semibold hover:opacity-80 transition"
          >
            thehabakkukwrite@gmail.com
          </a>
        </div>

      </section>

    </div>
  )
}

export default Contact