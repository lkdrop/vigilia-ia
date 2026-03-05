// Servidor local para desenvolvimento (alternativa ao vercel dev)
// Executa a API de geração de orações localmente
// Uso: node server.js (em outro terminal, junto com npm run dev)

import http from 'node:http'

const PORT = 3001

async function handleRequest(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  if (req.url === '/api/generate-prayer' && req.method === 'POST') {
    let body = ''
    for await (const chunk of req) body += chunk

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY não definida. Execute: set ANTHROPIC_API_KEY=sk-ant-...' }))
    }

    const { nome, dia, semana, temaSemana, area, desafio, denominacao, nivel } = JSON.parse(body)

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
        res.writeHead(response.status, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
          error: errData?.error?.message || `Erro da API: ${response.status}`,
        }))
      }

      const data = await response.json()
      const oracao = data.content?.[0]?.text || ''

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ oracao }))
    } catch (err) {
      console.error('Error:', err.message)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ error: 'Erro interno do servidor' }))
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
}

const server = http.createServer(handleRequest)
server.listen(PORT, () => {
  console.log(`\n🕯️  Vigília IA — API Server`)
  console.log(`   Rodando em http://localhost:${PORT}`)
  console.log(`   Endpoint: POST /api/generate-prayer\n`)
})
