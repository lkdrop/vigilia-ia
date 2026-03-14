import { Search, Download, ArrowUpRight } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { PAYOUT_STATUS } from '../../utils/constants'

const mockTransfers = [
  { id: 'tr_001', merchant: 'Digital Academy', amount: 5000.00, fee: 0, net: 5000.00, status: 'completed', created_at: '2026-03-12T10:00:00Z', completed_at: '2026-03-12T14:00:00Z' },
  { id: 'tr_002', merchant: 'Curso Pro', amount: 3200.00, fee: 0, net: 3200.00, status: 'processing', created_at: '2026-03-14T08:00:00Z', completed_at: null },
  { id: 'tr_003', merchant: 'Digital Academy', amount: 8000.00, fee: 0, net: 8000.00, status: 'completed', created_at: '2026-03-05T10:00:00Z', completed_at: '2026-03-05T16:00:00Z' },
  { id: 'tr_004', merchant: 'Saude Vital', amount: 2500.00, fee: 0, net: 2500.00, status: 'completed', created_at: '2026-03-08T10:00:00Z', completed_at: '2026-03-08T15:00:00Z' },
  { id: 'tr_005', merchant: 'Curso Pro', amount: 1500.00, fee: 0, net: 1500.00, status: 'failed', created_at: '2026-02-28T10:00:00Z', completed_at: null },
  { id: 'tr_006', merchant: 'Fit Store', amount: 4200.00, fee: 0, net: 4200.00, status: 'pending', created_at: '2026-03-14T12:00:00Z', completed_at: null },
]

export default function Transfers() {
  const totalTransferred = mockTransfers.filter(t => t.status === 'completed').reduce((a, t) => a + t.amount, 0)

  return (
    <div>
      <Header title="Todas as Transferencias" subtitle="Repasses para lojistas" />

      <div className="p-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><ArrowUpRight size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Total transferido</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalTransferred)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><ArrowUpRight size={20} className="text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Em processamento</p>
              <p className="text-xl font-bold text-blue-500">{formatCurrency(mockTransfers.filter(t => t.status === 'processing').reduce((a, t) => a + t.amount, 0))}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10"><ArrowUpRight size={20} className="text-yellow-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Pendente</p>
              <p className="text-xl font-bold text-yellow-500">{formatCurrency(mockTransfers.filter(t => t.status === 'pending').reduce((a, t) => a + t.amount, 0))}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Buscar por lojista..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
          </div>
          <button className="btn-secondary flex items-center gap-2 text-sm ml-auto"><Download size={16} />CSV</button>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Lojista</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Solicitado</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Concluido</th>
                </tr>
              </thead>
              <tbody>
                {mockTransfers.map((t) => (
                  <tr key={t.id} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">#{t.id.split('_')[1]}</td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{t.merchant}</td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{formatCurrency(t.amount)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={t.status} config={PAYOUT_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(t.created_at)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{t.completed_at ? formatDateTime(t.completed_at) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
