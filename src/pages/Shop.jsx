import { Link } from 'react-router-dom'
import products from '../data/products'

function Shop() {
  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-16 md:py-20 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          The Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
          Our Journals
        </h1>
        <p className="text-brand-brown opacity-70 max-w-2xl mx-auto text-sm md:text-base">
          Every journal is thoughtfully designed — premium faux leather,
          crafted for a life of intention, reflection and purpose.
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition group"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 md:h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-3 md:p-5">
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-1 hidden md:block">
                  {product.collection}
                </p>
                <h3 className="font-semibold text-brand-brown text-sm md:text-base">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-3 md:mt-4">
                  <span className="text-brand-green font-bold text-sm">{product.price}</span>
                  <Link
                    to={`/shop/${product.id}`}
                    className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-brand-green-dark transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Shop