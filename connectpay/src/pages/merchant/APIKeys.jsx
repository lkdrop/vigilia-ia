import { useState } from 'react'
import { Key, Copy, Check, Eye, EyeOff, Plus, Trash2, Shield, X } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatDateTime } from '../../utils/formatters'

const mockKeys = [
  { id: 'key_001', name: 'Producao', type: 'live', public_key: 'pk_live_abc123def456ghi789', secret_key: 'sk_live_***************************xyz', created_at: '2026-01-15T10:00:00Z', last_used: '2026-03-14T10:30:00Z' },
  { id: 'key_002', name: 'Teste', type: 'test', public_key: 'pk_test_abc123def456ghi789', secret_key: 'sk_test_***************************xyz', created_at: '2026-01-15T10:00:00Z', last_used: '2026-03-14T08:00:00Z' },
]

export default function APIKeys() {
  const [copiedKey, setCopiedKey] = useState(null)
  const [showSecret, setShowSecret] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')

  const copy = (value, id) => {
    navigator.clipboard.writeText(value)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div>
      <Header title="API Keys" subtitle="Chaves de integracao" />

      <div className="p-6 space-y-6">
        {/* Info */}
        <div className="glass-card p-5 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/10"><Shield size={24} className="text-accent" /></div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Sobre suas chaves</h3>
            <p className="text-sm text-gray-400">
              Use chaves de <span className="text-yellow-400">teste</span> para desenvolvimento e chaves de <span className="text-emerald-400">producao</span> para transacoes reais.
              Nunca exponha sua <span className="text-red-400">secret key</span> no frontend ou repositorios publicos.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} />
            Gerar nova chave
          </button>
        </div>

        {/* Keys */}
        <div className="space-y-4">
          {mockKeys.map((key) => (
            <div key={key.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${key.type === 'live' ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`}>
                    <Key size={20} className={key.type === 'live' ? 'text-emerald-500' : 'text-yellow-500'} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{key.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${key.type === 'live' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {key.type === 'live' ? 'Producao' : 'Teste'}
                    </span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="space-y-3">
                {/* Public key */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Chave publica (publishable key)</label>
                  <div className="flex items-center gap-2 bg-bg-primary border border-border rounded-lg px-3 py-2">
                    <code className="text-sm text-gray-300 flex-1 font-mono truncate">{key.public_key}</code>
                    <button onClick={() => copy(key.public_key, key.id + '_pub')} className="text-gray-400 hover:text-white transition-colors">
                      {copiedKey === key.id + '_pub' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Secret key */}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Chave secreta (secret key)</label>
                  <div className="flex items-center gap-2 bg-bg-primary border border-border rounded-lg px-3 py-2">
                    <code className="text-sm text-gray-300 flex-1 font-mono truncate">
                      {showSecret[key.id] ? key.secret_key.replace(/\*/g, 'a') : key.secret_key}
                    </code>
                    <button onClick={() => setShowSecret(p => ({ ...p, [key.id]: !p[key.id] }))} className="text-gray-400 hover:text-white transition-colors">
                      {showSecret[key.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => copy(key.secret_key, key.id + '_sec')} className="text-gray-400 hover:text-white transition-colors">
                      {copiedKey === key.id + '_sec' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-gray-500">Criada em {formatDateTime(key.created_at)}</span>
                <span className="text-xs text-gray-500">Ultimo uso: {formatDateTime(key.last_used)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Code example */}
        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold text-white mb-3">Exemplo de uso</h4>
          <pre className="bg-bg-primary border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono">{`// Criar um pagamento via API
const response = await fetch('https://api.connectpay.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_test_sua_chave_secreta',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 29700, // centavos
    currency: 'brl',
    payment_method: 'credit_card',
    customer: { name: 'Maria', email: 'maria@email.com' },
  }),
})`}</code>
          </pre>
        </div>
      </div>

      {/* Create key modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setShowModal(false)}>
          <div className="glass-card p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Gerar nova chave</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Nome da chave</label>
                <input type="text" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="Ex: Integracao site" className="input-field" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="btn-primary flex-1">Gerar</button>
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
