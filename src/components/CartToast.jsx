function CartToast({ show }) {
  return (
    <div
      className={`absolute top-12 right-0 bg-brand-brown text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 whitespace-nowrap z-50 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      ✓ Cart updated
    </div>
  )
}

export default CartToast