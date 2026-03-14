import { useState } from 'react'
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, DollarSign, Shield } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { PAYOUT_STATUS } from '../../utils/constants'

const mockBalance = {
  available: 15230.00,
  pending: 4580.00,
  reserved: 2100.00,
}

const mockPayouts = [
  { id: 'pay_001', amount: 5000.00, fee: 0, net: 5000.00, status: 'completed', created_at: '2026-03-12T10:00:00Z', completed_at: '2026-03-12T14:00:00Z' },
  { id: 'pay_002', amount: 3200.00, fee: 0, net: 3200.00, status: 'processing', created_at: '2026-03-14T08:00:00Z', completed_at: null },
  { id: 'pay_003', amount: 8000.00, fee: 0, net: 8000.00, status: 'completed', created_at: '2026-03-05T10:00:00Z', completed_at: '2026-03-05T16:00:00Z' },
  { id: 'pay_004', amount: 1500.00, fee: 0, net: 1500.00, status: 'failed', created_at: '2026-02-28T10:00:00Z', completed_at: null },
]

export default function Balance() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')

  return (
    <div>
      <Header title="Saldo e Saques" subtitle="Gerencie seus recursos financeiros" />

      <div className="p-6 space-y-6">
        {/* Balance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="gradient-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Wallet size={20} className="text-emerald-500" />
              </div>
              <span className="text-sm text-gray-400">Disponivel</span>
            </div>
            <p className="text-3xl font-bold text-emerald-500">{formatCurrency(mockBalance.available)}</p>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="btn-primary mt-4 w-full flex items-center justify-center gap-2 text-sm"
            >
              <ArrowUpRight size={16} />
              Solicitar saque
            </button>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock size={20} className="text-yellow-500" />
              </div>
              <span className="text-sm text-gray-400">Pendente</span>
            </div>
            <p className="text-3xl font-bold text-yellow-500">{formatCurrency(mockBalance.pending)}</p>
            <p className="text-xs text-gray-500 mt-3">Aguardando confirmacao</p>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gray-500/10">
                <Shield size={20} className="text-gray-400" />
              </div>
              <span className="text-sm text-gray-400">Reserva (90 dias)</span>
            </div>
            <p className="text-3xl font-bold text-gray-400">{formatCurrency(mockBalance.reserved)}</p>
            <p className="text-xs text-gray-500 mt-3">Liberado automaticamente</p>
          </div>
        </div>

        {/* Payout history */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold text-white">Historico de saques</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Solicitado em</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Concluido em</th>
                </tr>
              </thead>
              <tbody>
                {mockPayouts.map((p) => (
                  <tr key={p.id} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">#{p.id.split('_')[1]}</td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{formatCurrency(p.amount)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={p.status} config={PAYOUT_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(p.created_at)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{p.completed_at ? formatDateTime(p.completed_at) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdraw modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setShowWithdrawModal(false)}>
            <div className="glass-card p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-white mb-4">Solicitar saque</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Valor do saque</label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                      placeholder="0,00"
                      className="input-field pl-10"
                      max={mockBalance.available}
                      step="0.01"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Disponivel: {formatCurrency(mockBalance.available)}
                  </p>
                </div>
                <button
                  onClick={() => { setShowWithdrawModal(false); setWithdrawAmount('') }}
                  className="btn-primary w-full"
                >
                  Confirmar saque
                </button>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="btn-ghost w-full text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
