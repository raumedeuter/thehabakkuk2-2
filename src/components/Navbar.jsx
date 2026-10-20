import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartToast from './CartToast'

const navLinkClass = ({ isActive }) =>
  `transition ${isActive
    ? 'text-brand-green font-semibold'
    : 'text-brand-brown hover:text-brand-green'
  }`

function Navbar() {
  const { cartCount, cartUpdated } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm px-6 md:px-16 py-4 fixed top-0 left-0 right-0 z-50">

      {/* Top Row */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="text-lg md:text-2xl font-bold text-brand-green">
          TheHabakkuk2:2
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/shop" className={navLinkClass}>Shop</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          <li>
            <div className="relative">
              <NavLink to="/cart" className="relative flex items-center text-brand-brown hover:text-brand-green transition">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              <CartToast show={cartUpdated} />
            </div>
          </li>
        </ul>

        {/* Mobile — Cart + Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <NavLink to="/cart" className="relative flex items-center text-brand-brown hover:text-brand-green transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <CartToast show={cartUpdated} />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-brand-brown hover:text-brand-green transition cursor-pointer"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-brand-gold border-opacity-20 pt-4">
          <li>
            <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      )}

    </nav>
  )
}

export default Navbar