import { useState } from 'react'
import { Search, Download, CreditCard, QrCode, FileText, RotateCcw } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { mockTransactions } from '../../data/mockData'
import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { TRANSACTION_STATUS, PAYMENT_METHODS } from '../../utils/constants'

const PaymentMethodIcon = ({ method }) => {
  const icons = { credit_card: CreditCard, pix: QrCode, boleto: FileText }
  const Icon = icons[method] || CreditCard
  return <Icon size={16} className="text-gray-400" />
}

export default function MerchantTransactions() {
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const transactions = statusFilter === 'all'
    ? mockTransactions
    : mockTransactions.filter(t => t.status === statusFilter)

  return (
    <div>
      <Header title="Transacoes" subtitle={`${mockTransactions.length} transacoes`} />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Buscar por nome ou email..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
          </div>
          <div className="flex gap-2">
            {['all', 'approved', 'pending', 'declined', 'refunded', 'chargeback'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s ? 'bg-accent text-white' : 'bg-bg-secondary text-gray-400 hover:text-white border border-border'
                }`}
              >
                {s === 'all' ? 'Todos' : TRANSACTION_STATUS[s]?.label}
              </button>
            ))}
          </div>
          <button className="btn-secondary flex items-center gap-2 text-sm ml-auto">
            <Download size={16} />
            CSV
          </button>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Liquido</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Metodo</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Data</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="table-row" onClick={() => setSelected(txn)}>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white">{txn.customer.name}</p>
                      <p className="text-xs text-gray-500">{txn.customer.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{formatCurrency(txn.amount)}</td>
                    <td className="px-5 py-3.5 text-sm text-emerald-400">{formatCurrency(txn.net)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <PaymentMethodIcon method={txn.payment_method} />
                        <span className="text-sm text-gray-400">{PAYMENT_METHODS[txn.payment_method]?.label}</span>
                        {txn.installments > 1 && <span className="text-xs text-gray-500">{txn.installments}x</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={txn.status} config={TRANSACTION_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(txn.created_at)}</td>
                    <td className="px-5 py-3.5">
                      {txn.status === 'approved' && (
                        <button className="text-gray-400 hover:text-yellow-500 transition-colors" title="Reembolsar">
                          <RotateCcw size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction detail modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setSelected(null)}>
            <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Transacao #{selected.id.split('_')[1]}</h3>
                <StatusBadge status={selected.status} config={TRANSACTION_STATUS} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-gray-400">Cliente</span>
                  <span className="text-sm text-white">{selected.customer.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-gray-400">Email</span>
                  <span className="text-sm text-white">{selected.customer.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-gray-400">Valor bruto</span>
                  <span className="text-sm text-white font-medium">{formatCurrency(selected.amount)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-gray-400">Taxa</span>
                  <span className="text-sm text-red-400">-{formatCurrency(selected.fee)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-gray-400">Valor liquido</span>
                  <span className="text-sm text-emerald-400 font-medium">{formatCurrency(selected.net)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-gray-400">Metodo</span>
                  <span className="text-sm text-white">{PAYMENT_METHODS[selected.payment_method]?.label} {selected.installments > 1 ? `(${selected.installments}x)` : ''}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-400">Data</span>
                  <span className="text-sm text-white">{formatDateTime(selected.created_at)}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                {selected.status === 'approved' && (
                  <button className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
                    <RotateCcw size={14} />
                    Reembolsar
                  </button>
                )}
                <button onClick={() => setSelected(null)} className="btn-ghost flex-1 text-sm">Fechar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
