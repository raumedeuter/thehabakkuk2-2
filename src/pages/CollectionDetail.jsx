import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import collections from '../data/collections'
import products from '../data/products'


function CollectionDetail() {
  const { slug } = useParams()

  const collection = collections.find((c) => c.slug === slug)
  const collectionProducts = products.filter((p) => p.collectionSlug === slug)

  if (!collection) {
    return (
      <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-2xl font-bold text-brand-brown mb-4">Collection not found</h2>
        <Link to="/collections" className="text-brand-green hover:underline">
          Back to Collections
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative px-6 md:px-16 min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-end overflow-hidden"
        style={{
          backgroundImage: `url(${collection.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-brown opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mb-8 md:mb-12">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
            The Collection
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {collection.name}
          </h1>
          <p className="text-white opacity-80 text-sm md:text-base max-w-lg">
            {collection.description}
          </p>
        </div>
      </section>

      {/* ===== BACK BUTTON ===== */}
      <div className="px-6 md:px-16 pt-8">
        <Link
          to="/collections"
          className="flex items-center gap-2 text-brand-brown opacity-60 hover:opacity-100 hover:text-brand-green transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="px-6 md:px-16 py-10 md:py-16">
        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {collectionProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition group"
              >

                {/* Product Card */}

                 {/* Image with Out of Stock badge */}
              <div className="overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 md:h-56 object-cover group-hover:scale-105 transition duration-500"
                />
                {!product.inStock && (
                  <div className="absolute top-3 left-3 bg-brand-brown text-white text-xs font-semibold px-3 py-1 rounded-full opacity-80">
                    Out of Stock
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
                  <span className="text-brand-green font-bold text-sm">
                    {product.price}
                  </span>
                  <Link
                    to={`/shop/${product.id}`}
                    className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-brand-green-dark transition"
                  >
                    View
                  </Link>
                </div>
                {/* <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 md:h-56 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-semibold text-brand-brown text-sm md:text-base">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <span className="text-brand-green font-bold text-sm">
                      {product.price}
                    </span>
                    {product.inStock ? (
                      <Link
                        to={`/shop/${product.id}`}
                        className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-brand-green-dark transition"
                      >
                        View
                      </Link>
                    ) : (
                      <span className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-brand-cream text-brand-brown opacity-50 border border-brand-gold border-opacity-20">
                        Out of Stock
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-brand-brown opacity-60 mb-6">
              No journals in this collection yet — check back soon!
            </p>
            <Link
              to="/shop"
              className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-green-dark transition"
            >
              Browse All Journals
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default CollectionDetail