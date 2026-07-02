import { Link, useLocation } from 'react-router-dom'

function OrderSuccess() {
  const location = useLocation()
  const name = location.state?.name || 'there'

  return (
    <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 py-24">
      <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
        Order Confirmed
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
        Thank You {name}!
      </h2>
      <p className="text-brand-brown opacity-70 max-w-md mx-auto mb-4 text-sm md:text-base">
        Your order has been received and we will be in touch shortly
        to confirm your delivery details.
      </p>
      <div className="bg-white rounded-2xl px-6 py-4 max-w-md mx-auto mb-8 text-sm border border-brand-gold border-opacity-20">
        <p className="font-semibold text-brand-brown mb-1">
          Check your email for a confirmation!
        </p>
        <p className="text-brand-brown opacity-60">
          If you don't see it please check your{' '}
          <span className="font-semibold">spam or junk folder</span> and
          mark it as not spam.
        </p>
      </div>
      <Link
        to="/shop"
        className="bg-brand-green text-white px-10 py-4 rounded-full font-semibold hover:bg-brand-green-dark transition"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default OrderSuccess