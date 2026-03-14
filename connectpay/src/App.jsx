import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import DashboardLayout from './components/layout/DashboardLayout'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'

// Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import Merchants from './pages/admin/Merchants'
import AdminTransactions from './pages/admin/Transactions'
import Requests from './pages/admin/Requests'
import Transfers from './pages/admin/Transfers'
import Anticipations from './pages/admin/Anticipations'
import Users from './pages/admin/Users'
import RevenueByMerchant from './pages/admin/RevenueByMerchant'
import RevenueByPeriod from './pages/admin/RevenueByPeriod'
import Commissions from './pages/admin/Commissions'
import ProfitByMerchant from './pages/admin/ProfitByMerchant'
import WhiteLabel from './pages/admin/WhiteLabel'
import PaymentRules from './pages/admin/PaymentRules'

// Merchant pages
import MerchantOverview from './pages/merchant/Overview'
import MerchantTransactions from './pages/merchant/Transactions'
import Balance from './pages/merchant/Balance'
import Products from './pages/merchant/Products'
import Disputes from './pages/merchant/Disputes'
import Customers from './pages/merchant/Customers'
import CheckoutLinks from './pages/merchant/CheckoutLinks'
import Webhooks from './pages/merchant/Webhooks'
import APIKeys from './pages/merchant/APIKeys'
import Settings from './pages/merchant/Settings'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pay/:checkoutId" element={<Checkout />} />

          {/* Admin routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<Requests />} />
            <Route path="/admin/merchants" element={<Merchants />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/transfers" element={<Transfers />} />
            <Route path="/admin/anticipations" element={<Anticipations />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/revenue-by-merchant" element={<RevenueByMerchant />} />
            <Route path="/admin/revenue-by-period" element={<RevenueByPeriod />} />
            <Route path="/admin/commissions" element={<Commissions />} />
            <Route path="/admin/profit-by-merchant" element={<ProfitByMerchant />} />
            <Route path="/admin/white-label" element={<WhiteLabel />} />
            <Route path="/admin/payment-rules" element={<PaymentRules />} />

            {/* Merchant routes */}
            <Route path="/dashboard" element={<MerchantOverview />} />
            <Route path="/dashboard/transactions" element={<MerchantTransactions />} />
            <Route path="/dashboard/balance" element={<Balance />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/checkout-links" element={<CheckoutLinks />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/disputes" element={<Disputes />} />
            <Route path="/dashboard/webhooks" element={<Webhooks />} />
            <Route path="/dashboard/api-keys" element={<APIKeys />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
