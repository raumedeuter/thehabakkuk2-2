import { useState, useEffect } from 'react'
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { LayoutDashboard, ShoppingBag, Package, BarChart2, Truck, LogOut, Menu, X, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import Orders from './Orders'
import Analytics from './Analytics'
import Products from './Products'
import Delivery from './Delivery'

function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
    { to: '/admin/delivery', label: 'Delivery Fees', icon: Truck },
  ]

  return (
    <div className="flex min-h-screen bg-brand-cream">

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 h-full w-56 bg-white shadow-sm flex flex-col py-8 px-4 z-30
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden text-brand-brown opacity-40 hover:opacity-80 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-10 px-2">
          <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase">
            TheHabakkuk2:2
          </p>
          <p className="text-brand-brown font-bold text-lg mt-1">Admin</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-green text-white'
                    : 'text-brand-brown opacity-60 hover:opacity-100 hover:bg-brand-cream'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-brown opacity-60 hover:opacity-100 hover:bg-brand-cream transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-56 pb-20 md:pb-0">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow-sm sticky top-0 z-10">
          <div>
            <p className="text-brand-gold font-semibold tracking-widest text-xs uppercase leading-none">
              TheHabakkuk2:2
            </p>
            <p className="text-brand-brown font-bold text-sm">Admin</p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-brand-brown opacity-60 hover:opacity-100 transition p-1"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </div>
      </main>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-gold border-opacity-10 z-10 flex">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition ${
                isActive
                  ? 'text-brand-green'
                  : 'text-brand-brown opacity-40'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{label === 'Delivery Fees' ? 'Delivery' : label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium text-brand-brown opacity-40 hover:opacity-80 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px]">Logout</span>
        </button>
      </nav>

    </div>
  )
}

function StatCard({ label, value, sub, icon: Icon, iconColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-brand-brown opacity-40 uppercase tracking-wider">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-brand-brown">{value}</p>
      {sub && <p className="text-xs text-brand-brown opacity-40">{sub}</p>}
    </div>
  )
}

function Overview() {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Fetch all orders for stats
      const { data: orders } = await supabase
        .from('orders')
        .select('grand_total, payment_status, created_at')
        .order('created_at', { ascending: false })

      // Fetch 5 most recent orders for the table
      const { data: recent } = await supabase
        .from('orders')
        .select('id, customer_name, customer_state, grand_total, payment_status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      if (orders) {
        const paid = orders.filter(o => o.payment_status === 'paid')
        const revenue = paid.reduce((sum, o) => sum + (o.grand_total / 100), 0)

        // Orders in last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const recent30 = paid.filter(o => new Date(o.created_at) >= thirtyDaysAgo)

        setStats({
          totalRevenue: revenue,
          totalOrders: paid.length,
          last30Days: recent30.length,
          avgOrder: paid.length > 0 ? revenue / paid.length : 0,
        })
      }

      if (recent) setRecentOrders(recent)
      setLoading(false)
    }

    load()
  }, [])

  const fmt = (n) => `₦${Number(n).toLocaleString()}`
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-brown">Overview</h1>
        <p className="text-brand-brown opacity-40 text-sm mt-1">All-time store summary</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Total Revenue"
          value={fmt(stats?.totalRevenue ?? 0)}
          icon={TrendingUp}
          iconColor="bg-green-50 text-green-600"
        />
        <StatCard
          label="Total Orders"
          value={stats?.totalOrders ?? 0}
          icon={CheckCircle}
          iconColor="bg-blue-50 text-blue-500"
        />
        <StatCard
          label="Last 30 Days"
          value={stats?.last30Days ?? 0}
          sub="paid orders"
          icon={Clock}
          iconColor="bg-amber-50 text-amber-500"
        />
        <StatCard
          label="Avg Order"
          value={fmt(stats?.avgOrder ?? 0)}
          icon={AlertCircle}
          iconColor="bg-purple-50 text-purple-500"
        />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl p-5">
        <h2 className="text-sm font-bold text-brand-brown mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-brand-brown opacity-40 py-4 text-center">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-brand-brown opacity-40 text-xs uppercase tracking-wider">
                  <th className="text-left pb-3 font-semibold">Customer</th>
                  <th className="text-left pb-3 font-semibold">State</th>
                  <th className="text-right pb-3 font-semibold">Amount</th>
                  <th className="text-right pb-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-cream">
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td className="py-3 text-brand-brown font-medium">{order.customer_name || '—'}</td>
                    <td className="py-3 text-brand-brown opacity-60">{order.customer_state || '—'}</td>
                    <td className="py-3 text-right text-brand-brown font-semibold">{fmt(order.grand_total / 100)}</td>
                    <td className="py-3 text-right text-brand-brown opacity-40">{fmtDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard