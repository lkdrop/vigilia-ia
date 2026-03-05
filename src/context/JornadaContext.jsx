import { createContext, useContext, useState, useEffect } from 'react'

const JornadaContext = createContext()

const STORAGE_KEY = 'vigilia-ia-jornada'

const initialState = {
  nome: '',
  denominacao: '',
  area: '',
  desafio: '',
  nivel: '',
  horario: '',
  diaAtual: 1,
  streak: 0,
  checkins: [],
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) }
    }
  } catch {
    // ignore
  }
  return initialState
}

export function JornadaProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const update = (partial) => {
    setState((prev) => ({ ...prev, ...partial }))
  }

  const completarDia = (dia) => {
    setState((prev) => {
      if (prev.checkins.includes(dia)) return prev

      const newCheckins = [...prev.checkins, dia]
      const novoDia = Math.min(dia + 1, 22) // 22 = jornada completa
      const novoStreak = prev.streak + 1

      return {
        ...prev,
        checkins: newCheckins,
        diaAtual: novoDia,
        streak: novoStreak,
      }
    })
  }

  const resetar = () => {
    setState(initialState)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <JornadaContext.Provider value={{ ...state, update, completarDia, resetar }}>
      {children}
    </JornadaContext.Provider>
  )
}

export function useJornada() {
  const ctx = useContext(JornadaContext)
  if (!ctx) throw new Error('useJornada deve ser usado dentro de JornadaProvider')
  return ctx
}
