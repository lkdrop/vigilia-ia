import { Search, Download, Zap } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatCurrency, formatDateTime } from '../../utils/formatters'

const ANTICIPATION_STATUS = {
  pending: { label: 'Pendente', bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  approved: { label: 'Aprovada', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  rejected: { label: 'Rejeitada', bg: 'bg-red-500/10', text: 'text-red-500' },
  completed: { label: 'Concluida', bg: 'bg-blue-500/10', text: 'text-blue-500' },
}

const mockAnticipations = [
  { id: 'ant_001', merchant: 'Digital Academy', amount: 10000.00, fee: 350.00, net: 9650.00, status: 'completed', rate: 3.5, created_at: '2026-03-10T10:00:00Z' },
  { id: 'ant_002', merchant: 'Curso Pro', amount: 5000.00, fee: 175.00, net: 4825.00, status: 'pending', rate: 3.5, created_at: '2026-03-14T08:00:00Z' },
  { id: 'ant_003', merchant: 'Digital Academy', amount: 15000.00, fee: 525.00, net: 14475.00, status: 'completed', rate: 3.5, created_at: '2026-03-01T10:00:00Z' },
  { id: 'ant_004', merchant: 'Saude Vital', amount: 3000.00, fee: 105.00, net: 2895.00, status: 'rejected', rate: 3.5, created_at: '2026-03-08T10:00:00Z' },
]

export default function Anticipations() {
  const totalAnticipated = mockAnticipations.filter(a => a.status === 'completed').reduce((a, c) => a + c.amount, 0)
  const totalFees = mockAnticipations.filter(a => a.status === 'completed').reduce((a, c) => a + c.fee, 0)

  return (
    <div>
      <Header title="Antecipacoes" subtitle="Antecipacoes de recebiveis" />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><Zap size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-gray-400">Total antecipado</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalAnticipated)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><Zap size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Receita com taxas</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalFees)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10"><Zap size={20} className="text-yellow-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Taxa de antecipacao</p>
              <p className="text-xl font-bold text-yellow-500">3.5%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Buscar por lojista..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
          </div>
          <button className="btn-secondary flex items-center gap-2 text-sm ml-auto"><Download size={16} />CSV</button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Lojista</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor bruto</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Taxa</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor liquido</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {mockAnticipations.map((a) => (
                  <tr key={a.id} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">#{a.id.split('_')[1]}</td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{a.merchant}</td>
                    <td className="px-5 py-3.5 text-sm text-white">{formatCurrency(a.amount)}</td>
                    <td className="px-5 py-3.5 text-sm text-red-400">-{formatCurrency(a.fee)}</td>
                    <td className="px-5 py-3.5 text-sm text-emerald-400 font-medium">{formatCurrency(a.net)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={a.status} config={ANTICIPATION_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(a.created_at)}</td>
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
