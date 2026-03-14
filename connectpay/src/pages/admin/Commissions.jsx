import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, DollarSign, Percent, TrendingUp } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatCurrency } from '../../utils/formatters'

const monthlyCommissions = [
  { month: 'Out/25', card: 9800, pix: 1200, boleto: 350 },
  { month: 'Nov/25', card: 12500, pix: 1800, boleto: 420 },
  { month: 'Dez/25', card: 18200, pix: 2800, boleto: 580 },
  { month: 'Jan/26', card: 15400, pix: 2200, boleto: 490 },
  { month: 'Fev/26', card: 16800, pix: 2600, boleto: 520 },
  { month: 'Mar/26', card: 21500, pix: 3400, boleto: 660 },
]

export default function Commissions() {
  const currentMonth = monthlyCommissions[monthlyCommissions.length - 1]
  const totalCurrent = currentMonth.card + currentMonth.pix + currentMonth.boleto
  const totalAll = monthlyCommissions.reduce((a, m) => a + m.card + m.pix + m.boleto, 0)

  return (
    <div>
      <Header title="Comissoes por Periodo" subtitle="Receita da plataforma por metodo" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10"><DollarSign size={20} className="text-emerald-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Este mes</p>
              <p className="text-xl font-bold text-emerald-500">{formatCurrency(totalCurrent)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><TrendingUp size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-gray-400">Total (6 meses)</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalAll)}</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10"><Percent size={20} className="text-blue-500" /></div>
            <div>
              <p className="text-xs text-gray-400">Taxa media</p>
              <p className="text-xl font-bold text-blue-500">4.99%</p>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Por metodo (mes)</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Cartao</span>
                <span className="text-xs text-white font-medium">{formatCurrency(currentMonth.card)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">PIX</span>
                <span className="text-xs text-white font-medium">{formatCurrency(currentMonth.pix)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Boleto</span>
                <span className="text-xs text-white font-medium">{formatCurrency(currentMonth.boleto)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-secondary flex items-center gap-2 text-sm"><Download size={16} />Exportar</button>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Comissoes por metodo de pagamento</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyCommissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid #2D2D44', borderRadius: '8px' }} formatter={(v) => [formatCurrency(v)]} />
              <Bar dataKey="card" name="Cartao" fill="#8B5CF6" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="pix" name="PIX" fill="#10b981" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="boleto" name="Boleto" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-accent" /><span className="text-xs text-gray-400">Cartao</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-emerald-500" /><span className="text-xs text-gray-400">PIX</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-blue-500" /><span className="text-xs text-gray-400">Boleto</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
