import { DollarSign, Users, ArrowLeftRight, TrendingUp, CreditCard, QrCode, FileText } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import Header from '../../components/layout/Header'
import MetricCard from '../../components/ui/MetricCard'
import StatusBadge from '../../components/ui/StatusBadge'
import { mockAdminStats, mockChartData, mockTransactions } from '../../data/mockData'
import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { TRANSACTION_STATUS, PAYMENT_METHODS } from '../../utils/constants'

const PaymentMethodIcon = ({ method }) => {
  const icons = { credit_card: CreditCard, pix: QrCode, boleto: FileText }
  const Icon = icons[method] || CreditCard
  return <Icon size={16} className="text-gray-400" />
}

export default function AdminDashboard() {
  const stats = mockAdminStats
  const chartData = mockChartData.slice(-14)
  const transactions = mockTransactions.slice(0, 6)

  return (
    <div>
      <Header title="Dashboard" subtitle="Visao geral da plataforma" />

      <div className="p-6 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Volume total (mes)"
            value={formatCurrency(stats.totalVolume)}
            change={stats.volumeChange}
            icon={DollarSign}
          />
          <MetricCard
            title="Receita plataforma"
            value={formatCurrency(stats.platformRevenue)}
            change={stats.revenueChange}
            icon={TrendingUp}
          />
          <MetricCard
            title="Lojistas ativos"
            value={stats.activeMerchants.toString()}
            change={stats.merchantsChange}
            icon={Users}
          />
          <MetricCard
            title="Transacoes"
            value={stats.totalTransactions.toLocaleString('pt-BR')}
            change={stats.transactionsChange}
            icon={ArrowLeftRight}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Volume Chart */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Volume processado (14 dias)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#6B6B80', fontSize: 11 }}
                  tickFormatter={v => v.slice(5)}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B6B80', fontSize: 11 }}
                  tickFormatter={v => `${(v / 1000).toFixed(0)}K`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ background: '#1E1E32', border: '1px solid #2A2A3E', borderRadius: 8, color: '#fff' }}
                  formatter={(v) => [formatCurrency(v), 'Volume']}
                  labelFormatter={(l) => l}
                />
                <Area type="monotone" dataKey="volume" stroke="#8B5CF6" fill="url(#volumeGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Transactions Chart */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Transacoes por dia</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#6B6B80', fontSize: 11 }}
                  tickFormatter={v => v.slice(5)}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fill: '#6B6B80', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1E1E32', border: '1px solid #2A2A3E', borderRadius: 8, color: '#fff' }}
                  formatter={(v) => [v, 'Transacoes']}
                />
                <Bar dataKey="transactions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-gray-400">Taxa de aprovacao</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">{stats.approvalRate}%</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-gray-400">Taxa de chargeback</p>
            <p className={`text-2xl font-bold mt-1 ${stats.chargebackRate > 1 ? 'text-red-500' : 'text-emerald-500'}`}>
              {stats.chargebackRate}%
            </p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-gray-400">Volume hoje</p>
            <p className="text-2xl font-bold text-white mt-1">{formatCurrency(stats.today.volume)}</p>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold text-white">Transacoes recentes</h3>
            <button className="text-xs text-accent hover:text-accent-light transition-colors">Ver todas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
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
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">
                      #{txn.id.split('_')[1]}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white">{txn.customer.name}</p>
                      <p className="text-xs text-gray-500">{txn.customer.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">
                      {formatCurrency(txn.amount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <PaymentMethodIcon method={txn.payment_method} />
                        <span className="text-sm text-gray-400">
                          {PAYMENT_METHODS[txn.payment_method]?.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={txn.status} config={TRANSACTION_STATUS} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">
                      {formatDateTime(txn.created_at)}
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
