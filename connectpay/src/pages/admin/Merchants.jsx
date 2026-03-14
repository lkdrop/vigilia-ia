import { useState } from 'react'
import { Search, Filter, Building2 } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { mockMerchants } from '../../data/mockData'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { MERCHANT_STATUS } from '../../utils/constants'

export default function Merchants() {
  const [filter, setFilter] = useState('all')
  const merchants = filter === 'all'
    ? mockMerchants
    : mockMerchants.filter(m => m.status === filter)

  return (
    <div>
      <Header title="Todas as empresas" subtitle={`${mockMerchants.length} empresas cadastradas`} />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar empresa..."
              className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'pending', 'suspended', 'blocked'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filter === s
                    ? 'bg-accent text-white'
                    : 'bg-bg-secondary text-gray-400 hover:text-white border border-border'
                }`}
              >
                {s === 'all' ? 'Todos' : MERCHANT_STATUS[s]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Empresa</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Documento</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Volume</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Transacoes</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Chargeback</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Taxa</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((m) => (
                  <tr key={m.id} className="table-row">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Building2 size={16} className="text-accent" />
                        </div>
                        <span className="text-sm text-white font-medium">{m.company_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">{m.document}</td>
                    <td className="px-5 py-3.5 text-sm text-white font-medium">{formatCurrency(m.volume)}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{m.transactions.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-medium ${m.chargeback_rate > 1 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {m.chargeback_rate}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{m.fee_percentage}%</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={m.status} config={MERCHANT_STATUS} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDate(m.created_at)}</td>
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
