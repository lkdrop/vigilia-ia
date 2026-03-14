import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Calendar, TrendingUp, DollarSign } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatCurrency } from '../../utils/formatters'

const monthlyData = [
  { month: 'Out/25', volume: 245000, revenue: 12250, transactions: 2100 },
  { month: 'Nov/25', volume: 312000, revenue: 15600, transactions: 2650 },
  { month: 'Dez/25', volume: 458000, revenue: 22900, transactions: 3890 },
  { month: 'Jan/26', volume: 389000, revenue: 19450, transactions: 3200 },
  { month: 'Fev/26', volume: 425000, revenue: 21250, transactions: 3540 },
  { month: 'Mar/26', volume: 548230, revenue: 27260, transactions: 4450 },
]

const weeklyData = Array.from({ length: 12 }, (_, i) => ({
  week: `Sem ${i + 1}`,
  volume: Math.floor(Math.random() * 150000) + 80000,
  revenue: Math.floor(Math.random() * 7500) + 4000,
}))

export default function RevenueByPeriod() {
  const [period, setPeriod] = useState('monthly')
  const data = period === 'monthly' ? monthlyData : weeklyData

  const totalVolume = monthlyData.reduce((a, m) => a + m.volume, 0)
  const totalRevenue = monthlyData.reduce((a, m) => a + m.revenue, 0)
  const avgMonthly = totalRevenue / monthlyData.length

  return (
    <div>
      <Header title="Faturamento por Periodo" subtitle="Volume ao longo do tempo" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><TrendingUp size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-gray-400">Volume total (6 meses)</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalVolume)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><DollarSign size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Receita total</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><Calendar size={20} className="text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Media mensal</p>
              <p className="text-xl font-bold text-blue-500">{formatCurrency(avgMonthly)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {[['monthly', 'Mensal'], ['weekly', 'Semanal']].map(([key, label]) => (
            <button key={key} onClick={() => setPeriod(key)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${period === key ? 'bg-accent text-white' : 'bg-bg-secondary text-gray-400 hover:text-white border border-border'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Volume chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Volume processado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey={period === 'monthly' ? 'month' : 'week'} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid #2D2D44', borderRadius: '8px' }} formatter={(v) => [formatCurrency(v), 'Volume']} />
              <Area type="monotone" dataKey="volume" stroke="#8B5CF6" fill="url(#volumeGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue chart */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Receita da plataforma</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey={period === 'monthly' ? 'month' : 'week'} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid #2D2D44', borderRadius: '8px' }} formatter={(v) => [formatCurrency(v), 'Receita']} />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
