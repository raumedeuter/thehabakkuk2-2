import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Trash2, ChevronRight, Check, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import fonts, { recommended, categories, fontsByCategory } from "../data/fonts";
import custom1 from "../assets/images/custom-sample-1.png";
import custom2 from "../assets/images/custom-sample-2.png";
import custom3 from "../assets/images/custom-sample-3.png";

const STEPS = ["Choose Journal", "Personalise", "Review Order", "Checkout"];

// ===== FONT CARD — outside CustomOrder to prevent remounting =====
const FontCard = ({ font, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(font.name)}
    className={`border-2 rounded-xl p-3 text-center transition w-full ${
      isSelected
        ? "border-brand-gold bg-brand-cream"
        : "border-brand-gold border-opacity-20 hover:border-opacity-50"
    }`}
  >
    <p style={font.style} className="text-brand-brown mb-1 truncate">
      Aa
    </p>
    <p className="text-brand-brown text-xs font-semibold truncate">
      {font.name}
    </p>
  </button>
);

// ===== ENTRY CARD — outside CustomOrder to prevent remounting =====
const EntryCard = ({
  entry,
  index,
  onRemove,
  onFontChange,
  onMessageChange,
  onOpenFontModal,
}) => (
  <div className="bg-white shadow-sm rounded-3xl p-5 md:p-8 mb-5">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-base md:text-lg font-bold text-brand-brown">
        Journal {index + 1}
      </h2>
      <button
        onClick={() => onRemove(entry.entryId)}
        className="text-brand-brown opacity-30 hover:opacity-70 hover:text-red-400 transition p-1"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>

    {/* Journal Info */}
    <div className="flex gap-3 mb-5 p-3 md:p-4 bg-brand-cream rounded-2xl">
      {entry.image && (
        <img
          src={entry.image}
          alt={entry.name}
          className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-xl flex-shrink-0 bg-white p-1"
        />
      )}
      <div className="min-w-0">
        <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-1 truncate">
          {entry.collection}
        </p>
        <p className="font-bold text-brand-brown text-sm truncate">
          {entry.name}
        </p>
        <p className="text-brand-brown opacity-50 text-xs mt-0.5">
          {entry.color} · {entry.size} · Qty: {entry.quantity}
        </p>
        <p className="text-brand-green font-bold text-sm mt-0.5">
          {entry.price}
        </p>
      </div>
    </div>

    {/* Customisation Details */}
    <p className="text-brand-brown font-semibold mb-3 text-sm">
      Customisation Details
    </p>

    {/* Recommended Fonts */}
    <div className="mb-3">
      <label className="block text-brand-brown opacity-60 text-xs mb-2">
        Select Font Style
      </label>
      <div className="grid grid-cols-3 gap-2">
        {recommended.map((font) => (
          <FontCard
            key={font.id}
            font={font}
            isSelected={entry.font === font.name}
            onSelect={onFontChange}
          />
        ))}
      </div>

      {/* More Fonts Button */}
      <button
        onClick={() => onOpenFontModal(entry.entryId)}
        className="w-full mt-2 text-brand-gold text-xs font-semibold py-2 border border-brand-gold border-opacity-20 rounded-xl hover:border-opacity-50 transition flex items-center justify-center gap-1"
      >
        <Plus className="w-3 h-3" />
        Browse More Fonts
      </button>

      {/* Show selected font if from modal */}
      {entry.font && !recommended.find((f) => f.name === entry.font) && (
        <div className="mt-2 p-3 bg-brand-cream rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs text-brand-brown opacity-50 mb-1">
              Selected font:
            </p>
            <p
              style={fonts.find((f) => f.name === entry.font)?.style}
              className="text-brand-brown text-sm"
            >
              {entry.font}
            </p>
          </div>
          <button
            onClick={() => onFontChange("")}
            className="text-brand-brown opacity-30 hover:opacity-60 transition"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>

    {/* Message */}
    <div>
      <label className="block text-brand-brown opacity-60 text-xs mb-2">
        What would you like on your journal?
      </label>
      <textarea
        value={entry.message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="e.g. My name, initials, a bible verse, a quote..."
        rows="3"
        className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none focus:border-brand-gold text-sm"
      />
    </div>
  </div>
);

// ===== MAIN COMPONENT =====
function CustomOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const passedProduct = location.state?.product || null;

  const buildEntryFromProduct = (p) => ({
    entryId: `${p.id}-${Date.now()}`,
    productId: p.id,
    name: p.name,
    collection: p.collection,
    color: p.color,
    colorSlug: p.colorSlug,
    size: p.size,
    pages: p.pages,
    quantity: p.quantity,
    image: p.image,
    price: p.price,
    font: "",
    message: "",
  });

  const [step, setStep] = useState(passedProduct ? 1 : 0);
  const [entries, setEntries] = useState(
    passedProduct ? [buildEntryFromProduct(passedProduct)] : [],
  );

  // Product Selector State
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectorStep, setSelectorStep] = useState("collection");
  const [selectorProduct, setSelectorProduct] = useState(null);
  const [selectorVariant, setSelectorVariant] = useState(null);
  const [selectorQuantity, setSelectorQuantity] = useState(1);

  // Font Modal State
  const [showFontModal, setShowFontModal] = useState(false);
  const [activeFontEntryId, setActiveFontEntryId] = useState(null);

  const availableCollections = [
    ...new Set(
      products
        .filter((p) => p.variants.some((v) => v.inStock))
        .map((p) => p.collection),
    ),
  ];

  const handleEntryChange = (entryId, field, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.entryId === entryId ? { ...e, [field]: value } : e)),
    );
  };

  const removeEntry = (entryId) => {
    setEntries((prev) => prev.filter((e) => e.entryId !== entryId));
  };

  const openProductSelector = () => {
    setSelectorStep("collection");
    setSelectorProduct(null);
    setSelectorVariant(null);
    setSelectorQuantity(1);
    setShowProductSelector(true);
  };

  const addSelectorProduct = () => {
    if (!selectorProduct || !selectorVariant) return;
    const newEntry = {
      entryId: `${selectorProduct.id}-${Date.now()}`,
      productId: selectorProduct.id,
      name: selectorProduct.name,
      collection: selectorProduct.collection,
      color: selectorVariant.color,
      colorSlug: selectorVariant.slug,
      size: selectorProduct.size,
      pages: selectorProduct.pages,
      quantity: selectorQuantity,
      image: selectorVariant.image,
      price: selectorProduct.price,
      font: "",
      message: "",
    };
    setEntries((prev) => [...prev, newEntry]);
    setShowProductSelector(false);
  };

  const openFontModal = (entryId) => {
    setActiveFontEntryId(entryId);
    setShowFontModal(true);
  };

  const selectFontFromModal = (fontName) => {
    if (activeFontEntryId) {
      handleEntryChange(activeFontEntryId, "font", fontName);
    }
    setShowFontModal(false);
    setActiveFontEntryId(null);
  };

  const handleContinueToCheckout = () => {
    const incomplete = entries.some((e) => !e.font || !e.message);
    if (incomplete) {
      alert("Please complete all customisation details for each journal.");
      return;
    }
    entries.forEach((entry) => {
      addToCart(
        {
          id: `${entry.productId}-${entry.colorSlug}-custom-${entry.entryId}`,
          name: `${entry.name} — ${entry.color}`,
          price: entry.price,
          image: entry.image,
          collection: entry.collection,
          isCustomised: true,
          customisation: {
            font: entry.font,
            message: entry.message,
          },
          quantity: entry.quantity,
        },
        entry.quantity,
      );
    });
    navigate("/cart");
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ===== HERO ===== */}
      <section className="px-6 md:px-16 py-10 md:py-16 text-center">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-4">
          Made Just For You
        </p>
        <h1 className="text-2xl md:text-4xl font-bold text-brand-brown mb-4">
          Build Your Custom Order
        </h1>
        <p className="text-brand-brown opacity-70 text-sm md:text-base max-w-xl mx-auto">
          Add a name, initials or custom design to your journal cover. Each
          customisation is{" "}
          <span className="font-semibold text-brand-green">₦1,000</span> per
          journal.
        </p>
      </section>

      {/* ===== PROGRESS INDICATOR ===== */}
      <div className="px-6 md:px-16 mb-8">
        <div className="flex items-center justify-center gap-1 md:gap-3 max-w-lg mx-auto">
          {STEPS.map((s, index) => (
            <div key={s} className="flex items-center gap-1 md:gap-3">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition flex-shrink-0 ${
                    index < step
                      ? "bg-brand-green text-white"
                      : index === step
                        ? "bg-brand-gold text-white"
                        : "bg-white border border-brand-gold border-opacity-30 text-brand-brown opacity-40"
                  }`}
                >
                  {index < step ? <Check className="w-3 h-3" /> : index + 1}
                </div>
                <p
                  className={`text-xs font-semibold hidden sm:block text-center ${
                    index === step
                      ? "text-brand-gold"
                      : index < step
                        ? "text-brand-green"
                        : "text-brand-brown opacity-40"
                  }`}
                >
                  {s}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-px w-5 md:w-10 mb-4 flex-shrink-0 ${
                    index < step ? "bg-brand-green" : "bg-brand-gold opacity-20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="flex justify-center pb-6 px-6">
        <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
      </div>

      {/* ===== STEP 0 ===== */}
      {step === 0 && (
        <div>
          <section className="px-6 md:px-16 py-8 md:py-10">
            <h2 className="text-lg md:text-2xl font-bold text-brand-brown mb-2 text-center">
              See What's Possible
            </h2>

            <p className="text-brand-brown opacity-60 text-sm text-center mb-6 md:mb-8">
              A few examples of our customised journals
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
              {[custom1, custom2, custom3].map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-sm bg-white"
                >
                  <img
                    src={image}
                    alt={`Custom journal sample ${index + 1}`}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center py-6 px-6">
            <div className="h-px w-1/2 bg-brand-gold opacity-20"></div>
          </div>

          <section className="px-6 md:px-16 py-8 md:py-10">
            <h2 className="text-lg md:text-2xl font-bold text-brand-brown mb-2 text-center">
              Choose Your Font Style
            </h2>
            <p className="text-brand-brown opacity-60 text-sm text-center mb-6 md:mb-8">
              Pick the font that speaks to your vision
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-10">
              {recommended.map((font) => (
                <div
                  key={font.id}
                  className="bg-white rounded-2xl shadow-sm p-5 md:p-6 text-center"
                >
                  <p style={font.style} className="text-brand-brown mb-3">
                    Write it!
                  </p>
                  <p className="font-semibold text-brand-brown text-sm">
                    {font.name}
                  </p>
                  <p className="text-brand-brown opacity-50 text-xs mt-1">
                    {font.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  if (!passedProduct) openProductSelector();
                  setStep(1);
                }}
                className="bg-brand-green text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold hover:bg-brand-green-dark transition text-sm md:text-base"
              >
                Start Building My Order →
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ===== STEP 1 — PERSONALISE ===== */}
      {step === 1 && (
        <section className="px-4 md:px-16 py-8 md:py-10 max-w-3xl mx-auto">
          {entries.length === 0 && (
            <div className="text-center py-10">
              <p className="text-brand-brown opacity-60 mb-4 text-sm">
                No journals added yet. Add one to get started!
              </p>
            </div>
          )}

          {entries.map((entry, index) => (
            <EntryCard
              key={entry.entryId}
              entry={entry}
              index={index}
              onRemove={removeEntry}
              onFontChange={(value) =>
                handleEntryChange(entry.entryId, "font", value)
              }
              onMessageChange={(value) =>
                handleEntryChange(entry.entryId, "message", value)
              }
              onOpenFontModal={openFontModal}
            />
          ))}

          <button
            onClick={openProductSelector}
            className="w-full border-2 border-brand-gold border-opacity-30 border-dashed text-brand-gold py-3 md:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:border-opacity-60 transition mb-5 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Another Journal
          </button>

          {entries.length > 0 && (
            <button
              onClick={() => {
                const incomplete = entries.some((e) => !e.font || !e.message);
                if (incomplete) {
                  alert(
                    "Please complete all customisation details before continuing.",
                  );
                  return;
                }
                setStep(2);
              }}
              className="w-full bg-brand-green text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-green-dark transition text-sm md:text-base"
            >
              Review My Order →
            </button>
          )}
        </section>
      )}

      {/* ===== STEP 2 — REVIEW ORDER ===== */}
      {step === 2 && (
        <section className="px-4 md:px-16 py-8 md:py-10 max-w-3xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-brand-brown mb-5">
            Review Your Order
          </h2>

          {entries.map((entry, index) => (
            <div
              key={entry.entryId}
              className="bg-white shadow-sm rounded-3xl p-5 md:p-6 mb-4"
            >
              {/* Top row — image + basic info + actions */}
              <div className="flex gap-3 md:gap-4 mb-4">
                {entry.image && (
                  <img
                    src={entry.image}
                    alt={entry.name}
                    className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-xl flex-shrink-0 bg-brand-cream p-1"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider mb-0.5 truncate">
                    {entry.collection}
                  </p>
                  <p className="font-bold text-brand-brown text-sm leading-tight">
                    {entry.name}
                  </p>
                  <p className="text-brand-brown text-sm">{entry.color}</p>
                  <p className="text-brand-brown opacity-50 text-xs mt-0.5">
                    {entry.size} · Qty: {entry.quantity}
                  </p>
                  <p className="text-brand-green font-bold text-sm mt-0.5">
                    {entry.price}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => setStep(1)}
                    className="text-brand-gold text-xs font-semibold hover:opacity-70 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeEntry(entry.entryId)}
                    className="text-brand-brown opacity-30 hover:opacity-70 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Customisation details — separate row */}
              <div className="border-t border-brand-gold border-opacity-10 pt-3">
                <p className="text-xs text-brand-brown opacity-50 mb-2">
                  Customisation
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {entry.font && (
                    <div>
                      <p className="text-xs text-brand-brown opacity-40">
                        Font
                      </p>
                      <p className="text-xs text-brand-brown font-semibold">
                        {entry.font}
                      </p>
                    </div>
                  )}
                  {entry.message && (
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-brand-brown opacity-40">
                        Message
                      </p>
                      <p className="text-xs text-brand-brown break-words">
                        {entry.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Cost Summary */}
          <div className="bg-white shadow-sm rounded-2xl p-5 md:p-6 mb-5">
            {entries.map((entry, index) => (
              <div
                key={entry.entryId}
                className="flex justify-between text-sm text-brand-brown opacity-60 mb-2"
              >
                <span className="truncate mr-2">
                  Journal {index + 1} — {entry.name}
                </span>
                <span className="flex-shrink-0">+₦1,000</span>
              </div>
            ))}
            <div className="flex justify-center my-3">
              <div className="h-px w-full bg-brand-gold opacity-20"></div>
            </div>
            <div className="flex justify-between font-bold text-brand-brown text-sm md:text-base">
              <span>Total Customisation</span>
              <span>₦{(entries.length * 1000).toLocaleString()}</span>
            </div>
            <p className="text-brand-brown opacity-40 text-xs mt-2">
              Journal prices + delivery will be calculated at checkout
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border-2 border-brand-green text-brand-green py-3 md:py-4 rounded-full font-semibold hover:bg-brand-green hover:text-white transition text-sm md:text-base"
            >
              ← Edit
            </button>
            <button
              onClick={handleContinueToCheckout}
              className="flex-1 bg-brand-green text-white py-3 md:py-4 rounded-full font-semibold hover:bg-brand-green-dark transition text-sm md:text-base"
            >
              Continue to Checkout →
            </button>
          </div>
        </section>
      )}

      {/* ===== PRODUCT SELECTOR MODAL ===== */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-brand-brown bg-opacity-50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full md:max-w-md max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-brand-brown text-lg">
                {selectorStep === "collection" && "Choose Collection"}
                {selectorStep === "colour" && "Choose Colour"}
                {selectorStep === "quantity" && "Choose Quantity"}
              </h3>
              <button
                onClick={() => setShowProductSelector(false)}
                className="text-brand-brown opacity-40 hover:opacity-70 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectorStep === "collection" && (
              <div className="flex flex-col gap-2">
                {availableCollections.map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      const prod = products.find((p) => p.collection === col);
                      setSelectorProduct(prod);
                      setSelectorStep("colour");
                    }}
                    className="flex items-center justify-between p-4 bg-brand-cream rounded-2xl hover:bg-brand-gold hover:bg-opacity-10 transition text-left"
                  >
                    <span className="text-brand-brown font-semibold text-sm">
                      {col}
                    </span>
                    <ChevronRight className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {selectorStep === "colour" && selectorProduct && (
              <div>
                <button
                  onClick={() => setSelectorStep("collection")}
                  className="text-brand-gold text-sm mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>
                <div className="flex flex-wrap gap-3">
                  {selectorProduct.variants
                    .filter((v) => v.inStock)
                    .map((variant) => (
                      <button
                        key={variant.slug}
                        onClick={() => {
                          setSelectorVariant(variant);
                          setSelectorStep("quantity");
                        }}
                        className={`relative rounded-xl overflow-hidden border-2 transition ${
                          selectorVariant?.slug === variant.slug
                            ? "border-brand-gold"
                            : "border-transparent hover:border-brand-gold hover:border-opacity-40"
                        }`}
                      >
                        {variant.image ? (
                          <img
                            src={variant.image}
                            alt={variant.color}
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-brand-cream flex items-center justify-center p-1">
                            <p className="text-brand-brown opacity-40 text-xs text-center">
                              {variant.color}
                            </p>
                          </div>
                        )}
                        <p className="text-xs text-center text-brand-brown py-1 px-1 truncate max-w-[64px]">
                          {variant.color}
                        </p>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {selectorStep === "quantity" && (
              <div>
                <button
                  onClick={() => setSelectorStep("colour")}
                  className="text-brand-gold text-sm mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>
                <div className="flex gap-3 mb-5 p-3 bg-brand-cream rounded-2xl">
                  {selectorVariant?.image && (
                    <img
                      src={selectorVariant.image}
                      alt={selectorVariant.color}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-brand-brown text-sm truncate">
                      {selectorProduct?.name}
                    </p>
                    <p className="text-brand-brown opacity-50 text-xs">
                      {selectorVariant?.color}
                    </p>
                    <p className="text-brand-green font-bold text-sm">
                      {selectorProduct?.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-brand-brown font-semibold text-sm">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-brand-gold border-opacity-40 rounded-full overflow-hidden">
                    <button
                      onClick={() =>
                        setSelectorQuantity((q) => Math.max(1, q - 1))
                      }
                      className="px-4 py-2 hover:bg-brand-cream transition text-brand-brown"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-semibold text-brand-brown text-sm">
                      {selectorQuantity}
                    </span>
                    <button
                      onClick={() => setSelectorQuantity((q) => q + 1)}
                      className="px-4 py-2 hover:bg-brand-cream transition text-brand-brown"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={addSelectorProduct}
                  className="w-full bg-brand-green text-white py-3 rounded-full font-semibold hover:bg-brand-green-dark transition text-sm"
                >
                  Add Journal {entries.length + 1}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== FONT MODAL ===== */}
      {showFontModal && (
        <div className="fixed inset-0 bg-brand-brown bg-opacity-50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full md:max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-brand-brown text-lg">
                Browse Fonts
              </h3>
              <button
                onClick={() => setShowFontModal(false)}
                className="text-brand-brown opacity-40 hover:opacity-70 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-brand-gold font-semibold text-xs uppercase tracking-widest mb-3">
                Recommended
              </p>
              <div className="grid grid-cols-3 gap-2">
                {recommended.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => selectFontFromModal(font.name)}
                    className="border border-brand-gold border-opacity-20 rounded-xl p-3 text-center hover:border-brand-gold hover:bg-brand-cream transition"
                  >
                    <p
                      style={font.style}
                      className="text-brand-brown mb-1 truncate"
                    >
                      Aa
                    </p>
                    <p className="text-brand-brown text-xs font-semibold truncate">
                      {font.name}
                    </p>
                    <p className="text-brand-brown opacity-40 text-xs truncate">
                      {font.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {categories.map((category) => (
              <div key={category} className="mb-6">
                <p className="text-brand-gold font-semibold text-xs uppercase tracking-widest mb-3">
                  {category}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {fontsByCategory(category).map((font) => (
                    <button
                      key={font.id}
                      onClick={() => selectFontFromModal(font.name)}
                      className="border border-brand-gold border-opacity-20 rounded-xl p-3 text-center hover:border-brand-gold hover:bg-brand-cream transition"
                    >
                      <p
                        style={font.style}
                        className="text-brand-brown mb-1 truncate"
                      >
                        Aa
                      </p>
                      <p className="text-brand-brown text-xs font-semibold truncate">
                        {font.name}
                      </p>
                      <p className="text-brand-brown opacity-40 text-xs truncate">
                        {font.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomOrder;
