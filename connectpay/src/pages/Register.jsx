import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Zap, Mail, Lock, Eye, EyeOff, User, Phone, FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { maskCPF, maskPhone } from '../utils/formatters'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', document: '', phone: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('As senhas nao coincidem')
      return
    }
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setLoading(true)
    // TODO: API call to register
    await login(form.email, form.password)
    setLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ConnectPay</h1>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-white text-center mb-2">Criar conta</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Comece a processar pagamentos agora</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mb-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Nome completo</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Seu nome" className="input-field pl-10" required />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="seu@email.com" className="input-field pl-10" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">CPF / CNPJ</label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" value={form.document} onChange={e => update('document', maskCPF(e.target.value))} placeholder="000.000.000-00" className="input-field pl-10" maxLength={18} required />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Telefone</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" value={form.phone} onChange={e => update('phone', maskPhone(e.target.value))} placeholder="(00) 00000-0000" className="input-field pl-10" maxLength={15} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="Minimo 6 caracteres"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Confirmar senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Repita a senha" className="input-field pl-10" required />
              </div>
            </div>

            <label className="flex items-start gap-2 text-gray-400 cursor-pointer text-sm">
              <input type="checkbox" className="mt-1 rounded border-border bg-bg-tertiary accent-accent" required />
              <span>Concordo com os <a href="#" className="text-accent">Termos de Uso</a> e <a href="#" className="text-accent">Politica de Privacidade</a></span>
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Criar conta'}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Ja tem uma conta?{' '}
            <Link to="/login" className="text-accent hover:text-accent-light transition-colors font-medium">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
