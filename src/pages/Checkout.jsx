import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import deliveryData from "../data/delivery";
import Spinner from "../components/Spinner";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    deliveryOption: "pickup",
    address: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const deliveryFee = formData.state ? deliveryData[formData.state] : 0;
  const orderTotal = cartTotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    const phoneRegex = /^0[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      alert("Please enter a valid Nigerian phone number e.g. 08012345678");
      return false;
    }
    return true;
  };

  const buildOrderDetails = () => {
    const orderItemsHTML = cart
      .map(
        (item) =>
          `<tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.name}</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.quantity}</td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">₦${(
              parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity
            ).toLocaleString()}</td>
          </tr>`,
      )
      .join("");

    return {
      email_subject: `New Order from ${formData.name}`,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_state: formData.state,
      delivery_option:
        formData.deliveryOption === "pickup"
          ? "Office Pickup"
          : "Home Delivery",
      customer_address:
        formData.deliveryOption === "home" ? formData.address : "Office Pickup",
      order_items: orderItemsHTML,
      delivery_fee: `₦${deliveryFee.toLocaleString()}`,
      order_total: `₦${orderTotal.toLocaleString()}`,
      payment_status: "Paid via Paystack",
      message: "",
    };
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.state
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.deliveryOption === "home" && !formData.address) {
      alert("Please enter your home delivery address.");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      // Step 1 — Initialize payment on our secure backend
      const initResponse = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart.map((item) => ({
            id: parseInt(item.id.toString().split("-")[0]), // extracts just the number
            quantity: item.quantity,
          })),
          deliveryState: formData.state,
          email: formData.email,
        }),
      });

      const initData = await initResponse.json();

      if (!initResponse.ok) {
        alert(
          initData.error || "Could not initialize payment. Please try again.",
        );
        setLoading(false);
        return;
      }

      const { reference, amount } = initData;

      // Step 2 — Open Paystack popup
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: amount * 100,
        ref: reference,
        onSuccess: async (transaction) => {
          // Step 3 — Verify payment on our secure backend
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: transaction.reference,
                cart: cart.map((item) => ({
                  id: parseInt(item.id.toString().split("-")[0]), // extracts just the number
                  quantity: item.quantity,
                })),
                deliveryState: formData.state,
                orderDetails: buildOrderDetails(),
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              alert(
                verifyData.error ||
                  "Payment verification failed. Please contact us.",
              );
              setLoading(false);
              return;
            }

            // Step 4 — Success!
            clearCart();
            navigate("/order-success", {
              state: { name: formData.name },
            });
          } catch (error) {
            console.error("Verification error:", error);
            alert(
              "Something went wrong verifying your payment. Please contact us.",
            );
            setLoading(false);
          }
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-brand-cream min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 py-24">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Checkout
        </p>
        <h2 className="text-2xl font-bold text-brand-brown mb-4">
          Your cart is empty
        </h2>
        <p className="text-brand-brown opacity-60 mb-8 text-sm md:text-base">
          You have no items to checkout.
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
      {/* Back Button */}
      <Link
        to="/cart"
        className="flex items-center gap-2 text-brand-brown opacity-60 hover:opacity-100 hover:text-brand-green transition mb-8 md:mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <div className="mb-8 md:mb-12">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-2">
          Almost There
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-brand-brown">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Delivery Details Form */}
        <div className="md:col-span-2 bg-white shadow-sm rounded-3xl p-6 md:p-10">
          <h2 className="text-lg md:text-xl font-bold text-brand-brown mb-6 md:mb-8">
            Delivery Details
          </h2>

          {/* Name */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Email */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Phone */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* State Dropdown */}
          <div className="mb-5 md:mb-6">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Select Your State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            >
              <option value="">-- Select your state --</option>
              {Object.keys(deliveryData).map((state) => (
                <option key={state} value={state}>
                  {state} — ₦{deliveryData[state].toLocaleString()} delivery
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Option */}
          {formData.state && (
            <div className="mb-5 md:mb-6">
              <label className="block text-brand-brown font-semibold mb-3 text-sm md:text-base">
                Delivery Option
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="pickup"
                    checked={formData.deliveryOption === "pickup"}
                    onChange={handleChange}
                    className="accent-brand-green"
                  />
                  <span className="text-brand-brown text-sm md:text-base">
                    Pick up at logistics office in {formData.state}
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="home"
                    checked={formData.deliveryOption === "home"}
                    onChange={handleChange}
                    className="accent-brand-green"
                  />
                  <span className="text-brand-brown text-sm md:text-base">
                    Home delivery
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Home Delivery Address */}
          {formData.deliveryOption === "home" && formData.state && (
            <div className="mb-5 md:mb-6">
              <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
                Home Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your home delivery address"
                rows="3"
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
              />
            </div>
          )}

          {/* Note */}
          <div className="mb-6 md:mb-8">
            <label className="block text-brand-brown font-semibold mb-2 text-sm md:text-base">
              Order Note{" "}
              <span className="text-brand-brown opacity-40 font-normal">
                (optional)
              </span>
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Any special requests or instructions?"
              rows="3"
              className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm md:text-base"
            />
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-brand-green text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-green-dark transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {loading ? (
              <>
                <Spinner />
                Processing...
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Pay ₦{orderTotal.toLocaleString()}
              </>
            )}
          </button>
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
              </span>
              <span className="flex-shrink-0">
                ₦
                {(
                  parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity
                ).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="flex justify-center my-4">
            <div className="h-px w-full bg-brand-gold opacity-20"></div>
          </div>

          <div className="flex justify-between text-xs md:text-sm text-brand-brown opacity-60 mb-2">
            <span>Subtotal</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs md:text-sm text-brand-brown opacity-60 mb-2">
            <span>Delivery Fee</span>
            <span>
              {formData.state ? `₦${deliveryFee.toLocaleString()}` : "—"}
            </span>
          </div>

          <div className="flex justify-center my-4">
            <div className="h-px w-full bg-brand-gold opacity-20"></div>
          </div>

          <div className="flex justify-between font-bold text-brand-brown text-base md:text-lg">
            <span>Total</span>
            <span>₦{orderTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
