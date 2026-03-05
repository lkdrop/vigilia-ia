import { useState } from 'react'
import { useJornada } from '../context/JornadaContext'
import { getSemana, getTemaSemana, areaEmojis } from '../data/semanas'

export default function Dashboard() {
  const { nome, area, desafio, denominacao, nivel, diaAtual, streak, checkins, completarDia, resetar } = useJornada()
  const [oracao, setOracao] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  const jornadaCompleta = diaAtual > 21
  const diaExibido = Math.min(diaAtual, 21)
  const semanaAtual = getSemana(diaExibido)
  const temaSemana = getTemaSemana(area, semanaAtual)
  const emoji = areaEmojis[area] || '🔥'

  const gerarOracao = async () => {
    setLoading(true)
    setErro('')
    setOracao('')

    try {
      const res = await fetch('/api/generate-prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          dia: diaExibido,
          semana: semanaAtual,
          temaSemana,
          area,
          desafio,
          denominacao,
          nivel,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Erro ${res.status}`)
      }

      const data = await res.json()
      setOracao(data.oracao)
    } catch (err) {
      setErro(err.message || 'Erro ao gerar oração. Verifique a API key.')
    } finally {
      setLoading(false)
    }
  }

  const completar = () => {
    completarDia(diaExibido)
    setOracao('')
  }

  return (
    <div className="relative z-10 min-h-screen px-4 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <p className="text-gray-400 text-sm">Bem-vindo(a) de volta,</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gold">{nome}</h1>
        </div>
        <div className="text-center">
          <div className="text-3xl">🔥</div>
          <p className="text-sm text-gray-400">{streak} {streak === 1 ? 'dia' : 'dias'}</p>
        </div>
      </div>

      {/* Jornada Completa */}
      {jornadaCompleta && (
        <div className="bg-gold/20 border border-gold/50 rounded-2xl p-8 text-center mb-8 animate-fade-in-up">
          <div className="text-6xl mb-4">👑</div>
          <h2 className="font-display text-3xl text-gold font-bold mb-2">Jornada Completa!</h2>
          <p className="text-gray-300 mb-6">
            Parabéns, {nome}! Você completou os 21 dias de jornada profética.
            Que as bênçãos derramadas continuem em sua vida!
          </p>
          <button
            onClick={resetar}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl transition-all"
          >
            Iniciar Nova Jornada
          </button>
        </div>
      )}

      {/* Progresso */}
      {!jornadaCompleta && (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400">
                {emoji} Semana {semanaAtual} — {temaSemana}
              </p>
              <p className="text-gold font-semibold">Dia {diaExibido} de 21</p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-gold-dark to-gold h-3 rounded-full transition-all duration-700"
                style={{ width: `${(checkins.length / 21) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{checkins.length}/21 vigílias completadas</p>
          </div>

          {/* Grade dos 21 dias */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display text-lg mb-4">Seus 21 Dias</h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 21 }, (_, i) => {
                const dia = i + 1
                const concluido = checkins.includes(dia)
                const atual = dia === diaExibido
                return (
                  <div
                    key={dia}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                      ${concluido
                        ? 'bg-gold/30 border border-gold text-gold'
                        : atual
                          ? 'bg-white/10 border-2 border-gold text-white golden-pulse'
                          : 'bg-white/5 border border-white/10 text-gray-600'
                      }
                    `}
                  >
                    {concluido ? '✓' : dia}
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-gold/30 border border-gold inline-block" /> Concluído
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-white/10 border-2 border-gold inline-block" /> Hoje
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-white/5 border border-white/10 inline-block" /> Pendente
              </span>
            </div>
          </div>

          {/* Seção da Oração */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-display text-xl mb-2">Oração do Dia {diaExibido}</h3>
            <p className="text-gray-400 text-sm mb-6">
              Semana {semanaAtual}: {temaSemana}
            </p>

            {/* Oração ainda não gerada */}
            {!oracao && !loading && (
              <button
                onClick={gerarOracao}
                className="w-full bg-gold hover:bg-gold-light text-dark-900 font-bold text-lg py-4 rounded-xl golden-pulse transition-all hover:scale-[1.02]"
              >
                ✨ Gerar Oração Profética
              </button>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
                <p className="text-gold font-display text-lg">O Espírito está se movendo...</p>
                <p className="text-gray-500 text-sm mt-1">Gerando sua oração profética</p>
              </div>
            )}

            {/* Erro */}
            {erro && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                <p className="text-red-400 text-sm">{erro}</p>
                <button
                  onClick={gerarOracao}
                  className="text-red-300 hover:text-red-200 text-sm mt-2 underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Oração gerada */}
            {oracao && (
              <div className="animate-fade-in">
                <div className="bg-dark-900/50 border border-gold/20 rounded-xl p-6 mb-6 whitespace-pre-wrap leading-relaxed text-gray-200">
                  {oracao}
                </div>
                <button
                  onClick={completar}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg py-4 rounded-xl transition-all hover:scale-[1.02]"
                >
                  ✅ Completei minha vigília hoje!
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
