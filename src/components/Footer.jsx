import { Link } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-white border-t border-brand-cream px-6 md:px-16 py-8 md:py-12 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-brand-green mb-3">
            TheHabakkuk2:2
          </h3>
          <p className="text-brand-brown text-sm leading-relaxed opacity-70">
            a write-kit shop — premium faux leather journals for reflection,
            gratitude, and intentional writing. Beauty for your quiet moments.
          </p>
          <a
            href="https://www.instagram.com/thehabakkuk2.2"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-brand-gold hover:opacity-70 transition mt-4 text-sm font-semibold"
          >
            <FaInstagram className="w-4 h-4" />
            @thehabakkuk2.2
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-brand-brown mb-4 uppercase tracking-widest text-sm">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-brand-brown">
            {/* <li><Link to="/" className="hover:text-brand-green transition opacity-70">Home</Link></li> */}
            <li><Link to="/shop" className="hover:text-brand-green transition opacity-70">Shop</Link></li>
            <li><Link to="/collections" className="hover:text-brand-green transition opacity-70">Collections</Link></li>
            <li><Link to="/custom-order" className="hover:text-brand-green transition opacity-70">Custom Journal</Link></li>
            {/* <li><Link to="/about" className="hover:text-brand-green transition opacity-70">About</Link></li> */}
            <li><Link to="/contact" className="hover:text-brand-green transition opacity-70">Contact</Link></li>
            
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h4 className="font-bold text-brand-brown mb-4 uppercase tracking-widest text-sm">
            Get In Touch
          </h4>
          <p className="text-sm text-brand-brown opacity-70 leading-relaxed mb-2">
            Have a question or custom request? We would love to hear from you.
          </p>
          <Link
            to="/contact"
            className="text-brand-gold hover:opacity-70 font-semibold text-sm transition"
          >
            Send us a message →
          </Link>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-cream mt-6 md:mt-10 pt-4 md:pt-6 text-center text-xs text-brand-brown opacity-50">
        © {new Date().getFullYear()} TheHabakkuk2:2. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer