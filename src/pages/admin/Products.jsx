import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Package,
  ChevronDown,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
  Loader,
  Plus,
  Trash2,
  X,
  Upload,
  PencilLine,
} from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const BUCKET = "variant-images";

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black bg-opacity-30" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-brand-brown">{title}</h2>
          <button onClick={onClose} className="text-brand-brown opacity-40 hover:opacity-80 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

async function uploadImage(file, path) {
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

const COLLECTION_FIELDS = [
  { label: "Product Name", key: "name", placeholder: "e.g. ABC Journals" },
  { label: "Collection Name", key: "collection_name", placeholder: "e.g. ABC Collection" },
  { label: "Collection Slug", key: "collection_slug", placeholder: "e.g. abc-collection" },
  { label: "Size", key: "size", placeholder: "e.g. A5" },
  { label: "Pages", key: "pages", placeholder: "e.g. 200 pages" },
];

const EMPTY_PRODUCT_FORM = {
  name: "", collection_name: "", collection_slug: "",
  description: "", size: "", pages: "", price: "",
  default_variant_slug: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceInput, setPriceInput] = useState("");
  const [savingPrice, setSavingPrice] = useState(false);
  const [addVariantFor, setAddVariantFor] = useState(null);
  const [variantForm, setVariantForm] = useState({ color: "", slug: "", inStock: true });
  const [variantImage, setVariantImage] = useState(null);
  const [variantImagePreview, setVariantImagePreview] = useState(null);
  const [savingVariant, setSavingVariant] = useState(false);
  const [deletingVariant, setDeletingVariant] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM);
  const [savingProduct, setSavingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products").select("*, variants(*)").order("numeric_id");
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const toggleVariantStock = async (variantId, current) => {
    setToggling(variantId);
    const { error } = await supabase.from("variants").update({ in_stock: !current }).eq("id", variantId);
    if (!error) {
      setProducts(prev => prev.map(p => ({
        ...p,
        variants: p.variants.map(v => v.id === variantId ? { ...v, in_stock: !current } : v),
      })));
    }
    setToggling(null);
  };

  const startEditPrice = (product) => {
    setEditingPrice(product.id);
    setPriceInput(String(product.price ? product.price / 100 : ""));
  };

  const savePrice = async (productId) => {
    const naira = parseInt(priceInput);
    if (isNaN(naira) || naira <= 0) { alert("Enter a valid price."); return; }
    setSavingPrice(true);
    const { error } = await supabase.from("products").update({ price: naira * 100 }).eq("id", productId);
    if (!error) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, price: naira * 100 } : p));
      setEditingPrice(null);
    } else { alert("Failed to save price."); }
    setSavingPrice(false);
  };

  const openAddVariant = (product) => {
    setAddVariantFor(product);
    setVariantForm({ color: "", slug: "", inStock: true });
    setVariantImage(null);
    setVariantImagePreview(null);
  };

  const handleVariantImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVariantImage(file);
    setVariantImagePreview(URL.createObjectURL(file));
  };

  const saveVariant = async () => {
    if (!variantForm.color.trim() || !variantForm.slug.trim()) {
      alert("Colour name and slug are required."); return;
    }
    setSavingVariant(true);
    try {
      let imageUrl = null;
      if (variantImage) {
        const path = `${addVariantFor.id}/${variantForm.slug}-${Date.now()}`;
        imageUrl = await uploadImage(variantImage, path);
      }
      const { data, error } = await supabase.from("variants").insert({
        product_id: addVariantFor.id,
        color: variantForm.color.trim(),
        slug: variantForm.slug.trim(),
        in_stock: variantForm.inStock,
        image_url: imageUrl,
      }).select().single();
      if (error) throw error;
      setProducts(prev => prev.map(p =>
        p.id === addVariantFor.id ? { ...p, variants: [...p.variants, data] } : p
      ));
      setAddVariantFor(null);
    } catch (err) { alert("Failed to add variant: " + err.message); }
    setSavingVariant(false);
  };

  const deleteVariant = async (variantId, productId) => {
    if (!window.confirm("Delete this colour variant? This cannot be undone.")) return;
    setDeletingVariant(variantId);
    const { error } = await supabase.from("variants").delete().eq("id", variantId);
    if (!error) {
      setProducts(prev => prev.map(p =>
        p.id === productId ? { ...p, variants: p.variants.filter(v => v.id !== variantId) } : p
      ));
    } else { alert("Failed to delete variant."); }
    setDeletingVariant(null);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm(EMPTY_PRODUCT_FORM);
    setShowProductModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      collection_name: product.collection_name || "",
      collection_slug: product.collection_slug || "",
      description: product.description || "",
      size: product.size || "",
      pages: product.pages || "",
      price: product.price ? String(product.price / 100) : "",
      default_variant_slug: product.default_variant_slug || "",
    });
    setShowProductModal(true);
  };

  const saveProduct = async () => {
    const { name, collection_name, collection_slug, price } = productForm;
    if (!name.trim() || !collection_name.trim() || !collection_slug.trim() || !price) {
      alert("Name, collection, collection slug, and price are required."); return;
    }
    const priceNaira = parseInt(price);
    if (isNaN(priceNaira) || priceNaira <= 0) { alert("Enter a valid price."); return; }
    setSavingProduct(true);
    try {
      const payload = {
        name: productForm.name.trim(),
        collection_name: productForm.collection_name.trim(),
        collection_slug: productForm.collection_slug.trim(),
        description: productForm.description.trim(),
        size: productForm.size.trim(),
        pages: productForm.pages.trim(),
        price: priceNaira * 100,
        default_variant_slug: productForm.default_variant_slug.trim() || null,
      };
      if (editingProduct) {
        const { data, error } = await supabase.from("products").update(payload)
          .eq("id", editingProduct.id).select().single();
        if (error) throw error;
        setProducts(prev => prev.map(p =>
          p.id === editingProduct.id ? { ...data, variants: p.variants } : p
        ));
      } else {
        const maxId = products.reduce((m, p) => Math.max(m, p.numeric_id || 0), 0);
        const { data, error } = await supabase.from("products")
          .insert({ ...payload, numeric_id: maxId + 1 }).select().single();
        if (error) throw error;
        setProducts(prev => [...prev, { ...data, variants: [] }]);
      }
      setShowProductModal(false);
    } catch (err) {
      alert(`Failed to ${editingProduct ? "update" : "add"} product: ` + err.message);
    }
    setSavingProduct(false);
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Delete this product and ALL its variants? This cannot be undone.")) return;
    setDeletingProduct(productId);
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    } else { alert("Failed to delete product."); }
    setDeletingProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-brand-brown opacity-50">
        <Loader className="w-6 h-6 animate-spin mr-2" />
        Loading products...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-1">Admin</p>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-brown">Products</h1>
          <p className="text-brand-brown opacity-50 text-sm mt-1">
            {products.length} products · full catalogue management
          </p>
        </div>
        <button
          onClick={openAddProduct}
          className="flex items-center gap-2 bg-brand-green text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-green-dark transition flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </button>
      </div>

      {/* Product list */}
      <div className="space-y-3">
        {products.map((product) => {
          const isOpen = expanded === product.id;
          const inStockCount = product.variants?.filter(v => v.in_stock).length ?? 0;
          const totalVariants = product.variants?.length ?? 0;

          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">

              {/* ── Product header row: name | price | chevron ── */}
              <div className="flex items-center px-4 md:px-6 py-4 gap-3">

                {/* Name + meta — tappable to expand */}
                <button
                  onClick={() => setExpanded(isOpen ? null : product.id)}
                  className="flex items-center gap-3 flex-1 text-left hover:opacity-80 transition min-w-0"
                >
                  <Package className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-brown text-sm md:text-base truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-brand-brown opacity-40 mt-0.5">
                      #{product.numeric_id} · {inStockCount}/{totalVariants} in stock
                    </p>
                  </div>
                </button>

                {/* Price — inline edit */}
                <div onClick={e => e.stopPropagation()} className="flex-shrink-0">
                  {editingPrice === product.id ? (
                    <div className="flex items-center gap-1">
                      <span className="text-brand-brown font-semibold text-sm">₦</span>
                      <input
                        type="number"
                        value={priceInput}
                        onChange={e => setPriceInput(e.target.value)}
                        className="border border-brand-gold border-opacity-40 rounded-lg px-2 py-1 text-sm text-brand-brown bg-brand-cream w-20 focus:outline-none"
                        autoFocus
                        onKeyDown={e => {
                          if (e.key === "Enter") savePrice(product.id);
                          if (e.key === "Escape") setEditingPrice(null);
                        }}
                      />
                      <button
                        onClick={() => savePrice(product.id)}
                        disabled={savingPrice}
                        className="bg-brand-green text-white text-xs px-2 py-1 rounded-lg hover:bg-brand-green-dark transition disabled:opacity-50"
                      >
                        {savingPrice ? "..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingPrice(null)}
                        className="text-brand-brown opacity-40 hover:opacity-80 text-xs px-1 py-1"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditPrice(product)}
                      className="text-sm font-semibold text-brand-brown hover:text-brand-green transition flex items-center gap-1"
                      title="Edit price"
                    >
                      {product.price ? `₦${(product.price / 100).toLocaleString()}` : "Set price"}
                      <PencilLine className="w-3 h-3 opacity-40" />
                    </button>
                  )}
                </div>

                {/* Chevron */}
                <button
                  onClick={() => setExpanded(isOpen ? null : product.id)}
                  className="flex-shrink-0 p-1"
                >
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-brand-brown opacity-40" />
                    : <ChevronDown className="w-4 h-4 text-brand-brown opacity-40" />}
                </button>
              </div>

              {/* ── Variants panel (shown when expanded) ── */}
              {isOpen && (
                <div className="border-t border-brand-gold border-opacity-10 px-4 md:px-6 py-4">

                  {/* Edit + Delete actions at the top of the panel */}
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => openEditProduct(product)}
                      className="text-xs font-semibold text-brand-brown opacity-60 hover:opacity-100 hover:bg-brand-cream border border-brand-gold border-opacity-20 px-3 py-1.5 rounded-lg transition"
                    >
                      Edit Collection
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      disabled={deletingProduct === product.id}
                      className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                    >
                      {deletingProduct === product.id
                        ? <Loader className="w-3 h-3 animate-spin" />
                        : <Trash2 className="w-3 h-3" />}
                      Delete
                    </button>
                  </div>

                  {/* Variant rows */}
                  {product.variants && product.variants.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {product.variants.map(variant => (
                        <div
                          key={variant.id}
                          className="flex items-center justify-between py-2 border-b border-brand-gold border-opacity-10 last:border-0 gap-2"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {variant.image_url ? (
                              <img
                                src={variant.image_url}
                                alt={variant.color}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-brand-cream flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-brand-brown capitalize truncate">{variant.color}</p>
                              <p className="text-xs text-brand-brown opacity-40 truncate">{variant.slug}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => toggleVariantStock(variant.id, variant.in_stock)}
                              disabled={toggling === variant.id}
                              className="flex items-center gap-1 text-xs font-semibold transition"
                            >
                              {toggling === variant.id ? (
                                <Loader className="w-4 h-4 animate-spin text-brand-brown opacity-40" />
                              ) : variant.in_stock ? (
                                <>
                                  <ToggleRight className="w-6 h-6 text-brand-green" />
                                  <span className="text-brand-green hidden sm:inline">In stock</span>
                                </>
                              ) : (
                                <>
                                  <ToggleLeft className="w-6 h-6 text-brand-brown opacity-30" />
                                  <span className="text-brand-brown opacity-40 hidden sm:inline">Out of stock</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => deleteVariant(variant.id, product.id)}
                              disabled={deletingVariant === variant.id}
                              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete variant"
                            >
                              {deletingVariant === variant.id
                                ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                : <Trash2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-brown opacity-40 mb-4">No variants yet.</p>
                  )}

                  {/* Add variant */}
                  <button
                    onClick={() => openAddVariant(product)}
                    className="flex items-center gap-2 text-sm text-brand-green font-semibold hover:opacity-70 transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add colour variant
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Add Variant Modal ── */}
      {addVariantFor && (
        <Modal title={`Add colour — ${addVariantFor.name}`} onClose={() => setAddVariantFor(null)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-1">Colour Name</label>
              <input type="text" value={variantForm.color}
                onChange={e => setVariantForm(f => ({ ...f, color: e.target.value }))}
                placeholder="e.g. Beige Sand"
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-1">
                Slug <span className="font-normal opacity-40">(URL-friendly, no spaces)</span>
              </label>
              <input type="text" value={variantForm.slug}
                onChange={e => setVariantForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                placeholder="e.g. beige-sand"
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">In Stock?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={variantForm.inStock}
                    onChange={() => setVariantForm(f => ({ ...f, inStock: true }))}
                    className="accent-brand-green" />
                  <span className="text-sm text-brand-brown">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!variantForm.inStock}
                    onChange={() => setVariantForm(f => ({ ...f, inStock: false }))}
                    className="accent-brand-green" />
                  <span className="text-sm text-brand-brown">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-2">Variant Image</label>
              {variantImagePreview && (
                <img src={variantImagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl mb-3" />
              )}
              <label className="flex items-center gap-2 cursor-pointer border border-dashed border-brand-gold border-opacity-40 rounded-xl px-4 py-3 hover:bg-brand-cream transition">
                <Upload className="w-4 h-4 text-brand-gold" />
                <span className="text-sm text-brand-brown opacity-60">
                  {variantImage ? variantImage.name : "Choose image (JPG, PNG, WebP)"}
                </span>
                <input type="file" accept="image/jpeg,image/png,image/webp"
                  onChange={handleVariantImageChange} className="hidden" />
              </label>
            </div>
            <button onClick={saveVariant} disabled={savingVariant}
              className="w-full bg-brand-green text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-green-dark transition disabled:opacity-50">
              {savingVariant ? <><Loader className="w-4 h-4 animate-spin" /> Saving...</> : "Add Variant"}
            </button>
          </div>
        </Modal>
      )}

      {/* ── Add / Edit Product Modal ── */}
      {showProductModal && (
        <Modal
          title={editingProduct ? `Edit — ${editingProduct.name}` : "New Journal Collection"}
          onClose={() => setShowProductModal(false)}
        >
          <div className="space-y-4">
            {COLLECTION_FIELDS.map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-brand-brown mb-1">{label}</label>
                <input type="text" value={productForm[key]}
                  onChange={e => setProductForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none text-sm" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-1">Price (₦)</label>
              <input type="number" value={productForm.price}
                onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))}
                placeholder="e.g. 7000"
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-1">
                Default Variant Slug <span className="font-normal opacity-40">(optional)</span>
              </label>
              <input type="text" value={productForm.default_variant_slug}
                onChange={e => setProductForm(f => ({ ...f, default_variant_slug: e.target.value }))}
                placeholder="e.g. beige-sand"
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-brown mb-1">
                Description <span className="font-normal opacity-40">(optional)</span>
              </label>
              <textarea value={productForm.description}
                onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short product description shown on the product page..."
                rows={3}
                className="w-full border border-brand-gold border-opacity-20 rounded-xl px-4 py-3 text-brand-brown bg-brand-cream focus:outline-none text-sm" />
            </div>
            {!editingProduct && (
              <p className="text-xs text-brand-brown opacity-40">
                After creating the collection, expand it to add colour variants and images.
              </p>
            )}
            <button onClick={saveProduct} disabled={savingProduct}
              className="w-full bg-brand-green text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-green-dark transition disabled:opacity-50">
              {savingProduct
                ? <><Loader className="w-4 h-4 animate-spin" /> Saving...</>
                : editingProduct ? "Save Changes" : "Create Collection"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Products;