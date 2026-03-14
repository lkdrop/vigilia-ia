import { Search, Download, TrendingUp } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatCurrency } from '../../utils/formatters'

const mockRevenue = [
  { merchant: 'Digital Academy', volume: 284520.00, transactions: 2341, fee_rate: 4.99, platform_revenue: 14197.55, avg_ticket: 121.54 },
  { merchant: 'Curso Pro', volume: 156340.00, transactions: 1204, fee_rate: 4.99, platform_revenue: 7801.37, avg_ticket: 129.85 },
  { merchant: 'Saude Vital', volume: 89450.00, transactions: 678, fee_rate: 6.99, platform_revenue: 6253.56, avg_ticket: 131.93 },
  { merchant: 'Tech Solutions', volume: 45230.00, transactions: 345, fee_rate: 4.99, platform_revenue: 2256.98, avg_ticket: 131.10 },
  { merchant: 'Fit Store', volume: 12500.00, transactions: 89, fee_rate: 4.99, platform_revenue: 623.75, avg_ticket: 140.45 },
]

export default function RevenueByMerchant() {
  const totalVolume = mockRevenue.reduce((a, m) => a + m.volume, 0)
  const totalRevenue = mockRevenue.reduce((a, m) => a + m.platform_revenue, 0)

  return (
    <div>
      <Header title="Faturamento por Empresa" subtitle="Volume processado por lojista" />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><TrendingUp size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-gray-400">Volume total</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalVolume)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><TrendingUp size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Receita da plataforma</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Buscar lojista..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
          </div>
          <button className="btn-secondary flex items-center gap-2 text-sm ml-auto"><Download size={16} />CSV</button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Lojista</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Volume</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Transacoes</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Taxa</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Receita plataforma</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Ticket medio</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">% do total</th>
                </tr>
              </thead>
              <tbody>
                {mockRevenue.map((m) => (
                  <tr key={m.merchant} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{m.merchant}</td>
                    <td className="px-5 py-3.5 text-sm text-white">{formatCurrency(m.volume)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{m.transactions.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-sm text-accent">{m.fee_rate}%</td>
                    <td className="px-5 py-3.5 text-sm text-emerald-400 font-medium">{formatCurrency(m.platform_revenue)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatCurrency(m.avg_ticket)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${(m.volume / totalVolume * 100)}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{(m.volume / totalVolume * 100).toFixed(1)}%</span>
                      </div>
                    </td>
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
