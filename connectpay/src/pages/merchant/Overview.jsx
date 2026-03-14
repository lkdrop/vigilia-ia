import { DollarSign, ArrowLeftRight, TrendingUp, Wallet, CreditCard, QrCode, FileText } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Header from '../../components/layout/Header'
import MetricCard from '../../components/ui/MetricCard'
import StatusBadge from '../../components/ui/StatusBadge'
import { mockMerchantStats, mockChartData, mockTransactions } from '../../data/mockData'
import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { TRANSACTION_STATUS, PAYMENT_METHODS } from '../../utils/constants'

const PaymentMethodIcon = ({ method }) => {
  const icons = { credit_card: CreditCard, pix: QrCode, boleto: FileText }
  const Icon = icons[method] || CreditCard
  return <Icon size={16} className="text-gray-400" />
}

export default function MerchantOverview() {
  const stats = mockMerchantStats
  const chartData = mockChartData.slice(-7)
  const transactions = mockTransactions.slice(0, 5)

  return (
    <div>
      <Header title="Overview" subtitle="Resumo da sua conta" />

      <div className="p-6 space-y-6">
        {/* Balance card */}
        <div className="gradient-border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Saldo disponivel</p>
              <p className="text-3xl font-bold text-emerald-500">{formatCurrency(stats.balance.available)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Pendente</p>
              <p className="text-2xl font-bold text-yellow-500">{formatCurrency(stats.balance.pending)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Em reserva</p>
              <p className="text-2xl font-bold text-gray-400">{formatCurrency(stats.balance.reserved)}</p>
            </div>
          </div>
          <button className="btn-primary mt-4">Solicitar saque</button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Faturamento (mes)"
            value={formatCurrency(stats.revenue)}
            change={stats.revenueChange}
            icon={DollarSign}
          />
          <MetricCard
            title="Transacoes"
            value={stats.transactions.toString()}
            change={stats.transactionsChange}
            icon={ArrowLeftRight}
          />
          <MetricCard
            title="Taxa de aprovacao"
            value={`${stats.approvalRate}%`}
            icon={TrendingUp}
          />
          <MetricCard
            title="Ticket medio"
            value={formatCurrency(stats.avgTicket)}
            icon={Wallet}
          />
        </div>

        {/* Chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Faturamento (7 dias)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06D6A0" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06D6A0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
              <XAxis dataKey="date" tick={{ fill: '#6B6B80', fontSize: 11 }} tickFormatter={v => v.slice(5)} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B6B80', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1E1E32', border: '1px solid #2A2A3E', borderRadius: 8, color: '#fff' }}
                formatter={(v) => [formatCurrency(v), 'Faturamento']}
              />
              <Area type="monotone" dataKey="volume" stroke="#06D6A0" fill="url(#revenueGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent transactions */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold text-white">Ultimas transacoes</h3>
            <button className="text-xs text-accent hover:text-accent-light transition-colors">Ver todas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Metodo</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white">{txn.customer.name}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{formatCurrency(txn.amount)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <PaymentMethodIcon method={txn.payment_method} />
                        <span className="text-sm text-gray-400">{PAYMENT_METHODS[txn.payment_method]?.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={txn.status} config={TRANSACTION_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(txn.created_at)}</td>
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
