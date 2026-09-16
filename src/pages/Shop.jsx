import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import lifestyleShop from '../assets/images/lifestyle-shop.png'

function Shop() {
  const { products, loading, error } = useProducts()

  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative px-6 md:px-16 min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-end overflow-hidden"
        style={{
          backgroundImage: `url(${lifestyleShop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-brown opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mb-8 md:mb-12">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
            The Collection
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Journals
          </h1>
          <p className="text-white opacity-80 text-sm md:text-base max-w-md">
            Every journal is thoughtfully designed — premium faux leather,
            crafted for a life of intention, reflection and purpose.
          </p>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-16">

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-36 md:h-56 bg-brand-cream" />
                <div className="p-3 md:p-5">
                  <div className="h-3 bg-brand-cream rounded mb-2 w-2/3" />
                  <div className="h-4 bg-brand-cream rounded mb-3 w-full" />
                  <div className="h-3 bg-brand-cream rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="text-brand-brown opacity-60 mb-4">
              Something went wrong loading the journals.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-brand-green font-semibold hover:opacity-70 transition cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => {
              const defaultVariant = product.variants.find(
                v => v.slug === product.defaultVariant
              )
              const hasStock = product.variants.some(v => v.inStock)

              return (
                <Link
                  key={product.id}
                  to={`/shop/${product.id}`}
                  className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition group cursor-pointer"
                >
                  <div className="overflow-hidden relative">
                    {defaultVariant?.image ? (
                      <img
                        src={defaultVariant.image}
                        alt={product.name}
                        className="w-full h-36 md:h-56 object-contain bg-brand-white group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-36 md:h-56 bg-brand-cream flex items-center justify-center">
                        <p className="text-brand-brown opacity-40 text-xs">Coming Soon</p>
                      </div>
                    )}
                    {!hasStock && (
                      <div className="absolute top-3 left-3 bg-brand-brown text-white text-xs font-semibold px-3 py-1 rounded-full opacity-80">
                        Coming Soon
                      </div>
                    )}
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
                      <span className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </section>

    </div>
  )
}

export default Shop