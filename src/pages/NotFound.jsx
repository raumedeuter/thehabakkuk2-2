import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 py-24">

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-16 bg-brand-gold opacity-40"></div>
        <p className="text-brand-gold text-xs tracking-widest uppercase">H22</p>
        <div className="h-px w-16 bg-brand-gold opacity-40"></div>
      </div>

      <h1 className="text-8xl font-bold text-brand-green mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-4">
        Page Not Found
      </h2>
      <p className="text-brand-brown opacity-60 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
        Looks like this page doesn't exist. Perhaps the vision for it
        hasn't been written yet. 😄
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-green-dark transition"
        >
          Go Home
        </Link>
        <Link
          to="/shop"
          className="border-2 border-brand-gold text-brand-gold px-8 py-3 rounded-full font-semibold hover:bg-brand-gold hover:text-white transition"
        >
          Browse Journals
        </Link>
      </div>

    </div>
  )
}

export default NotFound