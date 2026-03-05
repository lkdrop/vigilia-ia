export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no servidor' })
  }

  const { nome, dia, semana, temaSemana, area, desafio, denominacao, nivel } = req.body

  if (!nome || !dia || !area) {
    return res.status(400).json({ error: 'Dados incompletos' })
  }

  const systemPrompt = `Você é um intercessor profético ungido, com profundo conhecimento bíblico. Gere orações proféticas personalizadas em português brasileiro. Sempre cite versículos REAIS da Bíblia. Tom: profético, ungido, poderoso, específico para a situação da pessoa. Use o nome da pessoa. Seja declarativo e cheio de fé.`

  const userPrompt = `Gere uma oração profética para ${nome}, DIA ${dia} de 21, Semana ${semana} — ${temaSemana}. Área: ${area} | Desafio: ${desafio} | Denominação: ${denominacao} | Nível: ${nivel}

Estruture EXATAMENTE assim:

📖 VERSÍCULO DO DIA:
[versículo real completo com referência]

🔥 PALAVRA PROFÉTICA:
[2-3 linhas — o que Deus está falando hoje para esta pessoa]

🙏 ORAÇÃO PERSONALIZADA:
[8-10 linhas usando o nome da pessoa, específica, ungida e poderosa]

⚡ DECRETO FINAL:
[2-3 decretos em primeira pessoa, voz ativa e vitoriosa]`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      console.error('Anthropic API error:', errData)
      return res.status(response.status).json({
        error: errData?.error?.message || `Erro da API Anthropic: ${response.status}`,
      })
    }

    const data = await response.json()
    const oracao = data.content?.[0]?.text || ''

    return res.status(200).json({ oracao })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Erro interno do servidor' })
  }
}
