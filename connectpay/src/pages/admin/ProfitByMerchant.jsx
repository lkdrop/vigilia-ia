import { Search, Download, TrendingUp, TrendingDown } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatCurrency } from '../../utils/formatters'

const mockProfit = [
  { merchant: 'Digital Academy', volume: 284520, revenue: 14197.55, stripe_cost: 8535.60, net_profit: 5661.95, margin: 39.9 },
  { merchant: 'Curso Pro', volume: 156340, revenue: 7801.37, stripe_cost: 4690.20, net_profit: 3111.17, margin: 39.9 },
  { merchant: 'Saude Vital', volume: 89450, revenue: 6253.56, stripe_cost: 2683.50, net_profit: 3570.06, margin: 57.1 },
  { merchant: 'Tech Solutions', volume: 45230, revenue: 2256.98, stripe_cost: 1356.90, net_profit: 900.08, margin: 39.9 },
  { merchant: 'Fit Store', volume: 12500, revenue: 623.75, stripe_cost: 375.00, net_profit: 248.75, margin: 39.9 },
]

export default function ProfitByMerchant() {
  const totalProfit = mockProfit.reduce((a, m) => a + m.net_profit, 0)
  const totalRevenue = mockProfit.reduce((a, m) => a + m.revenue, 0)
  const avgMargin = totalProfit / totalRevenue * 100

  return (
    <div>
      <Header title="Lucro por Empresa" subtitle="Lucro liquido por lojista" />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><TrendingUp size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Lucro liquido total</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalProfit)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><TrendingUp size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-gray-400">Receita bruta</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><TrendingUp size={20} className="text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Margem media</p>
              <p className="text-xl font-bold text-blue-500">{avgMargin.toFixed(1)}%</p>
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
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Receita bruta</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Custo Stripe</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Lucro liquido</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Margem</th>
                </tr>
              </thead>
              <tbody>
                {mockProfit.map((m) => (
                  <tr key={m.merchant} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{m.merchant}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatCurrency(m.volume)}</td>
                    <td className="px-5 py-3.5 text-sm text-white">{formatCurrency(m.revenue)}</td>
                    <td className="px-5 py-3.5 text-sm text-red-400">-{formatCurrency(m.stripe_cost)}</td>
                    <td className="px-5 py-3.5 text-sm text-emerald-400 font-medium">{formatCurrency(m.net_profit)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {m.margin >= 40 ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-yellow-500" />}
                        <span className={`text-sm font-medium ${m.margin >= 40 ? 'text-emerald-400' : 'text-yellow-400'}`}>{m.margin}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold text-white mb-2">Como o lucro e calculado</h4>
          <p className="text-sm text-gray-400">
            <span className="text-emerald-400">Lucro</span> = <span className="text-white">Receita da plataforma (taxa do lojista)</span> - <span className="text-red-400">Custo Stripe (2.9% + R$0.30 por transacao)</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Exemplo: Lojista paga 4.99% → Stripe cobra ~3% → Plataforma lucra ~2% por transacao
          </p>
        </div>
      </div>
    </div>
  )
}
