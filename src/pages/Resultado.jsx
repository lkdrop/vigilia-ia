import { useNavigate } from 'react-router-dom'
import { useJornada } from '../context/JornadaContext'
import { semanasData, areaEmojis } from '../data/semanas'

export default function Resultado() {
  const { nome, area } = useJornada()
  const navigate = useNavigate()

  const semanas = semanasData[area] || semanasData['Finanças']
  const emoji = areaEmojis[area] || '🔥'

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="text-5xl mb-4">🕯️</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
          <span className="text-gold">{nome}</span>, sua jornada está pronta!
        </h1>
        <p className="text-gray-400 text-lg">
          {emoji} Área: <span className="text-white font-semibold">{area}</span>
        </p>
      </div>

      {/* Timeline das 3 Semanas */}
      <div className="w-full max-w-2xl space-y-6 mb-12">
        {semanas.map((s, i) => (
          <div
            key={s.semana}
            className="animate-fade-in-up"
            style={{ animationDelay: `${0.2 + i * 0.2}s` }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <div className="flex items-start gap-4">
                {/* Número da Semana */}
                <div className="flex-shrink-0 w-14 h-14 bg-gold/20 border border-gold/40 rounded-xl flex items-center justify-center">
                  <span className="font-display text-gold text-xl font-bold">{s.semana}</span>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Semana {s.semana} — Dias {(s.semana - 1) * 7 + 1} a {s.semana * 7}
                  </p>
                  <h3 className="font-display text-xl text-white font-semibold">
                    {s.tema}
                  </h3>
                </div>
              </div>
            </div>

            {/* Linha conectora */}
            {i < semanas.length - 1 && (
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-gold/30" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 max-w-2xl w-full mb-8 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <p className="text-gold font-display text-lg font-semibold mb-1">21 dias de transformação</p>
        <p className="text-gray-300 text-sm">
          Cada dia você receberá uma oração profética personalizada com versículos bíblicos,
          palavra profética e decretos de poder.
        </p>
      </div>

      {/* Botão CTA */}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gold hover:bg-gold-light text-dark-900 font-bold text-lg px-10 py-4 rounded-full golden-pulse transition-all hover:scale-105 animate-fade-in-up"
        style={{ animationDelay: '1s' }}
      >
        Começar minha Jornada Agora 🔥
      </button>
    </div>
  )
}
