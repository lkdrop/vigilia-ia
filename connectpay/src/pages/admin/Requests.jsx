import { useState } from 'react'
import { CheckCircle, XCircle, Eye, Clock, Building2, X } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatDateTime } from '../../utils/formatters'

const REQUEST_STATUS = {
  pending: { label: 'Pendente', bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  approved: { label: 'Aprovado', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  rejected: { label: 'Rejeitado', bg: 'bg-red-500/10', text: 'text-red-500' },
}

const mockRequests = [
  { id: 'req_001', company_name: 'Fit Store', owner: 'Carlos Silva', email: 'carlos@fitstore.com', document: '33.456.789/0001-22', phone: '(11) 91234-5678', website: 'https://fitstore.com', category: 'E-commerce', status: 'pending', created_at: '2026-03-10T10:00:00Z', notes: '' },
  { id: 'req_002', company_name: 'Beauty Shop', owner: 'Amanda Reis', email: 'amanda@beautyshop.com', document: '44.567.890/0001-33', phone: '(21) 92345-6789', website: 'https://beautyshop.com.br', category: 'Cosmeticos', status: 'pending', created_at: '2026-03-12T14:00:00Z', notes: '' },
  { id: 'req_003', company_name: 'Code Academy', owner: 'Lucas Tech', email: 'lucas@codeacademy.io', document: '55.678.901/0001-44', phone: '(31) 93456-7890', website: 'https://codeacademy.io', category: 'Educacao', status: 'pending', created_at: '2026-03-13T09:00:00Z', notes: '' },
  { id: 'req_004', company_name: 'Travel Plus', owner: 'Mariana Vieira', email: 'mariana@travelplus.com', document: '66.789.012/0001-55', phone: '(41) 94567-8901', website: 'https://travelplus.com.br', category: 'Turismo', status: 'approved', created_at: '2026-03-05T10:00:00Z', notes: 'Documentacao OK' },
  { id: 'req_005', company_name: 'Crypto Trade BR', owner: 'Diego Moura', email: 'diego@cryptotrade.br', document: '77.890.123/0001-66', phone: '(51) 95678-9012', website: 'https://cryptotrade.br', category: 'Criptomoedas', status: 'rejected', created_at: '2026-03-01T10:00:00Z', notes: 'Categoria nao permitida' },
]

export default function Requests() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('pending')

  const filtered = filter === 'all' ? mockRequests : mockRequests.filter(r => r.status === filter)
  const pendingCount = mockRequests.filter(r => r.status === 'pending').length

  return (
    <div>
      <Header title="Solicitacoes Gateway" subtitle={`${pendingCount} solicitacoes pendentes`} />

      <div className="p-6 space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {[['pending', 'Pendentes'], ['approved', 'Aprovadas'], ['rejected', 'Rejeitadas'], ['all', 'Todas']].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filter === key ? 'bg-accent text-white' : 'bg-bg-secondary text-gray-400 hover:text-white border border-border'}`}>
              {label}
              {key === 'pending' && pendingCount > 0 && <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full px-1.5">{pendingCount}</span>}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Empresa</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Responsavel</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Categoria</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Data</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((req) => (
                  <tr key={req.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/10"><Building2 size={16} className="text-accent" /></div>
                        <div>
                          <p className="text-sm text-white font-medium">{req.company_name}</p>
                          <p className="text-xs text-gray-500">{req.document}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white">{req.owner}</p>
                      <p className="text-xs text-gray-500">{req.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{req.category}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={req.status} config={REQUEST_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(req.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelected(req)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-bg-tertiary transition-colors"><Eye size={16} /></button>
                        {req.status === 'pending' && (
                          <>
                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"><CheckCircle size={16} /></button>
                            <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"><XCircle size={16} /></button>
                          </>
                        )}
                      </div>
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
                <h3 className="text-lg font-bold text-white">{selected.company_name}</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-3">
                {[
                  ['Responsavel', selected.owner],
                  ['Email', selected.email],
                  ['Telefone', selected.phone],
                  ['CNPJ', selected.document],
                  ['Website', selected.website],
                  ['Categoria', selected.category],
                  ['Data', formatDateTime(selected.created_at)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="text-sm text-white">{value}</span>
                  </div>
                ))}
                {selected.notes && (
                  <div className="py-2">
                    <span className="text-sm text-gray-400">Notas</span>
                    <p className="text-sm text-white mt-1">{selected.notes}</p>
                  </div>
                )}
              </div>
              {selected.status === 'pending' && (
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setSelected(null)} className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm">
                    <CheckCircle size={14} />Aprovar
                  </button>
                  <button onClick={() => setSelected(null)} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm text-red-400 border-red-500/30 hover:bg-red-500/10">
                    <XCircle size={14} />Rejeitar
                  </button>
                </div>
              )}
              <button onClick={() => setSelected(null)} className="btn-ghost w-full text-sm mt-3">Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
