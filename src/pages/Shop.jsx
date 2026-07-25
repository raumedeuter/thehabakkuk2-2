import { Link } from "react-router-dom";
import products from "../data/products";
import lifestyleShop from "../assets/images/lifestyle-shop.png";

function Shop() {
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

      {/* ===== HERO SECTION ===== */}
      {/* <section className="bg-brand-cream px-6 md:px-16 py-16 md:py-20 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          The Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
          Our Journals
        </h1>
        <p className="text-brand-brown opacity-70 max-w-2xl mx-auto text-sm md:text-base">
          Every journal is thoughtfully designed — premium faux leather, crafted
          for a life of intention, reflection and purpose.
        </p>
      </section> */}

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center py-4 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== PRODUCTS GRID ===== */}
      <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => {
            const defaultVariant = product.variants.find(
              (v) => v.slug === product.defaultVariant,
            );
            const hasStock = product.variants.some((v) => v.inStock);

            return (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition group"
              >
                {/* Image */}
                <div className="overflow-hidden relative">
                  {defaultVariant?.image ? (
                    <img
                      src={defaultVariant.image}
                      alt={product.name}
                      className="w-full h-36 md:h-56 object-contain group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-36 md:h-56 bg-brand-cream flex items-center justify-center">
                      <p className="text-brand-brown opacity-40 text-xs">
                        Coming Soon
                      </p>
                    </div>
                  )}
                  {!hasStock && (
                    <div className="absolute top-3 left-3 bg-brand-brown text-white text-xs font-semibold px-3 py-1 rounded-full opacity-80">
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Info */}
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
                    <span className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Shop;

// import { Link } from 'react-router-dom'
// import products from '../data/products'

// function Shop() {
//   return (
//     <div>
//       {/* ===== HERO SECTION ===== */}
//       <section className="bg-brand-cream px-6 md:px-16 py-16 md:py-20 text-center">
//         <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
//           The Collection
//         </p>
//         <h1 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">
//           Our Journals
//         </h1>
//         <p className="text-brand-brown opacity-70 max-w-2xl mx-auto text-sm md:text-base">
//           Every journal is thoughtfully designed — premium faux leather, crafted
//           for a life of intention, reflection and purpose.
//         </p>
//       </section>

//       {/* ===== DIVIDER ===== */}
//       <div className="flex justify-center py-4 px-6">
//         <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
//       </div>

//       {/* ===== PRODUCTS GRID ===== */}
//       <section className="bg-brand-cream px-6 md:px-16 py-12 md:py-16">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition group"
//             >
//               {/* Product Card */}

//               {/* Image with Out of Stock badge */}
//               <div className="overflow-hidden relative">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-36 md:h-56 object-cover group-hover:scale-105 transition duration-500"
//                 />
//                 {!product.inStock && (
//                   <div className="absolute top-3 left-3 bg-brand-brown text-white text-xs font-semibold px-3 py-1 rounded-full opacity-80">
//                     Out of Stock
//                   </div>
//                 )}
//               </div>
//               <div className="p-3 md:p-5">
//                 <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-1 hidden md:block">
//                   {product.collection}
//                 </p>
//                 <h3 className="font-semibold text-brand-brown text-sm md:text-base">
//                   {product.name}
//                 </h3>
//                 <div className="flex items-center justify-between mt-3 md:mt-4">
//                   <span className="text-brand-green font-bold text-sm">
//                     {product.price}
//                   </span>
//                   <Link
//                     to={`/shop/${product.id}`}
//                     className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-brand-green-dark transition"
//                   >
//                     View
//                   </Link>
//                 </div>
//                 {/* <div className="flex items-center justify-between mt-3 md:mt-4">
//                   <span className="text-brand-green font-bold text-sm">
//                     {product.price}
//                   </span>
//                   {product.inStock ? (
//                     <Link
//                       to={`/shop/${product.id}`}
//                       className="bg-brand-green text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-brand-green-dark transition"
//                     >
//                       View
//                     </Link>
//                   ) : (
//                     <span className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-brand-cream text-brand-brown opacity-50 border border-brand-gold border-opacity-20">
//                       Out of Stock
//                     </span>
//                   )}
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Shop
