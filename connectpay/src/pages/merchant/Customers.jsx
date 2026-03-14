import { useState } from 'react'
import { Search, Users, Mail, Phone, ShoppingBag, Eye, X } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatCurrency, formatDateTime } from '../../utils/formatters'

const mockCustomers = [
  { id: 'cust_001', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 98765-4321', document: '***.***.***-01', total_spent: 891.00, purchases: 3, last_purchase: '2026-03-14T10:30:00Z', created_at: '2026-01-15T10:00:00Z' },
  { id: 'cust_002', name: 'Joao Lima', email: 'joao@email.com', phone: '(21) 97654-3210', document: '***.***.***-02', total_spent: 147.00, purchases: 1, last_purchase: '2026-03-14T09:15:00Z', created_at: '2026-03-14T09:15:00Z' },
  { id: 'cust_003', name: 'Ana Costa', email: 'ana@email.com', phone: '(31) 96543-2109', document: '***.***.***-03', total_spent: 1491.00, purchases: 5, last_purchase: '2026-03-13T22:45:00Z', created_at: '2025-11-20T10:00:00Z' },
  { id: 'cust_004', name: 'Carlos Souza', email: 'carlos@email.com', phone: '(41) 95432-1098', document: '***.***.***-04', total_spent: 89.90, purchases: 1, last_purchase: '2026-03-13T18:20:00Z', created_at: '2026-03-13T18:20:00Z' },
  { id: 'cust_005', name: 'Fernanda Oliveira', email: 'fernanda@email.com', phone: '(51) 94321-0987', document: '***.***.***-05', total_spent: 344.00, purchases: 2, last_purchase: '2026-03-14T11:45:00Z', created_at: '2026-02-10T10:00:00Z' },
  { id: 'cust_006', name: 'Rafael Mendes', email: 'rafael@email.com', phone: '(61) 93210-9876', document: '***.***.***-06', total_spent: 597.00, purchases: 1, last_purchase: '2026-03-14T08:30:00Z', created_at: '2026-03-14T08:30:00Z' },
]

export default function Customers() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = search
    ? mockCustomers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
    : mockCustomers

  return (
    <div>
      <Header title="Clientes" subtitle={`${mockCustomers.length} clientes cadastrados`} />

      <div className="p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><Users size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-gray-400">Total de clientes</p>
              <p className="text-xl font-bold text-white">{mockCustomers.length}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><ShoppingBag size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Ticket medio</p>
              <p className="text-xl font-bold text-white">{formatCurrency(mockCustomers.reduce((a, c) => a + c.total_spent, 0) / mockCustomers.length)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><Users size={20} className="text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Novos (este mes)</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 max-w-sm">
          <Search size={16} className="text-gray-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou email..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Contato</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Compras</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Total gasto</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Ultima compra</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white font-medium">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.document}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 text-sm text-gray-400"><Mail size={12} />{c.email}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><Phone size={10} />{c.phone}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white">{c.purchases}</td>
                    <td className="px-5 py-3.5 text-sm text-emerald-400 font-medium">{formatCurrency(c.total_spent)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(c.last_purchase)}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setSelected(c)} className="text-gray-400 hover:text-white transition-colors"><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setSelected(null)}>
            <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-3">
                {[
                  ['Email', selected.email],
                  ['Telefone', selected.phone],
                  ['CPF', selected.document],
                  ['Total gasto', formatCurrency(selected.total_spent)],
                  ['Compras', selected.purchases],
                  ['Ultima compra', formatDateTime(selected.last_purchase)],
                  ['Cliente desde', formatDateTime(selected.created_at)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="text-sm text-white">{value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost w-full text-sm mt-4">Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
