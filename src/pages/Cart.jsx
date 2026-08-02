import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 py-24">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Your Cart
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-4">
          Your cart is empty
        </h2>
        <p className="text-brand-brown opacity-60 mb-8 text-sm md:text-base">
          Looks like you haven't added any journals yet.
        </p>
        <Link
          to="/shop"
          className="bg-brand-green text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-green-dark transition"
        >
          Browse Journals
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen px-6 md:px-16 py-10 md:py-16">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-2">
          Your Cart
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-brand-brown">
          Review Your Order
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm rounded-2xl p-4 md:p-5 flex gap-4 md:gap-5 items-center"
            >
              {/* Image */}
              <div className="rounded-xl overflow-hidden w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-1 hidden md:block">
                  {item.collection}
                </p>
                <h3 className="font-semibold text-brand-brown text-sm md:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-brand-green font-bold mt-1 text-sm md:text-base">
                  {item.price}
                </p>

                {/* Quantity Counter */}
                <div className="flex items-center gap-2 md:gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="border border-brand-gold border-opacity-30 rounded-full p-1 hover:bg-brand-cream transition cursor-pointer"
                  >
                    <Minus className="w-3 h-3 text-brand-brown" />
                  </button>
                  <span className="font-semibold text-brand-brown text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border border-brand-gold border-opacity-30 rounded-full p-1 hover:bg-brand-cream transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-brand-brown" />
                  </button>
                </div>
              </div>

              {/* Subtotal + Remove */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                {/* Item subtotal */}
                <p className="font-bold text-brand-brown text-sm md:text-base">
                  ₦
                  {(
                    (parseInt(item.price.replace(/[^0-9]/g, "")) +
                      (item.isCustomised ? 1000 : 0)) *
                    item.quantity
                  ).toLocaleString()}
                </p>
                <h3 className="font-semibold text-brand-brown text-sm md:text-base truncate">
                  {item.name}
                </h3>
                {item.isCustomised && (
                  <p className="text-brand-gold text-xs font-semibold mt-0.5">
                    ✦ Personalised · +₦{(1000 * item.quantity).toLocaleString()}
                  </p>
                )}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-brand-brown opacity-30 hover:opacity-70 hover:text-red-400 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-sm rounded-2xl p-6 md:p-8 h-fit">
          <h2 className="text-lg md:text-xl font-bold text-brand-brown mb-6">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-xs md:text-sm text-brand-brown opacity-60 mb-2"
            >
              <span className="truncate mr-2">
                {item.name} x{item.quantity}
                {item.isCustomised && " (Personalised)"}
              </span>
              <span className="flex-shrink-0">
                ₦
                {(
                  (parseInt(item.price.replace(/[^0-9]/g, "")) +
                    (item.isCustomised ? 1000 : 0)) *
                  item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="flex justify-center my-4">
            <div className="h-px w-full bg-brand-gold opacity-20"></div>
          </div>

          <div className="flex justify-between font-bold text-brand-brown text-base md:text-lg mb-6 md:mb-8">
            <span>Total</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-brand-green text-white py-3 md:py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-green-dark transition text-sm md:text-base"
          >
            <ShoppingBag className="w-5 h-5" />
            Proceed to Checkout
          </Link>

          <Link
            to="/shop"
            className="w-full text-center text-brand-gold text-sm mt-4 block hover:opacity-70 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
