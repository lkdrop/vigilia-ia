import { useState } from 'react'
import { Search, Download, CreditCard, QrCode, FileText } from 'lucide-react'
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

export default function AdminTransactions() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')

  const transactions = mockTransactions.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (methodFilter !== 'all' && t.payment_method !== methodFilter) return false
    return true
  })

  return (
    <div>
      <Header title="Todas as transacoes" subtitle={`${mockTransactions.length} transacoes no total`} />

      <div className="p-6 space-y-4">
        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Buscar por nome, email ou ID..." className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full" />
          </div>

          <select
            value={methodFilter}
            onChange={e => setMethodFilter(e.target.value)}
            className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none"
          >
            <option value="all">Todos metodos</option>
            <option value="credit_card">Cartao</option>
            <option value="pix">PIX</option>
            <option value="boleto">Boleto</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none"
          >
            <option value="all">Todos status</option>
            <option value="approved">Aprovado</option>
            <option value="pending">Pendente</option>
            <option value="declined">Recusado</option>
            <option value="refunded">Reembolsado</option>
            <option value="chargeback">Chargeback</option>
          </select>

          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={16} />
            Exportar CSV
          </button>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Taxa</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Liquido</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Metodo</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Parcelas</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">#{txn.id.split('_')[1]}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-white">{txn.customer.name}</p>
                      <p className="text-xs text-gray-500">{txn.customer.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{formatCurrency(txn.amount)}</td>
                    <td className="px-5 py-3.5 text-sm text-red-400">{formatCurrency(txn.fee)}</td>
                    <td className="px-5 py-3.5 text-sm text-emerald-400">{formatCurrency(txn.net)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <PaymentMethodIcon method={txn.payment_method} />
                        <span className="text-sm text-gray-400">{PAYMENT_METHODS[txn.payment_method]?.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{txn.installments}x</td>
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
