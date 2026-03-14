import { Search, Bell } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Header({ title, subtitle }) {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg-primary/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="lg:ml-0 ml-12">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-bg-secondary transition-colors">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-sm">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
