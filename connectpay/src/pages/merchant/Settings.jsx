import { useState } from 'react'
import { Save, Building2, User, CreditCard, Bell, Globe, Shield } from 'lucide-react'
import Header from '../../components/layout/Header'

const tabs = [
  { id: 'business', label: 'Empresa', icon: Building2 },
  { id: 'personal', label: 'Dados pessoais', icon: User },
  { id: 'banking', label: 'Dados bancarios', icon: CreditCard },
  { id: 'notifications', label: 'Notificacoes', icon: Bell },
  { id: 'checkout', label: 'Checkout', icon: Globe },
  { id: 'security', label: 'Seguranca', icon: Shield },
]

function BusinessTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Nome da empresa</label>
          <input type="text" defaultValue="Digital Academy" className="input-field" />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">CNPJ</label>
          <input type="text" defaultValue="12.345.678/0001-90" className="input-field" readOnly />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Email de suporte</label>
          <input type="email" defaultValue="suporte@digitalacademy.com" className="input-field" />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Telefone</label>
          <input type="text" defaultValue="(11) 98765-4321" className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-400 mb-1.5 block">Descricao na fatura do cartao</label>
          <input type="text" defaultValue="DIGITAL ACADEMY" maxLength={22} className="input-field" />
          <p className="text-xs text-gray-500 mt-1">Aparece na fatura do cliente. Max 22 caracteres.</p>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-400 mb-1.5 block">Website</label>
          <input type="url" defaultValue="https://digitalacademy.com" className="input-field" />
        </div>
      </div>
    </div>
  )
}

function PersonalTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Nome completo</label>
          <input type="text" defaultValue="Joao Digital" className="input-field" />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">CPF</label>
          <input type="text" defaultValue="***.***.***-01" className="input-field" readOnly />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
          <input type="email" defaultValue="joao@digitalacademy.com" className="input-field" />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Telefone</label>
          <input type="text" defaultValue="(11) 98765-4321" className="input-field" />
        </div>
      </div>
    </div>
  )
}

function BankingTab() {
  return (
    <div className="space-y-4">
      <div className="glass-card p-4 border-yellow-500/20">
        <p className="text-sm text-yellow-400">Os dados bancarios sao gerenciados pelo Stripe Connect. Para alterar, entre em contato com o suporte.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Banco</label>
          <input type="text" defaultValue="Nubank" className="input-field" readOnly />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Tipo de conta</label>
          <input type="text" defaultValue="Corrente" className="input-field" readOnly />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Agencia</label>
          <input type="text" defaultValue="0001" className="input-field" readOnly />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Conta</label>
          <input type="text" defaultValue="****5678-9" className="input-field" readOnly />
        </div>
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [notifs, setNotifs] = useState({
    email_payments: true, email_disputes: true, email_payouts: true, email_marketing: false,
    push_payments: false, push_disputes: true, push_payouts: true,
  })
  const toggle = (key) => setNotifs(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Email</h4>
        <div className="space-y-3">
          {[
            ['email_payments', 'Pagamentos recebidos'],
            ['email_disputes', 'Disputas e chargebacks'],
            ['email_payouts', 'Saques concluidos'],
            ['email_marketing', 'Novidades e dicas'],
          ].map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-300">{label}</span>
              <button onClick={() => toggle(key)} className={`w-10 h-5 rounded-full transition-colors relative ${notifs[key] ? 'bg-accent' : 'bg-gray-600'}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifs[key] ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckoutTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Cor principal do checkout</label>
          <div className="flex items-center gap-2">
            <input type="color" defaultValue="#8B5CF6" className="w-10 h-10 rounded-lg border border-border bg-transparent cursor-pointer" />
            <input type="text" defaultValue="#8B5CF6" className="input-field flex-1" />
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Logo</label>
          <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-accent/50 transition-colors cursor-pointer">
            <p className="text-sm text-gray-500">Arraste ou clique para enviar</p>
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Parcelas maximas</label>
          <select defaultValue="12" className="input-field">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{n}x</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Metodos aceitos</label>
          <div className="flex gap-2">
            {['Cartao', 'PIX', 'Boleto'].map(m => (
              <label key={m} className="flex items-center gap-1.5 text-sm text-gray-300">
                <input type="checkbox" defaultChecked className="accent-accent" />{m}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Alterar senha</h4>
        <div className="space-y-3 max-w-sm">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Senha atual</label>
            <input type="password" className="input-field" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Nova senha</label>
            <input type="password" className="input-field" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Confirmar nova senha</label>
            <input type="password" className="input-field" />
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-border/50">
        <h4 className="text-sm font-semibold text-white mb-3">Autenticacao em dois fatores</h4>
        <div className="glass-card p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-white">2FA nao ativado</p>
            <p className="text-xs text-gray-500">Proteja sua conta com autenticacao em dois fatores</p>
          </div>
          <button className="btn-secondary text-sm">Ativar 2FA</button>
        </div>
      </div>
    </div>
  )
}

const TAB_COMPONENTS = {
  business: BusinessTab,
  personal: PersonalTab,
  banking: BankingTab,
  notifications: NotificationsTab,
  checkout: CheckoutTab,
  security: SecurityTab,
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('business')
  const TabContent = TAB_COMPONENTS[activeTab]

  return (
    <div>
      <Header title="Configuracoes" subtitle="Gerencie sua conta" />

      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'bg-accent text-white' : 'text-gray-400 hover:text-white hover:bg-bg-secondary'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="glass-card p-6">
          <TabContent />
          <div className="flex justify-end mt-6 pt-4 border-t border-border/50">
            <button className="btn-primary flex items-center gap-2 text-sm">
              <Save size={16} />
              Salvar alteracoes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
