import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { JornadaProvider } from './context/JornadaContext'
import StarBackground from './components/StarBackground'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Resultado from './pages/Resultado'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <JornadaProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-700 text-white font-body relative overflow-x-hidden">
          <StarBackground />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </JornadaProvider>
  )
}
