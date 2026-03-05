export const semanasData = {
  'Finanças': [
    { semana: 1, tema: 'Arrependimento e limpeza financeira' },
    { semana: 2, tema: 'Declarações de provisão' },
    { semana: 3, tema: 'Decretos de colheita' },
  ],
  'Família': [
    { semana: 1, tema: 'Cura e perdão' },
    { semana: 2, tema: 'Restauração' },
    { semana: 3, tema: 'Unidade e amor' },
  ],
  'Saúde': [
    { semana: 1, tema: 'Quebra de enfermidade' },
    { semana: 2, tema: 'Cura e força' },
    { semana: 3, tema: 'Gratidão' },
  ],
  'Direção/Propósito': [
    { semana: 1, tema: 'Escuta espiritual' },
    { semana: 2, tema: 'Clareza do chamado' },
    { semana: 3, tema: 'Ativação' },
  ],
  'Libertação': [
    { semana: 1, tema: 'Identificação' },
    { semana: 2, tema: 'Quebra de correntes' },
    { semana: 3, tema: 'Consolidação' },
  ],
}

export const areaEmojis = {
  'Finanças': '💰',
  'Família': '❤️',
  'Saúde': '🏥',
  'Direção/Propósito': '🎯',
  'Libertação': '⚡',
}

export function getSemana(dia) {
  if (dia <= 7) return 1
  if (dia <= 14) return 2
  return 3
}

export function getTemaSemana(area, semanaNum) {
  const semanas = semanasData[area]
  if (!semanas) return ''
  const found = semanas.find((s) => s.semana === semanaNum)
  return found ? found.tema : ''
}
