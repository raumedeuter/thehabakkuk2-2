import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { TrendingUp, ShoppingBag, Package, MapPin } from 'lucide-react'

function Analytics() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('payment_status', 'paid')
      if (!error) setOrders(data)
      setLoading(false)
    }
    fetchOrders()
  }, [])

  if (loading) {
    return <p className="text-brand-brown opacity-40 text-sm">Loading analytics...</p>
  }

  // ── Calculations ──────────────────────────────────────────────
  const totalRevenue = orders.reduce((sum, o) => sum + o.grand_total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Bestselling products
  const productMap = {}
  orders.forEach((order) => {
    order.order_items.forEach((item) => {
      const key = item.product_name
      if (!productMap[key]) productMap[key] = { name: key, qty: 0, revenue: 0 }
      productMap[key].qty += item.quantity
      productMap[key].revenue += item.subtotal
    })
  })
  const bestsellers = Object.values(productMap).sort((a, b) => b.qty - a.qty)

  // Revenue by state
  const stateMap = {}
  orders.forEach((order) => {
    const state = order.delivery_state
    if (!stateMap[state]) stateMap[state] = { state, orders: 0, revenue: 0 }
    stateMap[state].orders += 1
    stateMap[state].revenue += order.grand_total
  })
  const byState = Object.values(stateMap).sort((a, b) => b.revenue - a.revenue)

  // Revenue by month
  const monthMap = {}
  orders.forEach((order) => {
    const month = new Date(order.paid_at).toLocaleDateString('en-NG', {
      month: 'short', year: 'numeric',
    })
    if (!monthMap[month]) monthMap[month] = 0
    monthMap[month] += order.grand_total
  })
  const byMonth = Object.entries(monthMap).slice(-6)
  const maxMonthRevenue = Math.max(...byMonth.map(([, v]) => v), 1)

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-brown mb-6">Analytics</h1>

      {/* Stat tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatTile
          icon={TrendingUp}
          label="Total Revenue"
          value={`₦${(totalRevenue / 100).toLocaleString()}`}
        />
        <StatTile
          icon={ShoppingBag}
          label="Total Orders"
          value={totalOrders}
        />
        <StatTile
          icon={Package}
          label="Avg. Order Value"
          value={`₦${(avgOrderValue / 100).toLocaleString()}`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue by month */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-5">
            Revenue by Month
          </p>
          {byMonth.length === 0 ? (
            <p className="text-brand-brown opacity-40 text-sm">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {byMonth.map(([month, revenue]) => (
                <div key={month}>
                  <div className="flex justify-between text-xs text-brand-brown mb-1">
                    <span>{month}</span>
                    <span className="font-semibold">₦{(revenue / 100).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-brand-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-green rounded-full transition-all"
                      style={{ width: `${(revenue / maxMonthRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bestsellers */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-5">
            Bestselling Products
          </p>
          {bestsellers.length === 0 ? (
            <p className="text-brand-brown opacity-40 text-sm">No data yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {bestsellers.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-brand-gold font-bold text-xs w-5">#{i + 1}</span>
                    <span className="text-brand-brown font-medium">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-brown font-semibold">{product.qty} sold</p>
                    <p className="text-brand-brown opacity-40 text-xs">
                      ₦{(product.revenue / 100).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue by state */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-5">
            <MapPin className="inline w-3 h-3 mr-1" />
            Orders by State
          </p>
          {byState.length === 0 ? (
            <p className="text-brand-brown opacity-40 text-sm">No data yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {byState.map((s) => (
                <div key={s.state} className="bg-brand-cream rounded-xl px-4 py-3">
                  <p className="text-brand-brown font-semibold text-sm">{s.state}</p>
                  <p className="text-brand-brown opacity-50 text-xs">{s.orders} order{s.orders !== 1 ? 's' : ''}</p>
                  <p className="text-brand-green font-bold text-sm">
                    ₦{(s.revenue / 100).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatTile({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-brand-green bg-opacity-10 rounded-xl flex items-center justify-center">
          <Icon className="w-4 h-4 text-brand-cream" />
        </div>
        <p className="text-brand-brown opacity-50 text-xs font-semibold uppercase tracking-widest">
          {label}
        </p>
      </div>
      <p className="text-brand-brown font-bold text-2xl">{value}</p>
    </div>
  )
}

export default Analytics