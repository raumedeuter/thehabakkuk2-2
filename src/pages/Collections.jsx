import { Link } from 'react-router-dom'
import collections from '../data/collections'

function Collections() {
  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-16 md:py-24 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Browse
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
          Shop by Collection
        </h1>
        <p className="text-brand-brown opacity-70 text-sm md:text-base max-w-xl mx-auto">
          Every collection tells a story. Find the one that speaks to yours.
        </p>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== COLLECTIONS GRID ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-brand-brown text-lg mb-2">
                  {collection.name}
                </h3>
                <p className="text-brand-brown opacity-60 text-sm leading-relaxed">
                  {collection.description}
                </p>
                <p className="text-brand-gold font-semibold text-sm mt-4">
                  View Collection →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Collections