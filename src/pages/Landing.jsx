import { useNavigate } from 'react-router-dom'

const beneficios = [
  {
    icon: '📖',
    title: 'Orações Proféticas',
    desc: 'Geradas por IA com versículos reais e palavras de poder para sua vida',
  },
  {
    icon: '🔥',
    title: 'Personalizada pra Você',
    desc: 'Cada oração é única, baseada na sua situação, fé e necessidade',
  },
  {
    icon: '📅',
    title: '21 Dias de Jornada',
    desc: 'Estrutura de 3 semanas com temas progressivos de transformação',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Ícone da vela */}
      <div className="text-7xl mb-6 animate-fade-in-up">🕯️</div>

      {/* Título */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-center font-bold mb-4 text-glow animate-fade-in-up">
        Sua Jornada Profética de{' '}
        <span className="text-gold">21 Dias</span>{' '}
        começa aqui
      </h1>

      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Orações proféticas personalizadas geradas por inteligência artificial,
        com versículos bíblicos reais e palavras de poder para cada dia da sua
        jornada de transformação espiritual.
      </p>

      {/* Benefícios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12 w-full">
        {beneficios.map((b, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center animate-fade-in-up hover:border-gold/30 transition-colors"
            style={{ animationDelay: `${0.3 + i * 0.15}s` }}
          >
            <div className="text-4xl mb-3">{b.icon}</div>
            <h3 className="font-display text-lg text-gold font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-400 text-sm">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Botão CTA */}
      <button
        onClick={() => navigate('/quiz')}
        className="bg-gold hover:bg-gold-light text-dark-900 font-bold text-lg px-10 py-4 rounded-full golden-pulse transition-all hover:scale-105 animate-fade-in-up"
        style={{ animationDelay: '0.7s' }}
      >
        Iniciar minha Jornada Profética →
      </button>

      {/* Rodapé sutil */}
      <p className="text-gray-600 text-xs mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        Vigília IA — Tecnologia a serviço da fé
      </p>
    </div>
  )
}
