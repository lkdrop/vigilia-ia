import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function MetricCard({ title, value, change, icon: Icon, format = 'text' }) {
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-accent/10">
          {Icon && <Icon size={20} className="text-accent" />}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? 'text-emerald-500' : isNegative ? 'text-red-500' : 'text-yellow-500'
          }`}>
            {isPositive ? <TrendingUp size={14} /> : isNegative ? <TrendingDown size={14} /> : <Minus size={14} />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white animate-count-up">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
    </div>
  )
}
