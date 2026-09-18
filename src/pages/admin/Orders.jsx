import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('paid_at', { ascending: false })

      if (!error) setOrders(data)
      setLoading(false)
    }
    fetchOrders()
  }, [])

  if (loading) {
    return <p className="text-brand-brown opacity-40 text-sm">Loading orders...</p>
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-brand-brown mb-2">Orders</h1>
        <p className="text-brand-brown opacity-40 text-sm mt-6">No orders yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-brown mb-6">Orders</h1>

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Order header row */}
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-brand-cream transition"
            >
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-brand-brown font-semibold text-sm">{order.customer_name}</p>
                  <p className="text-brand-brown opacity-40 text-xs">{order.customer_email}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-brand-brown opacity-50 text-xs">{order.delivery_state}</p>
                </div>
                <div>
                  <span className="bg-brand-green bg-opacity-10 text-brand-cream text-xs font-semibold px-3 py-1 rounded-full">
                    {order.payment_status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-brand-brown font-bold text-sm">
                    ₦{(order.grand_total / 100).toLocaleString()}
                  </p>
                  <p className="text-brand-brown opacity-40 text-xs">
                    {new Date(order.paid_at).toLocaleDateString('en-NG', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
                {expanded === order.id
                  ? <ChevronUp className="w-4 h-4 text-brand-brown opacity-40" />
                  : <ChevronDown className="w-4 h-4 text-brand-brown opacity-40" />
                }
              </div>
            </button>

            {/* Expanded order details */}
            {expanded === order.id && (
              <div className="border-t border-brand-gold border-opacity-10 px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">Customer</p>
                    <p className="text-brand-brown text-sm">{order.customer_name}</p>
                    <p className="text-brand-brown opacity-60 text-sm">{order.customer_email}</p>
                    <p className="text-brand-brown opacity-60 text-sm">{order.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">Delivery</p>
                    <p className="text-brand-brown text-sm">{order.delivery_state}</p>
                    <p className="text-brand-brown opacity-60 text-sm">{order.delivery_option}</p>
                    {order.delivery_address && (
                      <p className="text-brand-brown opacity-60 text-sm">{order.delivery_address}</p>
                    )}
                  </div>
                </div>

                <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">Items</p>
                <div className="flex flex-col gap-2 mb-5">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-brand-brown bg-brand-cream rounded-xl px-4 py-3">
                      <div>
                        <span className="font-medium">{item.product_name}</span>
                        {item.variant_color && <span className="opacity-50"> — {item.variant_color}</span>}
                        {item.is_customised && (
                          <span className="ml-2 text-brand-gold text-xs font-semibold">✦ Personalised</span>
                        )}
                        <span className="opacity-50"> × {item.quantity}</span>
                      </div>
                      <span className="font-semibold">₦{(item.subtotal / 100).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1 text-sm border-t border-brand-gold border-opacity-10 pt-4">
                  <div className="flex justify-between text-brand-brown opacity-60">
                    <span>Products</span>
                    <span>₦{(order.products_total / 100).toLocaleString()}</span>
                  </div>
                  {order.customisation_total > 0 && (
                    <div className="flex justify-between text-brand-gold">
                      <span>Personalisation</span>
                      <span>₦{(order.customisation_total / 100).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-brown opacity-60">
                    <span>Delivery</span>
                    <span>₦{(order.delivery_fee / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-brown font-bold text-base pt-1">
                    <span>Total</span>
                    <span>₦{(order.grand_total / 100).toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-brand-brown opacity-30 text-xs mt-4">
                  Ref: {order.paystack_reference}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders