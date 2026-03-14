import { createContext, useContext, useState } from 'react'
import { mockUser, mockMerchantUser } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Em dev, simula login como admin. Troque para mockMerchantUser para testar merchant
  const [user, setUser] = useState(mockUser)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = async (email, password) => {
    // TODO: Integrar com backend
    if (email === 'admin@connectpay.com') {
      setUser(mockUser)
    } else {
      setUser(mockMerchantUser)
    }
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const switchRole = (role) => {
    if (role === 'admin') setUser(mockUser)
    else setUser(mockMerchantUser)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
