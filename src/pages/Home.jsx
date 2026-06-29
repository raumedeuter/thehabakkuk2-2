import { Link } from 'react-router-dom'
import products from '../data/products'
import FloatingHearts from '../components/FloatingHearts'

function Home() {
  const featured = products.slice(0, 3)

  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-brand-cream px-6 md:px-16 py-16 md:py-28 flex flex-col items-center text-center">
        <FloatingHearts />
     
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          a write-kit shop
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-6 max-w-4xl leading-tight">
          Write Your Vision. Make It Plain.
        </h1>
        <p className="text-brand-brown opacity-70 text-sm md:text-base max-w-2xl mb-10">
          Browse our collection of premium faux leather journals crafted for reflection, 
          gratitude and intentional living. 
          Find yours today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link
            to="/shop"
            className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-green-dark transition text-center"
          >
            Shop Now
          </Link>
          <Link
            to="/custom-order"
            className="border-2 border-brand-gold text-brand-gold px-8 py-3 rounded-full font-semibold hover:bg-brand-gold hover:text-white transition text-center"
          >
            Custom Journal
          </Link>
        </div>
      </section>

        {/* ===== DIVIDER ===== */}
        <div className="flex items-center justify-center py-8 gap-4 px-6">
            <div className="h-px w-16 md:w-32 bg-brand-gold opacity-40 flex-shrink-0"></div>
            <p className="text-brand-gold text-xs tracking-widest uppercase text-center">
                Timeless. Intentional. Yours.
            </p>
            <div className="h-px w-16 md:w-32 bg-brand-gold opacity-40 flex-shrink-0"></div>
    </div>

      {/* ===== FEATURED PRODUCTS SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-brand-brown mb-2">
          Featured Journals
        </h2>
        <p className="text-center text-brand-brown opacity-60 mb-10 text-sm">
          Handpicked for you — each one crafted for a life of intention.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition group"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-1">
                  {product.collection}
                </p>
                <h3 className="font-semibold text-brand-brown">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-brand-green font-bold">{product.price}</span>
                  <Link
                    to={`/shop/${product.id}`}
                    className="bg-brand-green text-white text-sm px-4 py-2 rounded-full hover:bg-brand-green-dark transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="border-2 border-brand-green text-brand-green px-8 py-3 rounded-full font-semibold hover:bg-brand-green hover:text-white transition"
          >
            View All Journals
          </Link>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex items-center justify-center py-8 gap-6">
        <div className="h-px w-16 md:w-32 bg-brand-gold opacity-40"></div>
        <p className="text-brand-gold text-xs tracking-widest uppercase">H22</p>
        <div className="h-px w-16 md:w-32 bg-brand-gold opacity-40"></div>
      </div>

      {/* ===== ABOUT SNIPPET SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-20 flex flex-col items-center text-center"
        style={{
    backgroundImage: `repeating-linear-gradient(
      transparent,
      transparent 31px,
      rgba(201, 168, 76, 0.12) 31px,
      rgba(201, 168, 76, 0.12) 32px
    )`,
    backgroundSize: '100% 32px',
  }}>
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Our Story
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-4">
          Pages Made For Pouring
        </h2>
        <p className="text-brand-brown opacity-70 max-w-xl mb-8 leading-relaxed text-sm md:text-base">
          Discover pages made for pouring your thoughts, ideas and prayers.
          Find the beauty in writing in every journal — crafted for reflection,
          gratitude, and intentional living. Write the vision. Make it plain.
        </p>
        <Link
          to="/about"
          className="border-2 border-brand-green text-brand-green px-8 py-3 rounded-full font-semibold hover:bg-brand-green hover:text-white transition"
        >
          Our Story
        </Link>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex items-center justify-center py-8 gap-6">
        <div className="h-px w-16 md:w-32 bg-brand-gold opacity-40"></div>
        <p className="text-brand-gold text-xs tracking-widest uppercase">Custom</p>
        <div className="h-px w-16 md:w-32 bg-brand-gold opacity-40"></div>
      </div>

      {/* ===== CUSTOM JOURNAL SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="bg-white rounded-3xl px-6 md:px-16 py-10 md:py-14 w-full max-w-4xl shadow-sm">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
            Made Just For You
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-brand-brown mb-4">
            Something More Personal?
          </h2>
          <p className="text-brand-brown opacity-70 max-w-2xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
            Can't find exactly what you're looking for? Tell us your vision
            and we'll bring it to life — a journal made just for you.
          </p>
          <Link
            to="/custom-order"
            className="bg-brand-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-gold-dark transition"
          >
            Request a Custom Journal
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home