import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Truck, Pencil, Check, X, Loader } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Delivery() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [feeInput, setFeeInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("delivery_fees")
      .select("*")
      .order("state");
    if (!error) setFees(data || []);
    setLoading(false);
  };

  const startEdit = (fee) => {
    setEditingId(fee.id);
    setFeeInput(String(fee.fee_kobo / 100));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFeeInput("");
  };

  const saveFee = async (id) => {
    const naira = parseInt(feeInput);
    if (isNaN(naira) || naira < 0) {
      alert("Please enter a valid fee in Naira.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("delivery_fees")
      .update({ fee_kobo: naira * 100 })
      .eq("id", id);
    if (!error) {
      setFees((prev) =>
        prev.map((f) => (f.id === id ? { ...f, fee_kobo: naira * 100 } : f))
      );
      setEditingId(null);
    } else {
      alert("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-brand-brown opacity-50">
        <Loader className="w-6 h-6 animate-spin mr-2" />
        Loading delivery fees...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase mb-1">
          Admin
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-brand-brown">
          Delivery Fees
        </h1>
        <p className="text-brand-brown opacity-50 text-sm mt-1">
          {fees.length} states · click the pencil to edit a fee
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-3 px-6 py-3 border-b border-brand-gold border-opacity-10 text-xs font-semibold text-brand-brown opacity-40 uppercase tracking-widest">
          <span>State</span>
          <span className="text-right">Fee (₦)</span>
          <span className="text-right">Action</span>
        </div>

        {fees.map((fee) => (
          <div
            key={fee.id}
            className="grid grid-cols-3 items-center px-6 py-3 border-b border-brand-gold border-opacity-10 last:border-0 hover:bg-brand-cream transition"
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-gold opacity-60 flex-shrink-0" />
              <span className="text-sm font-medium text-brand-brown">
                {fee.state}
              </span>
            </div>

            <div className="text-right">
              {editingId === fee.id ? (
                <div className="flex items-center justify-end gap-1">
                  <span className="text-brand-brown text-sm">₦</span>
                  <input
                    type="number"
                    value={feeInput}
                    onChange={(e) => setFeeInput(e.target.value)}
                    className="border border-brand-gold border-opacity-40 rounded-lg px-2 py-1 text-sm text-brand-brown bg-brand-cream w-24 focus:outline-none text-right"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveFee(fee.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                </div>
              ) : (
                <span className="text-sm font-semibold text-brand-brown">
                  ₦{(fee.fee_kobo / 100).toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              {editingId === fee.id ? (
                <>
                  <button
                    onClick={() => saveFee(fee.id)}
                    disabled={saving}
                    className="p-1.5 rounded-lg bg-brand-green text-white hover:bg-brand-green-dark transition disabled:opacity-50"
                    title="Save"
                  >
                    {saving ? (
                      <Loader className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-1.5 rounded-lg bg-brand-cream text-brand-brown opacity-60 hover:opacity-100 transition"
                    title="Cancel"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => startEdit(fee)}
                  className="p-1.5 rounded-lg hover:bg-brand-cream text-brand-brown opacity-40 hover:opacity-80 transition"
                  title="Edit fee"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Delivery;