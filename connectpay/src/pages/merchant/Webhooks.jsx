import { useState } from 'react'
import { Plus, Webhook, CheckCircle, XCircle, Clock, RefreshCw, Trash2, X, Eye } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatDateTime } from '../../utils/formatters'

const mockWebhooks = [
  {
    id: 'wh_001', url: 'https://meusite.com/api/webhooks/connectpay', secret: 'whsec_abc123...', active: true,
    events: ['payment.approved', 'payment.declined', 'payment.refunded', 'chargeback.created'],
    created_at: '2026-01-15T10:00:00Z',
    logs: [
      { id: 'log_001', event: 'payment.approved', status: 'success', status_code: 200, created_at: '2026-03-14T10:30:05Z', response_time: 245 },
      { id: 'log_002', event: 'payment.approved', status: 'success', status_code: 200, created_at: '2026-03-14T09:15:03Z', response_time: 189 },
      { id: 'log_003', event: 'payment.declined', status: 'failed', status_code: 500, created_at: '2026-03-13T22:45:08Z', response_time: 5023 },
      { id: 'log_004', event: 'payment.approved', status: 'success', status_code: 200, created_at: '2026-03-14T11:45:02Z', response_time: 312 },
    ],
  },
  {
    id: 'wh_002', url: 'https://meusite.com/api/notifications', secret: 'whsec_def456...', active: false,
    events: ['payment.approved'],
    created_at: '2026-02-20T10:00:00Z',
    logs: [],
  },
]

const ALL_EVENTS = [
  'payment.approved', 'payment.declined', 'payment.refunded', 'payment.pending',
  'chargeback.created', 'chargeback.resolved', 'payout.completed', 'payout.failed',
]

function CreateWebhookModal({ onClose }) {
  const [form, setForm] = useState({ url: '', events: [] })
  const toggleEvent = (event) => {
    setForm(p => ({
      ...p,
      events: p.events.includes(event) ? p.events.filter(e => e !== event) : [...p.events, event]
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Novo webhook</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">URL do endpoint</label>
            <input type="url" value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://meusite.com/api/webhooks" className="input-field" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Eventos</label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_EVENTS.map(event => (
                <button key={event} onClick={() => toggleEvent(event)} className={`text-xs px-3 py-2 rounded-lg border transition-colors ${form.events.includes(event) ? 'border-accent bg-accent/10 text-accent' : 'border-border text-gray-400 hover:border-gray-500'}`}>
                  {event}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-primary flex-1">Criar webhook</button>
            <button onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Webhooks() {
  const [showModal, setShowModal] = useState(false)
  const [viewLogs, setViewLogs] = useState(null)

  return (
    <div>
      <Header title="Webhooks" subtitle="Receba notificacoes em tempo real" />

      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} />
            Novo webhook
          </button>
        </div>

        <div className="space-y-4">
          {mockWebhooks.map((wh) => (
            <div key={wh.id} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10"><Webhook size={20} className="text-accent" /></div>
                  <div>
                    <p className="text-sm font-medium text-white font-mono break-all">{wh.url}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Secret: {wh.secret}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${wh.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {wh.active ? 'Ativo' : 'Inativo'}
                  </span>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {wh.events.map(e => (
                  <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-bg-tertiary text-gray-400 border border-border">{e}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xs text-gray-500">Criado em {formatDateTime(wh.created_at)}</span>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                    <RefreshCw size={12} />
                    Testar
                  </button>
                  <button onClick={() => setViewLogs(wh)} className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors">
                    <Eye size={12} />
                    Logs ({wh.logs.length})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <CreateWebhookModal onClose={() => setShowModal(false)} />}

      {/* Logs modal */}
      {viewLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setViewLogs(null)}>
          <div className="glass-card p-6 w-full max-w-lg animate-fade-in max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Logs do webhook</h3>
              <button onClick={() => setViewLogs(null)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            {viewLogs.logs.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Nenhum log encontrado</p>
            ) : (
              <div className="space-y-2">
                {viewLogs.logs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary border border-border">
                    <div className="flex items-center gap-3">
                      {log.status === 'success' ? <CheckCircle size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-red-500" />}
                      <div>
                        <p className="text-sm text-white font-mono">{log.event}</p>
                        <p className="text-xs text-gray-500">{formatDateTime(log.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-mono ${log.status_code === 200 ? 'text-emerald-400' : 'text-red-400'}`}>{log.status_code}</p>
                      <p className="text-xs text-gray-500">{log.response_time}ms</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setViewLogs(null)} className="btn-ghost w-full text-sm mt-4">Fechar</button>
          </div>
        </div>
      )}
    </div>
  )
}
