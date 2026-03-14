import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import DashboardLayout from './components/layout/DashboardLayout'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/admin/Dashboard'
import Merchants from './pages/admin/Merchants'
import AdminTransactions from './pages/admin/Transactions'
import MerchantOverview from './pages/merchant/Overview'
import MerchantTransactions from './pages/merchant/Transactions'
import Balance from './pages/merchant/Balance'
import Products from './pages/merchant/Products'
import Disputes from './pages/merchant/Disputes'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pay/:checkoutId" element={<Checkout />} />

          {/* Admin routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<PlaceholderPage title="Solicitacoes Gateway" subtitle="Solicitacoes pendentes de aprovacao" />} />
            <Route path="/admin/merchants" element={<Merchants />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/transfers" element={<PlaceholderPage title="Todas as transferencias" subtitle="Repasses para lojistas" />} />
            <Route path="/admin/anticipations" element={<PlaceholderPage title="Todas as antecipacoes" subtitle="Antecipacoes de recebiveis" />} />
            <Route path="/admin/users" element={<PlaceholderPage title="Todos os usuarios" subtitle="Usuarios da plataforma" />} />
            <Route path="/admin/revenue-by-merchant" element={<PlaceholderPage title="Faturamento por empresa" subtitle="Volume processado por lojista" />} />
            <Route path="/admin/revenue-by-period" element={<PlaceholderPage title="Faturamento por periodo" subtitle="Volume ao longo do tempo" />} />
            <Route path="/admin/commissions" element={<PlaceholderPage title="Comissoes por periodo" subtitle="Receita da plataforma" />} />
            <Route path="/admin/profit-by-merchant" element={<PlaceholderPage title="Lucro por empresa" subtitle="Lucro liquido por lojista" />} />
            <Route path="/admin/white-label" element={<PlaceholderPage title="Configuracoes White Label" subtitle="Personalizacao da plataforma" />} />
            <Route path="/admin/payment-rules" element={<PlaceholderPage title="Regras de pagamento" subtitle="Taxas e limites" />} />

            {/* Merchant routes */}
            <Route path="/dashboard" element={<MerchantOverview />} />
            <Route path="/dashboard/transactions" element={<MerchantTransactions />} />
            <Route path="/dashboard/balance" element={<Balance />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/checkout-links" element={<PlaceholderPage title="Links de Checkout" subtitle="Links de pagamento" />} />
            <Route path="/dashboard/customers" element={<PlaceholderPage title="Clientes" subtitle="Seus compradores" />} />
            <Route path="/dashboard/disputes" element={<Disputes />} />
            <Route path="/dashboard/webhooks" element={<PlaceholderPage title="Webhooks" subtitle="Configurar webhooks" />} />
            <Route path="/dashboard/api-keys" element={<PlaceholderPage title="API Keys" subtitle="Chaves de integracao" />} />
            <Route path="/dashboard/settings" element={<PlaceholderPage title="Configuracoes" subtitle="Configuracoes da conta" />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
