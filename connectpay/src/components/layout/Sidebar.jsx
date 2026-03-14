import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, FileCheck, Building2, ArrowLeftRight,
  Send, Clock, Users, BarChart3, Calendar, Coins,
  TrendingUp, Settings, Shield, Wallet, Package,
  Link, AlertTriangle, Webhook, Key, ChevronDown,
  ChevronRight, LogOut, Zap, Menu, X, QrCode
} from 'lucide-react'

const adminMenuSections = [
  {
    title: 'Admin',
    items: [
      { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { label: 'Solicitacoes Gateway', path: '/admin/requests', icon: FileCheck },
      { label: 'Todas as empresas', path: '/admin/merchants', icon: Building2 },
      { label: 'Todas as transacoes', path: '/admin/transactions', icon: ArrowLeftRight },
      { label: 'Todas as transferencias', path: '/admin/transfers', icon: Send },
      { label: 'Todas as antecipacoes', path: '/admin/anticipations', icon: Clock },
      { label: 'Todos os usuarios', path: '/admin/users', icon: Users },
      { label: 'Faturamento por empresa', path: '/admin/revenue-by-merchant', icon: BarChart3 },
      { label: 'Faturamento por periodo', path: '/admin/revenue-by-period', icon: Calendar },
      { label: 'Comissoes por periodo', path: '/admin/commissions', icon: Coins },
      { label: 'Lucro por empresa', path: '/admin/profit-by-merchant', icon: TrendingUp },
    ],
  },
  {
    title: 'White Label',
    items: [
      { label: 'Configuracoes', path: '/admin/white-label', icon: Settings },
      { label: 'Regras de pagamento', path: '/admin/payment-rules', icon: Shield },
    ],
  },
]

const merchantMenuSections = [
  {
    title: 'Menu',
    items: [
      { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Transacoes', path: '/dashboard/transactions', icon: ArrowLeftRight },
      { label: 'Saldo e Saques', path: '/dashboard/balance', icon: Wallet },
      { label: 'Produtos', path: '/dashboard/products', icon: Package },
      { label: 'Links de Checkout', path: '/dashboard/checkout-links', icon: Link },
      { label: 'Clientes', path: '/dashboard/customers', icon: Users },
      { label: 'Disputas', path: '/dashboard/disputes', icon: AlertTriangle },
    ],
  },
  {
    title: 'Integracao',
    items: [
      { label: 'Webhooks', path: '/dashboard/webhooks', icon: Webhook },
      { label: 'API Keys', path: '/dashboard/api-keys', icon: Key },
      { label: 'Configuracoes', path: '/dashboard/settings', icon: Settings },
    ],
  },
]

function SidebarSection({ title, items, collapsed, openSections, toggleSection }) {
  const isOpen = openSections[title] !== false

  return (
    <div className="mb-2">
      <button
        onClick={() => toggleSection(title)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors"
      >
        {!collapsed && <span>{title}</span>}
        {!collapsed && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
      </button>

      {(isOpen || collapsed) && (
        <nav className="space-y-0.5">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin' || item.path === '/dashboard'}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

export default function Sidebar() {
  const { user, logout, switchRole } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSections, setOpenSections] = useState({})

  const isAdmin = user?.role === 'admin'
  const sections = isAdmin ? adminMenuSections : merchantMenuSections

  const toggleSection = (title) => {
    setOpenSections(prev => ({ ...prev, [title]: prev[title] === false ? true : false }))
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center flex-shrink-0">
          <Zap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white">ConnectPay</h1>
          </div>
        )}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="text-gray-500 hover:text-white lg:block hidden">
            <Menu size={18} />
          </button>
        )}
      </div>

      {/* User info */}
      <div className={`px-4 py-3 border-b border-border ${collapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-semibold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <span className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-0.5 ${
                isAdmin ? 'bg-accent/20 text-accent' : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                {isAdmin ? 'Administrador' : 'Lojista'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Menu sections */}
      <div className="flex-1 overflow-y-auto py-3 px-2">
        {sections.map((section) => (
          <SidebarSection
            key={section.title}
            title={section.title}
            items={section.items}
            collapsed={collapsed}
            openSections={openSections}
            toggleSection={toggleSection}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-1">
        {/* Dev: switch role */}
        <button
          onClick={() => switchRole(isAdmin ? 'merchant' : 'admin')}
          className={`sidebar-item w-full text-accent ${collapsed ? 'justify-center px-2' : ''}`}
        >
          <QrCode size={18} />
          {!collapsed && <span className="text-xs">Trocar para {isAdmin ? 'Lojista' : 'Admin'}</span>}
        </button>

        <button
          onClick={handleLogout}
          className={`sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 ${collapsed ? 'justify-center px-2' : ''}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sair</span>}
        </button>

        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="sidebar-item w-full justify-center px-2">
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-secondary border border-border text-white"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobileOpen(false)}>
          <div
            className="w-64 h-full bg-bg-secondary border-r border-border animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col h-screen bg-bg-secondary border-r border-border transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-64'
      } flex-shrink-0 sticky top-0`}>
        {sidebarContent}
      </aside>
    </>
  )
}
