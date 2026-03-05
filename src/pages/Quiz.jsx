import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJornada } from '../context/JornadaContext'

const perguntas = [
  {
    id: 'nome',
    titulo: 'Como podemos te chamar?',
    subtitulo: 'Seu nome será usado nas orações proféticas',
    tipo: 'input',
  },
  {
    id: 'denominacao',
    titulo: 'Qual sua denominação?',
    subtitulo: 'Assim personalizamos o tom da oração',
    tipo: 'opcoes',
    opcoes: [
      { label: '⛪ Evangélico(a)', value: 'Evangélico(a)' },
      { label: '✝️ Católico(a)', value: 'Católico(a)' },
      { label: '🕊️ Interdenominacional', value: 'Interdenominacional' },
      { label: '🤍 Prefiro não dizer', value: 'Prefiro não dizer' },
    ],
  },
  {
    id: 'area',
    titulo: 'Qual sua área de intercessão?',
    subtitulo: 'Escolha o tema principal da sua jornada',
    tipo: 'opcoes',
    opcoes: [
      { label: '💰 Finanças', value: 'Finanças' },
      { label: '❤️ Família', value: 'Família' },
      { label: '🏥 Saúde', value: 'Saúde' },
      { label: '🎯 Direção/Propósito', value: 'Direção/Propósito' },
      { label: '⚡ Libertação', value: 'Libertação' },
    ],
  },
  {
    id: 'desafio',
    titulo: 'Qual seu maior desafio atual?',
    subtitulo: 'Isso torna as orações ainda mais específicas',
    tipo: 'opcoes',
    opcoes: [
      { label: '💸 Dívidas e problemas financeiros', value: 'Dívidas e problemas financeiros' },
      { label: '💔 Relacionamento ou casamento difícil', value: 'Relacionamento ou casamento difícil' },
      { label: '🏥 Doença ou problema de saúde', value: 'Doença ou problema de saúde' },
      { label: '🤔 Decisão importante sem clareza', value: 'Decisão importante sem clareza' },
      { label: '⚔️ Opressão ou batalha espiritual', value: 'Opressão ou batalha espiritual' },
    ],
  },
  {
    id: 'nivel',
    titulo: 'Qual seu nível espiritual?',
    subtitulo: 'Adaptamos a linguagem e profundidade da oração',
    tipo: 'opcoes',
    opcoes: [
      { label: '🌱 Iniciante — estou voltando pra fé', value: 'Iniciante' },
      { label: '🔥 Intermediário — oro regularmente', value: 'Intermediário' },
      { label: '⚡ Guerreiro(a) — vivo em intercessão', value: 'Guerreiro(a)' },
    ],
  },
  {
    id: 'horario',
    titulo: 'Qual seu horário de vigília?',
    subtitulo: 'O melhor momento para seu encontro diário',
    tipo: 'opcoes',
    opcoes: [
      { label: '🌑 Meia-noite — 00h00', value: 'Meia-noite 00h00' },
      { label: '🌒 Madrugada — 03h00', value: 'Madrugada 03h00' },
      { label: '🌅 Amanhecer — 05h00', value: 'Amanhecer 05h00' },
      { label: '☀️ Manhã — 06h00', value: 'Manhã 06h00' },
    ],
  },
]

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [nomeInput, setNomeInput] = useState('')
  const { update } = useJornada()
  const navigate = useNavigate()

  const total = perguntas.length
  const pergunta = perguntas[step]
  const progresso = ((step + 1) / total) * 100

  const avancar = (valor) => {
    update({ [pergunta.id]: valor })

    if (step < total - 1) {
      setStep(step + 1)
    } else {
      navigate('/resultado')
    }
  }

  const voltar = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Barra de Progresso */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Passo {step + 1} de {total}</span>
          <span>{Math.round(progresso)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Card da Pergunta */}
      <div className="w-full max-w-lg animate-fade-in-up" key={step}>
        <h2 className="font-display text-2xl md:text-3xl text-center font-bold mb-2">
          {pergunta.titulo}
        </h2>
        <p className="text-gray-400 text-center mb-8">{pergunta.subtitulo}</p>

        {/* Campo de nome */}
        {pergunta.tipo === 'input' && (
          <div className="space-y-4">
            <input
              type="text"
              value={nomeInput}
              onChange={(e) => setNomeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && nomeInput.trim()) avancar(nomeInput.trim())
              }}
              placeholder="Digite seu nome..."
              autoFocus
              className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              onClick={() => nomeInput.trim() && avancar(nomeInput.trim())}
              disabled={!nomeInput.trim()}
              className="w-full bg-gold hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed text-dark-900 font-bold py-4 rounded-xl transition-all"
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Opções */}
        {pergunta.tipo === 'opcoes' && (
          <div className="space-y-3">
            {pergunta.opcoes.map((opcao) => (
              <button
                key={opcao.value}
                onClick={() => avancar(opcao.value)}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/50 rounded-xl px-6 py-4 text-lg transition-all hover:scale-[1.02]"
              >
                {opcao.label}
              </button>
            ))}
          </div>
        )}

        {/* Botão Voltar */}
        {step > 0 && (
          <button
            onClick={voltar}
            className="mt-6 text-gray-500 hover:text-gray-300 text-sm transition-colors mx-auto block"
          >
            ← Voltar
          </button>
        )}
      </div>
    </div>
  )
}
