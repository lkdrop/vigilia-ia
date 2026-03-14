import { AlertTriangle, ExternalLink } from 'lucide-react'
import Header from '../../components/layout/Header'
import StatusBadge from '../../components/ui/StatusBadge'
import { mockDisputes } from '../../data/mockData'
import { formatCurrency, formatDateTime } from '../../utils/formatters'
import { DISPUTE_STATUS } from '../../utils/constants'

export default function Disputes() {
  const chargebackRate = 0.4

  return (
    <div>
      <Header title="Disputas" subtitle="Chargebacks e disputas abertas" />

      <div className="p-6 space-y-6">
        {/* Rate card */}
        <div className={`glass-card p-5 flex items-center gap-4 ${chargebackRate > 1 ? 'border-red-500/30' : ''}`}>
          <div className={`p-3 rounded-xl ${chargebackRate > 1 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
            <AlertTriangle size={24} className={chargebackRate > 1 ? 'text-red-500' : 'text-emerald-500'} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Taxa de chargeback</p>
            <p className={`text-2xl font-bold ${chargebackRate > 1 ? 'text-red-500' : 'text-emerald-500'}`}>
              {chargebackRate}%
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-gray-500">Limite seguro: &lt; 0.5%</p>
            <p className="text-xs text-gray-500">Limite critico: &gt; 1.0%</p>
          </div>
        </div>

        {/* Disputes table */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold text-white">Disputas ({mockDisputes.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Transacao</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Motivo</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Data</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {mockDisputes.map((d) => (
                  <tr key={d.id} className="table-row">
                    <td className="px-5 py-3.5 text-sm text-gray-400 font-mono">#{d.id.split('_')[1]}</td>
                    <td className="px-5 py-3.5 text-sm text-accent font-mono">#{d.transaction_id.split('_')[1]}</td>
                    <td className="px-5 py-3.5 text-sm text-white">{d.reason}</td>
                    <td className="px-5 py-3.5 text-sm text-red-400 font-medium">{formatCurrency(d.amount)}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={d.status} config={DISPUTE_STATUS} /></td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{formatDateTime(d.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info */}
        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold text-white mb-3">Como reduzir chargebacks</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">1.</span>
              Use descritores claros na fatura do cartao para que o cliente reconheca a compra
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">2.</span>
              Ofereça reembolsos proativos quando solicitado — melhor reembolsar do que receber chargeback
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">3.</span>
              Ative Verifi RDR e Ethoca Alerts no painel da Stripe para resolver disputas automaticamente
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">4.</span>
              Mantenha comunicacao clara sobre prazos de entrega e politica de reembolso
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
