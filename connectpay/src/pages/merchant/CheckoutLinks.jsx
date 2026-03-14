import { useState } from 'react'
import { Plus, Link2, Copy, Check, ExternalLink, ToggleLeft, ToggleRight, Trash2, X } from 'lucide-react'
import Header from '../../components/layout/Header'
import { formatCurrency } from '../../utils/formatters'
import { mockProducts } from '../../data/mockData'

const mockLinks = [
  { id: 'link_001', slug: 'curso-marketing', product_id: 'prod_001', product_name: 'Curso de Marketing Digital', price: 297.00, active: true, views: 1240, conversions: 234, conversion_rate: 18.9, order_bump: true, upsell: true, timer: true, timer_minutes: 15 },
  { id: 'link_002', slug: 'ebook-fitness', product_id: 'prod_002', product_name: 'E-book Receitas Fitness', price: 47.00, active: true, views: 3560, conversions: 567, conversion_rate: 15.9, order_bump: false, upsell: false, timer: false, timer_minutes: 0 },
  { id: 'link_003', slug: 'mentoria-premium', product_id: 'prod_003', product_name: 'Mentoria Premium', price: 1497.00, active: false, views: 450, conversions: 45, conversion_rate: 10.0, order_bump: true, upsell: true, timer: true, timer_minutes: 10 },
]

function CreateLinkModal({ onClose }) {
  const [form, setForm] = useState({ product_id: '', slug: '', timer: false, timer_minutes: 15, order_bump: false, upsell: false })
  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Novo link de checkout</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Produto</label>
            <select value={form.product_id} onChange={e => update('product_id', e.target.value)} className="input-field">
              <option value="">Selecione um produto</option>
              {mockProducts.map(p => <option key={p.id} value={p.id}>{p.name} - {formatCurrency(p.price)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Slug da URL</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">connectpay.com/pay/</span>
              <input type="text" value={form.slug} onChange={e => update('slug', e.target.value)} placeholder="meu-produto" className="input-field flex-1" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm text-gray-400 block">Opcoes do checkout</label>
            {[
              ['timer', 'Timer de urgencia'],
              ['order_bump', 'Order Bump'],
              ['upsell', 'Upsell pos-compra'],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-white">{label}</span>
                <button onClick={() => update(key, !form[key])} className="text-accent">
                  {form[key] ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-gray-500" />}
                </button>
              </div>
            ))}
            {form.timer && (
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Minutos do timer</label>
                <input type="number" value={form.timer_minutes} onChange={e => update('timer_minutes', e.target.value)} className="input-field w-24" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-primary flex-1">Criar link</button>
            <button onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutLinks() {
  const [showModal, setShowModal] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const copyLink = (slug) => {
    navigator.clipboard.writeText(`${window.location.origin}/pay/${slug}`)
    setCopiedId(slug)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      <Header title="Links de Checkout" subtitle={`${mockLinks.length} links criados`} />

      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} />
            Novo link
          </button>
        </div>

        <div className="space-y-4">
          {mockLinks.map((link) => (
            <div key={link.id} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10"><Link2 size={20} className="text-accent" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{link.product_name}</h3>
                    <p className="text-xs text-gray-500">/{link.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${link.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {link.active ? 'Ativo' : 'Inativo'}
                  </span>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Preco</p>
                  <p className="text-sm font-bold text-white">{formatCurrency(link.price)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Visualizacoes</p>
                  <p className="text-sm font-bold text-white">{link.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversoes</p>
                  <p className="text-sm font-bold text-emerald-400">{link.conversions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Taxa de conversao</p>
                  <p className="text-sm font-bold text-accent">{link.conversion_rate}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {link.order_bump && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">Order Bump</span>}
                {link.upsell && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">Upsell</span>}
                {link.timer && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">Timer {link.timer_minutes}min</span>}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                <button onClick={() => copyLink(link.slug)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${copiedId === link.slug ? 'text-emerald-500' : 'text-accent hover:text-accent-light'}`}>
                  {copiedId === link.slug ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === link.slug ? 'Copiado!' : 'Copiar link'}
                </button>
                <a href={`/pay/${link.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">
                  <ExternalLink size={14} />
                  Abrir checkout
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <CreateLinkModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
