import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap, Shield, CreditCard, QrCode, BarChart3, Globe, Users, ArrowRight,
  CheckCircle, Star, ChevronDown, ChevronUp, Lock, Headphones, Code, Layers
} from 'lucide-react'

const features = [
  { icon: CreditCard, title: 'Cartao de credito', desc: 'Aceite Visa, Mastercard, Elo e mais. Parcelamento em ate 12x.' },
  { icon: QrCode, title: 'PIX instantaneo', desc: 'Receba pagamentos via PIX em segundos com QR Code automatico.' },
  { icon: Shield, title: 'Antifraude inteligente', desc: 'Sistema de prevencao de fraudes e chargebacks integrado.' },
  { icon: BarChart3, title: 'Dashboard completo', desc: 'Acompanhe vendas, metricas e financeiro em tempo real.' },
  { icon: Globe, title: 'Checkout customizavel', desc: 'Personalize cores, logo, order bumps e upsells.' },
  { icon: Code, title: 'API completa', desc: 'Integre pagamentos no seu sistema com nossa API REST.' },
]

const plans = [
  { name: 'Starter', price: 'Gratis', desc: 'Para quem esta comecando', fee: '4.99%', features: ['Cartao + PIX', 'Dashboard basico', 'Checkout padrao', 'Suporte por email'] },
  { name: 'Pro', price: 'R$ 97/mes', desc: 'Para negocios em crescimento', fee: '3.99%', popular: true, features: ['Tudo do Starter', 'Checkout customizavel', 'Order bump + Upsell', 'API + Webhooks', 'Suporte prioritario'] },
  { name: 'Enterprise', price: 'Sob consulta', desc: 'Para grandes volumes', fee: 'Negociavel', features: ['Tudo do Pro', 'White label', 'Antecipacao de recebiveis', 'Gerente dedicado', 'SLA garantido'] },
]

const faqs = [
  { q: 'Preciso de CNPJ para usar?', a: 'Sim, para processar pagamentos voce precisa de um CNPJ ativo. Aceitamos MEI, ME, EPP e demais tipos.' },
  { q: 'Quanto tempo demora para receber?', a: 'Pagamentos com cartao ficam disponiveis em D+30 (ou D+2 com antecipacao). PIX e disponibilizado em D+1.' },
  { q: 'Posso personalizar o checkout?', a: 'Sim! No plano Pro voce pode customizar cores, logo, adicionar order bumps, upsells e timer de urgencia.' },
  { q: 'Como funciona a protecao contra chargebacks?', a: 'Utilizamos sistemas de pre-chargeback (Verifi RDR e Ethoca Alerts) para resolver disputas automaticamente antes que virem chargebacks.' },
  { q: 'Tem API para integracao?', a: 'Sim, oferecemos uma API REST completa com webhooks para integrar pagamentos em qualquer plataforma.' },
]

const stats = [
  { value: 'R$ 50M+', label: 'Processados' },
  { value: '15.000+', label: 'Transacoes/mes' },
  { value: '99.9%', label: 'Uptime' },
  { value: '< 1%', label: 'Chargeback' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/50">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-sm font-medium text-white">{q}</span>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <p className="text-sm text-gray-400 pb-4">{a}</p>}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Nav */}
      <nav className="border-b border-border/50 sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-700 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">ConnectPay</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Recursos</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Precos</a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Entrar</Link>
            <Link to="/register" className="btn-primary text-sm px-4 py-2">Criar conta</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <Zap size={14} className="text-accent" />
              <span className="text-xs font-medium text-accent">Gateway de pagamento completo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Processe pagamentos com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">simplicidade</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Aceite cartao de credito, PIX e boleto em minutos. Dashboard completo, checkout personalizavel e antifraude inteligente para seu negocio digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
                Comecar agora <ArrowRight size={18} />
              </Link>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                Ver recursos <ChevronDown size={16} />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Tudo que voce precisa para vender online</h2>
          <p className="text-gray-400">Infraestrutura completa de pagamentos para seu negocio digital</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <f.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bg-secondary/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Como funciona</h2>
            <p className="text-gray-400">Comece a receber pagamentos em 3 passos simples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: Users, title: 'Crie sua conta', desc: 'Cadastre-se gratuitamente e complete a verificacao do seu negocio.' },
              { step: '2', icon: Layers, title: 'Configure seu checkout', desc: 'Personalize cores, adicione produtos e configure metodos de pagamento.' },
              { step: '3', icon: Zap, title: 'Comece a vender', desc: 'Compartilhe o link de checkout e receba pagamentos na hora.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-accent" />
                </div>
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Planos e precos</h2>
          <p className="text-gray-400">Escolha o plano ideal para o tamanho do seu negocio</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`glass-card p-6 relative ${plan.popular ? 'border-accent/50 ring-1 ring-accent/20' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                  Mais popular
                </div>
              )}
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{plan.desc}</p>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
              </div>
              <p className="text-sm text-accent font-medium mb-6">Taxa: {plan.fee} por transacao</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                Comecar agora
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-bg-secondary/50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Lock size={32} className="text-accent" />
              <h3 className="text-base font-semibold text-white">Pagamentos seguros</h3>
              <p className="text-sm text-gray-400">Certificacao PCI DSS Level 1 via Stripe. Dados criptografados end-to-end.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Headphones size={32} className="text-accent" />
              <h3 className="text-base font-semibold text-white">Suporte dedicado</h3>
              <p className="text-sm text-gray-400">Time de suporte pronto para ajudar via chat, email e WhatsApp.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Shield size={32} className="text-accent" />
              <h3 className="text-base font-semibold text-white">Protecao contra fraudes</h3>
              <p className="text-sm text-gray-400">Verifi RDR + Ethoca Alerts para prevencao automatica de chargebacks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Perguntas frequentes</h2>
        </div>
        <div className="glass-card p-6">
          {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="gradient-border p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para comecar?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Crie sua conta gratuita e comece a processar pagamentos em minutos. Sem taxa de adesao, sem mensalidade no plano Starter.
          </p>
          <Link to="/register" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
            Criar conta gratis <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple-700 flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white">ConnectPay</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Termos de uso</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Politica de privacidade</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Contato</a>
            </div>
            <p className="text-xs text-gray-500">© 2026 ConnectPay. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
