import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [orderType, setOrderType] = useState("standard");
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*, variants(*)")
        .eq("id", id)
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      // Transform to match existing structure
      const transformed = {
        id: data.id,
        numericId: data.numeric_id,
        name: data.name,
        collection: data.collection_name,
        collectionSlug: data.collection_slug,
        description: data.description,
        price: `₦${(data.price / 100).toLocaleString()}`,
        size: data.size,
        pages: data.pages,
        defaultVariant: data.default_variant_slug,
        variants: (data.variants || []).map((v) => ({
          color: v.color,
          slug: v.slug,
          image: v.image_url,
          inStock: v.in_stock,
        })),
      };

      setProduct(transformed);
      setSelectedVariant(
        transformed.variants.find(
          (v) => v.slug === transformed.defaultVariant,
        ) || transformed.variants[0],
      );
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-brand-cream min-h-screen px-6 md:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 animate-pulse">
          <div className="rounded-3xl bg-white h-64 md:h-96" />
          <div className="flex flex-col gap-4 pt-4">
            <div className="h-3 bg-white rounded w-1/4" />
            <div className="h-8 bg-white rounded w-3/4" />
            <div className="h-6 bg-white rounded w-1/4" />
            <div className="h-24 bg-white rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24 px-6">
        <h2 className="text-2xl font-bold text-brand-brown mb-4">
          Product not found
        </h2>
        <Link to="/shop" className="text-brand-green hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  // ... rest of the component stays exactly the same

  const handleAddToCart = () => {
    if (!selectedVariant?.inStock) return;

    if (orderType === "personalised") {
      // Navigate to custom order page with product data
      navigate("/custom-order", {
        state: {
          product: {
            id: product.id,
            numericId: product.numericId,
            name: product.name,
            collection: product.collection,
            price: product.price,
            size: product.size,
            pages: product.pages,
            image: selectedVariant.image,
            color: selectedVariant.color,
            colorSlug: selectedVariant.slug,
            quantity,
          },
        },
      });
      return;
    }

    // Standard — add directly to cart
    addToCart(
      {
        id: `${product.id}-${selectedVariant.slug}`,
        numericId: product.numericId, // add this
        name: `${product.name} — ${selectedVariant.color}`,
        price: product.price,
        image: selectedVariant.image,
        collection: product.collection,
        color: selectedVariant.color,
        quantity,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* Image */}
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
            {selectedVariant?.image ? (
              <img
                src={selectedVariant.image}
                alt={`${product.name} — ${selectedVariant.color}`}
                className="w-full h-auto object-contain transition"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <p className="text-brand-brown opacity-40 text-sm">
                  Image Coming Soon
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-3">
            {product.collection}
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-brand-brown mb-2">
            {product.name}
          </h1>
          <p className="text-brand-brown opacity-50 text-sm mb-1">
            {selectedVariant?.color}
          </p>
          <p className="text-brand-brown opacity-50 text-sm mb-3">
            Size: {product.size} · {product.pages}
          </p>
          <p className="text-brand-green font-bold text-xl md:text-2xl mb-6">
            {product.price}
          </p>
          <p className="text-brand-brown opacity-70 leading-relaxed mb-8 text-sm md:text-base">
            {product.description}
          </p>

          {/* Color Variants */}
          <div className="mb-6">
            <p className="text-brand-brown font-semibold mb-3 text-sm md:text-base">
              Select Colour:
            </p>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.slug}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setAdded(false);
                  }}
                  className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                    selectedVariant?.slug === variant.slug
                      ? "border-brand-gold"
                      : "border-transparent hover:border-brand-gold hover:border-opacity-40"
                  }`}
                >
                  {variant.image ? (
                    <img
                      src={variant.image}
                      alt={variant.color}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-cream flex items-center justify-center">
                      <p className="text-brand-brown opacity-40 text-xs text-center px-1">
                        {variant.color}
                      </p>
                    </div>
                  )}
                  {!variant.inStock && (
                    <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
                      <p className="text-brand-brown opacity-70 text-xs font-semibold text-center px-1">
                        Out of Stock
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Counter */}
          {selectedVariant?.inStock && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-brand-brown font-semibold text-sm md:text-base">
                Quantity:
              </span>
              <div className="flex items-center border border-brand-gold border-opacity-40 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 md:px-4 py-2 hover:bg-brand-cream transition text-brand-brown cursor-pointer"
                >
                  −
                </button>
                <span className="px-3 md:px-4 py-2 font-semibold text-brand-brown">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 md:px-4 py-2 hover:bg-brand-cream transition text-brand-brown cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Order Type Selection */}
          {selectedVariant?.inStock && (
            <div className="mb-6">
              <p className="text-brand-brown font-semibold mb-3 text-sm md:text-base">
                Choose your journal:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Standard */}
                <button
                  onClick={() => setOrderType("standard")}
                  className={`text-left p-4 rounded-2xl border-2 transition cursor-pointer ${
                    orderType === "standard"
                      ? "border-brand-green bg-white shadow-sm"
                      : "border-brand-gold border-opacity-20 hover:border-opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        orderType === "standard"
                          ? "border-brand-green"
                          : "border-brand-brown border-opacity-30"
                      }`}
                    >
                      {orderType === "standard" && (
                        <div className="w-2 h-2 rounded-full bg-brand-green" />
                      )}
                    </div>
                    <p className="font-bold text-brand-brown text-sm">
                      Standard
                    </p>
                  </div>
                  <p className="text-brand-brown opacity-50 text-xs pl-6">
                    Ready to ship
                  </p>
                </button>

                {/* Personalised */}
                <button
                  onClick={() => setOrderType("personalised")}
                  className={`text-left p-4 rounded-2xl border-2 transition cursor-pointer ${
                    orderType === "personalised"
                      ? "border-brand-green bg-white shadow-sm"
                      : "border-brand-gold border-opacity-20 hover:border-opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        orderType === "personalised"
                          ? "border-brand-green"
                          : "border-brand-brown border-opacity-30"
                      }`}
                    >
                      {orderType === "personalised" && (
                        <div className="w-2 h-2 rounded-full bg-brand-green" />
                      )}
                    </div>
                    <p className="font-bold text-brand-brown text-sm">
                      Personalised
                    </p>
                  </div>
                  <p className="text-brand-brown opacity-50 text-xs pl-6">
                    Add a name, initials or custom design · +₦1,000
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart / Out of Stock */}
          {selectedVariant?.inStock ? (
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                added
                  ? "bg-brand-gold text-white"
                  : "bg-brand-green text-white hover:bg-brand-green-dark"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {added
                ? "Added to Cart!"
                : orderType === "personalised"
                  ? "Personalise This Journal →"
                  : "Add to Cart"}
            </button>
          ) : (
            <div className="w-full py-4 rounded-full font-semibold flex flex-col items-center justify-center gap-1 bg-brand-cream border border-brand-gold border-opacity-20 text-brand-brown">
              <span className="opacity-50">Currently Unavailable</span>
              <span className="text-xs opacity-40">Check back soon!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
