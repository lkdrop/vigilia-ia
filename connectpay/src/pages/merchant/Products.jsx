import { useState } from 'react'
import { Plus, Package, Edit2, Trash2, Link, Copy, Check, X } from 'lucide-react'
import Header from '../../components/layout/Header'
import { mockProducts } from '../../data/mockData'
import { formatCurrency } from '../../utils/formatters'

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(product || { name: '', description: '', price: '', currency: 'brl' })
  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div className="glass-card p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">{product ? 'Editar produto' : 'Novo produto'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Nome do produto</label>
            <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ex: Curso de Marketing" className="input-field" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Descricao</label>
            <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Descreva seu produto..." className="input-field min-h-[80px] resize-none" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Preco (R$)</label>
            <input type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="297.00" className="input-field" step="0.01" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => { onSave?.(form); onClose() }} className="btn-primary flex-1">Salvar</button>
            <button onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [products, setProducts] = useState(mockProducts)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  const copyLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/pay/${id}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      <Header title="Produtos" subtitle={`${products.length} produtos cadastrados`} />

      <div className="p-6 space-y-4">
        <div className="flex justify-end">
          <button onClick={() => { setEditProduct(null); setShowModal(true) }} className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} />
            Novo produto
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="glass-card p-5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Package size={24} className="text-accent" />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => { setEditProduct(product); setShowModal(true) }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-bg-tertiary transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white mb-1">{product.name}</h3>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white">{formatCurrency(product.price)}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  product.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-500/10 text-gray-500'
                }`}>
                  {product.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xs text-gray-500">{product.sales} vendas</span>
                <button
                  onClick={() => copyLink(product.id)}
                  className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                    copiedId === product.id ? 'text-emerald-500' : 'text-accent hover:text-accent-light'
                  }`}
                >
                  {copiedId === product.id ? <Check size={12} /> : <Copy size={12} />}
                  {copiedId === product.id ? 'Copiado!' : 'Copiar link'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <ProductModal product={editProduct} onClose={() => setShowModal(false)} onSave={() => {}} />}
    </div>
  )
}
