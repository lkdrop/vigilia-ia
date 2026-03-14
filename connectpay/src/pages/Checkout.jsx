import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Lock, CreditCard, QrCode, FileText, Check, Copy, ShieldCheck, Clock, ChevronDown, Zap, X } from 'lucide-react'
import { formatCurrency, maskCPF, maskPhone } from '../utils/formatters'

const mockCheckoutData = {
  merchant: { name: 'Digital Academy', logo: null },
  product: {
    name: 'Curso de Marketing Digital Completo',
    description: 'Do zero ao avancado. Acesso vitalicio + certificado.',
    price: 297.00,
    image: null,
  },
  orderBump: {
    name: 'E-book: 50 Templates de Copy',
    price: 47.00,
    originalPrice: 97.00,
    description: 'Templates prontos de copy para anuncios, emails e landing pages.',
  },
  upsell: {
    name: 'Mentoria Individual (3 meses)',
    price: 497.00,
    originalPrice: 1497.00,
    description: 'Acompanhamento individual com reunioes semanais.',
  },
  config: {
    themeColor: '#8B5CF6',
    showTimer: true,
    timerMinutes: 15,
    installments: 12,
  },
}

function Timer({ minutes }) {
  const [seconds, setSeconds] = useState(minutes * 60)

  useEffect(() => {
    if (seconds <= 0) return
    const interval = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400">
      <Clock size={16} />
      <span className="text-sm font-medium">
        Oferta expira em {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  )
}

function PaymentMethodTabs({ selected, onChange }) {
  const methods = [
    { id: 'credit_card', label: 'Cartao', icon: CreditCard },
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'boleto', label: 'Boleto', icon: FileText },
  ]

  return (
    <div className="flex gap-2">
      {methods.map(m => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
            selected === m.id
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border bg-bg-secondary text-gray-400 hover:border-border-hover hover:text-white'
          }`}
        >
          <m.icon size={18} />
          {m.label}
        </button>
      ))}
    </div>
  )
}

function CreditCardForm({ installments, total }) {
  const [cardNumber, setCardNumber] = useState('')

  const formatCard = (v) => {
    return v.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
  }

  const installmentOptions = Array.from({ length: installments }, (_, i) => {
    const n = i + 1
    const value = total / n
    return { n, value, label: n === 1 ? `1x de ${formatCurrency(value)} (sem juros)` : `${n}x de ${formatCurrency(value)}` }
  })

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Numero do cartao</label>
        <div className="relative">
          <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(formatCard(e.target.value))}
            placeholder="0000 0000 0000 0000"
            className="input-field pl-10 font-mono"
            maxLength={19}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Validade</label>
          <input type="text" placeholder="MM/AA" className="input-field font-mono" maxLength={5} />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">CVV</label>
          <input type="text" placeholder="123" className="input-field font-mono" maxLength={4} />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Nome no cartao</label>
        <input type="text" placeholder="Como aparece no cartao" className="input-field" />
      </div>
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Parcelas</label>
        <div className="relative">
          <select className="input-field appearance-none pr-10">
            {installmentOptions.map(opt => (
              <option key={opt.n} value={opt.n}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

function PixPayment() {
  const [copied, setCopied] = useState(false)
  const pixCode = '00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890'

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="text-center space-y-4">
      {/* QR Code placeholder */}
      <div className="w-48 h-48 mx-auto bg-white rounded-xl p-3 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
          <QrCode size={64} className="text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-2 bg-bg-tertiary border border-border rounded-lg p-3">
        <input
          type="text"
          value={pixCode}
          readOnly
          className="flex-1 bg-transparent text-xs text-gray-400 font-mono truncate focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            copied ? 'bg-emerald-500/20 text-emerald-500' : 'bg-accent/10 text-accent hover:bg-accent/20'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      <div className="flex items-center gap-2 text-yellow-500 text-xs">
        <Clock size={14} />
        <span>O QR Code expira em 30 minutos</span>
      </div>

      <p className="text-xs text-gray-500">
        Apos o pagamento, a confirmacao e automatica em alguns segundos.
      </p>
    </div>
  )
}

function BoletoPayment() {
  return (
    <div className="text-center space-y-4">
      <div className="w-20 h-20 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center">
        <FileText size={36} className="text-accent" />
      </div>
      <div>
        <p className="text-sm text-white font-medium">Boleto bancario</p>
        <p className="text-xs text-gray-400 mt-1">O boleto sera gerado apos clicar em "Pagar"</p>
      </div>
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
        <p className="text-xs text-yellow-500">
          O boleto vence em 3 dias uteis. A confirmacao pode levar ate 2 dias apos o pagamento.
        </p>
      </div>
    </div>
  )
}

function SuccessPage({ product, onUpsell, onSkip, upsell }) {
  const [showUpsell, setShowUpsell] = useState(!!upsell)

  if (showUpsell && upsell) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="glass-card p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <Check size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Compra realizada!</h2>
            <p className="text-sm text-gray-400">Temos uma oferta especial para voce:</p>

            <div className="bg-bg-tertiary border border-accent/30 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-accent" />
                <span className="text-xs font-semibold text-accent uppercase">Oferta exclusiva</span>
              </div>
              <h3 className="text-lg font-bold text-white">{upsell.name}</h3>
              <p className="text-sm text-gray-400">{upsell.description}</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white">{formatCurrency(upsell.price)}</span>
                <span className="text-sm text-gray-500 line-through">{formatCurrency(upsell.originalPrice)}</span>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  -{Math.round((1 - upsell.price / upsell.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => { onUpsell?.(); setShowUpsell(false) }}
              className="btn-primary w-full text-base py-3"
            >
              Sim, quero aproveitar!
            </button>
            <button
              onClick={() => { onSkip?.(); setShowUpsell(false) }}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Nao, obrigado
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card p-8 text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center">
          <Check size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Pagamento confirmado!</h2>
        <p className="text-sm text-gray-400">
          Obrigado pela sua compra. Voce recebera os detalhes de acesso no email cadastrado.
        </p>
        <div className="bg-bg-tertiary rounded-lg p-4 text-left">
          <p className="text-xs text-gray-500 mb-1">Produto</p>
          <p className="text-sm text-white font-medium">{product.name}</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-emerald-500 text-sm">
          <ShieldCheck size={18} />
          <span>Transacao segura</span>
        </div>
      </div>
    </div>
  )
}

export default function Checkout() {
  const { checkoutId } = useParams()
  const [step, setStep] = useState('form') // form, processing, success, failed
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [orderBumpAdded, setOrderBumpAdded] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', cpf: '', phone: '' })

  const data = mockCheckoutData
  const basePrice = data.product.price
  const bumpPrice = orderBumpAdded ? data.orderBump.price : 0
  const total = basePrice + bumpPrice

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('processing')
    setTimeout(() => setStep('success'), 2500)
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-white font-medium">Processando pagamento...</p>
          <p className="text-sm text-gray-400">Nao feche esta pagina</p>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <SuccessPage
        product={data.product}
        upsell={data.upsell}
        onUpsell={() => {}}
        onSkip={() => {}}
      />
    )
  }

  if (step === 'failed') {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md glass-card p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-2xl flex items-center justify-center">
            <X size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Pagamento recusado</h2>
          <p className="text-sm text-gray-400">Verifique os dados do cartao e tente novamente.</p>
          <button onClick={() => setStep('form')} className="btn-primary w-full">Tentar novamente</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center mb-3">
            <Zap size={20} className="text-white" />
          </div>
          <p className="text-sm text-gray-400">{data.merchant.name}</p>
        </div>

        {/* Timer */}
        {data.config.showTimer && (
          <div className="flex justify-center mb-4">
            <Timer minutes={data.config.timerMinutes} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product card */}
          <div className="glass-card p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-white">{data.product.name}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{data.product.description}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold text-white">{formatCurrency(data.product.price)}</span>
                  <span className="text-xs text-gray-500">
                    ou {data.config.installments}x de {formatCurrency(data.product.price / data.config.installments)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer form */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">Seus dados</h3>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Nome completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">CPF</label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={e => setFormData({ ...formData, cpf: maskCPF(e.target.value) })}
                  placeholder="000.000.000-00"
                  className="input-field"
                  maxLength={14}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Telefone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                  placeholder="(00) 00000-0000"
                  className="input-field"
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* Order Bump */}
          <div
            onClick={() => setOrderBumpAdded(!orderBumpAdded)}
            className={`glass-card p-4 cursor-pointer transition-all ${
              orderBumpAdded ? 'border-accent/50 bg-accent/5' : 'hover:border-border-hover'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                orderBumpAdded ? 'bg-accent border-accent' : 'border-gray-500'
              }`}>
                {orderBumpAdded && <Check size={12} className="text-white" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-accent uppercase bg-accent/10 px-2 py-0.5 rounded-full">
                    Oferta especial
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{data.orderBump.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{data.orderBump.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm font-bold text-white">+{formatCurrency(data.orderBump.price)}</span>
                  <span className="text-xs text-gray-500 line-through">{formatCurrency(data.orderBump.originalPrice)}</span>
                  <span className="text-[10px] font-bold text-emerald-500">
                    -{Math.round((1 - data.orderBump.price / data.orderBump.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="glass-card p-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">Pagamento</h3>
            <PaymentMethodTabs selected={paymentMethod} onChange={setPaymentMethod} />

            {paymentMethod === 'credit_card' && (
              <CreditCardForm installments={data.config.installments} total={total} />
            )}
            {paymentMethod === 'pix' && <PixPayment />}
            {paymentMethod === 'boleto' && <BoletoPayment />}
          </div>

          {/* Total */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{data.product.name}</span>
              <span className="text-sm text-white">{formatCurrency(basePrice)}</span>
            </div>
            {orderBumpAdded && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{data.orderBump.name}</span>
                <span className="text-sm text-white">+{formatCurrency(bumpPrice)}</span>
              </div>
            )}
            <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
              <span className="text-base font-bold text-white">Total</span>
              <span className="text-xl font-bold text-white">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
            <Lock size={18} />
            {paymentMethod === 'pix' ? 'Gerar QR Code PIX' :
             paymentMethod === 'boleto' ? 'Gerar Boleto' :
             `Pagar ${formatCurrency(total)}`}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-gray-500 text-xs">
            <div className="flex items-center gap-1">
              <ShieldCheck size={14} />
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock size={14} />
              <span>Dados criptografados</span>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-600">
            Processado por ConnectPay. Ao pagar voce concorda com os termos de uso.
          </p>
        </form>
      </div>
    </div>
  )
}
