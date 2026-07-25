import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartToast from './CartToast'

function Navbar() {
  const { cartCount, cartUpdated } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm px-6 md:px-16 py-4 sticky top-0 z-50">

      {/* Top Row */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-lg md:text-2xl font-bold text-brand-green">
          TheHabakkuk2:2
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li><Link to="/" className="text-brand-brown hover:text-brand-green transition">Home</Link></li>
          <li><Link to="/shop" className="text-brand-brown hover:text-brand-green transition">Shop</Link></li>
          <li><Link to="/about" className="text-brand-brown hover:text-brand-green transition">About</Link></li>
          <li><Link to="/contact" className="text-brand-brown hover:text-brand-green transition">Contact</Link></li>
         <li>
  <div className="relative">
    <Link to="/cart" className="relative flex items-center text-brand-brown hover:text-brand-green transition">
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
    <CartToast show={cartUpdated} />
  </div>
</li>
        </ul>

      {/* Mobile — Cart + Hamburger */}
<div className="flex items-center gap-4 md:hidden">
  <div className="relative">
    <Link to="/cart" className="relative flex items-center text-brand-brown hover:text-brand-green transition">
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
    <CartToast show={cartUpdated} />
  </div>
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-brand-brown hover:text-brand-green transition"
  >
    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>
</div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-brand-gold border-opacity-20 pt-4">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-brand-brown hover:text-brand-green transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="block text-brand-brown hover:text-brand-green transition">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-brand-brown hover:text-brand-green transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-brand-brown hover:text-brand-green transition">
              Contact
            </Link>
          </li>
        </ul>
      )}

    </nav>
  )
}

export default Navbar