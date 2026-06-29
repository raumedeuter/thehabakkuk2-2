import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react'
import products from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="text-center py-24 px-6">
        <h2 className="text-2xl font-bold text-brand-brown mb-4">Product not found</h2>
        <Link to="/shop" className="text-brand-green hover:underline">Back to Shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-brand-cream min-h-screen px-6 md:px-16 py-10 md:py-16">

      {/* Back Button */}
      <Link
        to="/shop"
        className="flex items-center gap-2 text-brand-brown opacity-60 hover:opacity-100 hover:text-brand-green transition mb-8 md:mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
            {product.collection}
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-brand-brown mb-3">
            {product.name}
          </h1>
          <p className="text-brand-green font-bold text-xl md:text-2xl mb-6">
            {product.price}
          </p>
          <p className="text-brand-brown opacity-70 leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
            {product.description}
          </p>

          {/* Quantity Counter */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-brand-brown font-semibold text-sm md:text-base">Quantity:</span>
            <div className="flex items-center border border-brand-gold border-opacity-40 rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 md:px-4 py-2 hover:bg-brand-cream transition text-brand-brown"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 md:px-4 py-2 font-semibold text-brand-brown">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 md:px-4 py-2 hover:bg-brand-cream transition text-brand-brown"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition ${
              added
                ? 'bg-brand-gold text-white'
                : 'bg-brand-green text-white hover:bg-brand-green-dark'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail