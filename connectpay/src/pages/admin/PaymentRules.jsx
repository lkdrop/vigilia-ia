import { useState } from 'react'
import { Save, Percent, CreditCard, QrCode, FileText, Shield, Clock } from 'lucide-react'
import Header from '../../components/layout/Header'

export default function PaymentRules() {
  const [rules, setRules] = useState({
    default_fee_card: 4.99,
    default_fee_pix: 2.99,
    default_fee_boleto: 3.99,
    min_transaction: 5.00,
    max_transaction: 50000.00,
    max_installments: 12,
    installment_min_value: 20.00,
    reserve_percentage: 10,
    reserve_days: 90,
    payout_min: 50.00,
    payout_auto: true,
    payout_auto_day: 'friday',
    antifraud_enabled: true,
    antifraud_max_attempts: 3,
    antifraud_block_minutes: 30,
    pix_expiration_minutes: 30,
    boleto_expiration_days: 3,
  })

  const update = (key, value) => setRules(p => ({ ...p, [key]: value }))

  return (
    <div>
      <Header title="Regras de Pagamento" subtitle="Taxas, limites e configuracoes" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fees */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Percent size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Taxas padrao</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2"><CreditCard size={14} />Taxa cartao de credito (%)</label>
                <input type="number" value={rules.default_fee_card} onChange={e => update('default_fee_card', parseFloat(e.target.value))} className="input-field" step="0.01" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2"><QrCode size={14} />Taxa PIX (%)</label>
                <input type="number" value={rules.default_fee_pix} onChange={e => update('default_fee_pix', parseFloat(e.target.value))} className="input-field" step="0.01" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2"><FileText size={14} />Taxa boleto (%)</label>
                <input type="number" value={rules.default_fee_boleto} onChange={e => update('default_fee_boleto', parseFloat(e.target.value))} className="input-field" step="0.01" />
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Limites de transacao</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Valor minimo (R$)</label>
                <input type="number" value={rules.min_transaction} onChange={e => update('min_transaction', parseFloat(e.target.value))} className="input-field" step="0.01" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Valor maximo (R$)</label>
                <input type="number" value={rules.max_transaction} onChange={e => update('max_transaction', parseFloat(e.target.value))} className="input-field" step="0.01" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Max parcelas</label>
                  <select value={rules.max_installments} onChange={e => update('max_installments', parseInt(e.target.value))} className="input-field">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{n}x</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Parcela minima (R$)</label>
                  <input type="number" value={rules.installment_min_value} onChange={e => update('installment_min_value', parseFloat(e.target.value))} className="input-field" step="0.01" />
                </div>
              </div>
            </div>
          </div>

          {/* Reserve */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Reserva (rolling reserve)</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Porcentagem retida (%)</label>
                <input type="number" value={rules.reserve_percentage} onChange={e => update('reserve_percentage', parseInt(e.target.value))} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Dias de retencao</label>
                <input type="number" value={rules.reserve_days} onChange={e => update('reserve_days', parseInt(e.target.value))} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Saque minimo (R$)</label>
                <input type="number" value={rules.payout_min} onChange={e => update('payout_min', parseFloat(e.target.value))} className="input-field" step="0.01" />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-300">Saque automatico semanal</span>
                <button onClick={() => update('payout_auto', !rules.payout_auto)} className={`w-10 h-5 rounded-full transition-colors relative ${rules.payout_auto ? 'bg-accent' : 'bg-gray-600'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${rules.payout_auto ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Anti-fraud */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-red-400" />
              <h3 className="text-sm font-semibold text-white">Antifraude</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-300">Antifraude ativo</span>
                <button onClick={() => update('antifraud_enabled', !rules.antifraud_enabled)} className={`w-10 h-5 rounded-full transition-colors relative ${rules.antifraud_enabled ? 'bg-accent' : 'bg-gray-600'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${rules.antifraud_enabled ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Max tentativas por cartao</label>
                <input type="number" value={rules.antifraud_max_attempts} onChange={e => update('antifraud_max_attempts', parseInt(e.target.value))} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Bloqueio temporario (minutos)</label>
                <input type="number" value={rules.antifraud_block_minutes} onChange={e => update('antifraud_block_minutes', parseInt(e.target.value))} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-1"><Clock size={12} />Expiracao PIX (min)</label>
                  <input type="number" value={rules.pix_expiration_minutes} onChange={e => update('pix_expiration_minutes', parseInt(e.target.value))} className="input-field" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-1"><Clock size={12} />Expiracao boleto (dias)</label>
                  <input type="number" value={rules.boleto_expiration_days} onChange={e => update('boleto_expiration_days', parseInt(e.target.value))} className="input-field" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Save size={16} />
            Salvar regras
          </button>
        </div>
      </div>
    </div>
  )
}
