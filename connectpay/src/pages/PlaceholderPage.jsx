import { Construction } from 'lucide-react'
import Header from '../components/layout/Header'

export default function PlaceholderPage({ title, subtitle }) {
  return (
    <div>
      <Header title={title || 'Em construcao'} subtitle={subtitle} />
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Construction size={32} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 max-w-md">
            Esta pagina esta em desenvolvimento. Em breve estara disponivel.
          </p>
        </div>
      </div>
    </div>
  )
}
