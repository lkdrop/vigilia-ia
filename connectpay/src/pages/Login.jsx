import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await login(email, password)
    setLoading(false)
    if (email === 'admin@connectpay.com') {
      navigate('/admin')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ConnectPay</h1>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-bold text-white text-center mb-2">Bem-vindo de volta</h2>
          <p className="text-sm text-gray-400 text-center mb-6">Entre na sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-border bg-bg-tertiary accent-accent" />
                Lembrar de mim
              </label>
              <a href="/forgot-password" className="text-accent hover:text-accent-light transition-colors">
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Nao tem uma conta?{' '}
            <a href="/register" className="text-accent hover:text-accent-light transition-colors font-medium">
              Criar conta
            </a>
          </p>
        </div>

        {/* Dev shortcuts */}
        <div className="mt-4 glass-card p-4">
          <p className="text-xs text-gray-500 mb-2">Atalhos de desenvolvimento:</p>
          <div className="flex gap-2">
            <button
              onClick={() => { setEmail('admin@connectpay.com'); setPassword('admin123') }}
              className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors"
            >
              Login Admin
            </button>
            <button
              onClick={() => { setEmail('lojista@email.com'); setPassword('lojista123') }}
              className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-colors"
            >
              Login Lojista
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
