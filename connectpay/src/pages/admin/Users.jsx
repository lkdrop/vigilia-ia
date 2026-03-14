import { useState } from 'react'
import { Search, UserPlus, Shield, User, X } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatDateTime } from '../../utils/formatters'

const ROLE_CONFIG = {
  admin: { label: 'Admin', bg: 'bg-accent/10', text: 'text-accent' },
  support: { label: 'Suporte', bg: 'bg-blue-500/10', text: 'text-blue-500' },
  finance: { label: 'Financeiro', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
}

const mockUsers = [
  { id: 'usr_001', name: 'Admin ConnectPay', email: 'admin@connectpay.com', role: 'admin', active: true, last_login: '2026-03-14T10:00:00Z', created_at: '2025-10-01T10:00:00Z' },
  { id: 'usr_002', name: 'Suporte Maria', email: 'maria@connectpay.com', role: 'support', active: true, last_login: '2026-03-14T08:30:00Z', created_at: '2025-12-15T10:00:00Z' },
  { id: 'usr_003', name: 'Financeiro Pedro', email: 'pedro@connectpay.com', role: 'finance', active: true, last_login: '2026-03-13T17:00:00Z', created_at: '2026-01-10T10:00:00Z' },
  { id: 'usr_004', name: 'Suporte Ana', email: 'ana@connectpay.com', role: 'support', active: false, last_login: '2026-02-20T10:00:00Z', created_at: '2026-02-01T10:00:00Z' },
]

export default function Users() {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = search ? mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) : mockUsers

  return (
    <div>
      <Header title="Usuarios" subtitle="Usuarios da plataforma" />

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuario..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm ml-auto">
            <UserPlus size={16} />Novo usuario
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Usuario</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Papel</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Ultimo login</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          {u.role === 'admin' ? <Shield size={14} className="text-accent" /> : <User size={14} className="text-gray-400" />}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={u.role} config={ROLE_CONFIG} /></td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${u.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                        {u.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(u.last_login)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(u.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setShowModal(false)}>
          <div className="glass-card p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Novo usuario</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Nome</label>
                <input type="text" placeholder="Nome completo" className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
                <input type="email" placeholder="email@connectpay.com" className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Papel</label>
                <select className="input-field">
                  <option value="support">Suporte</option>
                  <option value="finance">Financeiro</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="btn-primary flex-1">Criar</button>
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
