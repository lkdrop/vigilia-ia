import { useState } from 'react'
import { Save, Palette, Globe, Image, Type, Mail } from 'lucide-react'
import Header from '../../components/layout/Header'

export default function WhiteLabel() {
  const [config, setConfig] = useState({
    platform_name: 'ConnectPay',
    primary_color: '#8B5CF6',
    secondary_color: '#7C3AED',
    logo_url: '',
    favicon_url: '',
    domain: 'app.connectpay.com',
    support_email: 'suporte@connectpay.com',
    footer_text: '© 2026 ConnectPay. Todos os direitos reservados.',
    checkout_title: 'Pagamento seguro',
    checkout_badge: 'Protegido por ConnectPay',
  })

  const update = (key, value) => setConfig(p => ({ ...p, [key]: value }))

  return (
    <div>
      <Header title="White Label" subtitle="Personalizacao da plataforma" />

      <div className="p-6 space-y-6">
        {/* Preview */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Pre-visualizacao</h3>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="h-12 flex items-center px-4 gap-3" style={{ backgroundColor: config.primary_color + '20' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.primary_color }}>
                <span className="text-white text-xs font-bold">{config.platform_name.charAt(0)}</span>
              </div>
              <span className="text-sm font-semibold text-white">{config.platform_name}</span>
            </div>
            <div className="bg-bg-primary p-4 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-gray-500">{config.checkout_badge}</p>
                <p className="text-sm font-medium mt-1" style={{ color: config.primary_color }}>{config.checkout_title}</p>
              </div>
            </div>
            <div className="h-8 flex items-center justify-center bg-bg-secondary border-t border-border">
              <p className="text-xs text-gray-500">{config.footer_text}</p>
            </div>
          </div>
        </div>

        {/* Settings grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branding */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Palette size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Marca</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Nome da plataforma</label>
                <input type="text" value={config.platform_name} onChange={e => update('platform_name', e.target.value)} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Cor primaria</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={config.primary_color} onChange={e => update('primary_color', e.target.value)} className="w-10 h-10 rounded-lg border border-border bg-transparent cursor-pointer" />
                    <input type="text" value={config.primary_color} onChange={e => update('primary_color', e.target.value)} className="input-field flex-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Cor secundaria</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={config.secondary_color} onChange={e => update('secondary_color', e.target.value)} className="w-10 h-10 rounded-lg border border-border bg-transparent cursor-pointer" />
                    <input type="text" value={config.secondary_color} onChange={e => update('secondary_color', e.target.value)} className="input-field flex-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Image size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Imagens</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Logo</label>
                <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-8 hover:border-accent/50 transition-colors cursor-pointer">
                  <p className="text-sm text-gray-500">Arraste ou clique para enviar (PNG, SVG)</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Favicon</label>
                <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-accent/50 transition-colors cursor-pointer">
                  <p className="text-sm text-gray-500">32x32 ou 64x64 px</p>
                </div>
              </div>
            </div>
          </div>

          {/* Domain */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Dominio</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Dominio customizado</label>
                <input type="text" value={config.domain} onChange={e => update('domain', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Email de suporte</label>
                <input type="email" value={config.support_email} onChange={e => update('support_email', e.target.value)} className="input-field" />
              </div>
            </div>
          </div>

          {/* Checkout */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Type size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Textos</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Titulo do checkout</label>
                <input type="text" value={config.checkout_title} onChange={e => update('checkout_title', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Badge de seguranca</label>
                <input type="text" value={config.checkout_badge} onChange={e => update('checkout_badge', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Texto do rodape</label>
                <input type="text" value={config.footer_text} onChange={e => update('footer_text', e.target.value)} className="input-field" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Save size={16} />
            Salvar configuracoes
          </button>
        </div>
      </div>
    </div>
  )
}
