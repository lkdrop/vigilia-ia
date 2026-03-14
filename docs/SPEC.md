# Especificacao Completa - Payment Gateway Platform

## Visao Geral

Sistema de gateway de pagamento white-label que permite lojistas processarem pagamentos
online usando Stripe Connect como infraestrutura. Inspirado em CartPanda Pay, MundPay,
Hopy Pay e HubFlash Global.

---

## 1. LANDING PAGE (/)

Pagina publica de marketing do gateway.

- Hero section com CTA "Crie sua conta gratis"
- Secao de beneficios (taxas competitivas, antifraude, aprovacao alta)
- Secao "Como funciona" (3 passos: cadastre, integre, receba)
- Tabela de taxas transparente
- FAQ
- Footer com links legais

---

## 2. AUTENTICACAO

### Login (/login)
- Email + senha
- "Esqueci minha senha"
- Link para registro

### Registro (/register)
- Nome completo
- Email
- Senha + confirmacao
- CPF ou CNPJ
- Telefone
- Aceite dos termos
- Verificacao de email (opcional MVP)

### Esqueci Senha (/forgot-password)
- Input de email
- Envio de link de reset

---

## 3. ONBOARDING DO LOJISTA (/onboarding)

Processo de verificacao via Stripe Connect (Custom accounts).

### Step 1: Dados da empresa
- Nome da empresa / marca
- CNPJ (ou CPF se pessoa fisica)
- Tipo de negocio (infoproduto, e-commerce, SaaS, servicos)
- URL do site (opcional)

### Step 2: Dados do responsavel
- Nome completo
- CPF
- Data de nascimento
- Endereco completo
- Upload de documento (RG, CNH ou passaporte)

### Step 3: Dados bancarios
- Banco
- Agencia
- Conta corrente
- Tipo (PF ou PJ)

### Step 4: Verificacao
- Stripe faz KYC automaticamente
- Status: Pendente → Em analise → Aprovado → Ativo
- Webhook account.updated para atualizar status

---

## 4. DASHBOARD DO ADMIN

O admin e o dono da plataforma (voce). Ve tudo, gerencia lojistas.

### 4.1 Dashboard (/admin)
Metricas globais:
- Volume total processado (hoje/semana/mes/total)
- Receita da plataforma (soma das application_fees)
- Numero de lojistas ativos
- Numero de transacoes
- Taxa media de aprovacao (%)
- Taxa media de chargeback (%)
- Graficos de tendencia (linha/barra)

### 4.2 Solicitacoes Gateway (/admin/requests)
- Lista de lojistas pendentes de aprovacao
- Botao aprovar/rejeitar
- Detalhes do lojista

### 4.3 Todas as Empresas (/admin/merchants)
- Lista de todos os lojistas com filtros
- Status (ativo, pendente, suspenso, bloqueado)
- Volume processado
- Taxa de chargeback
- Acoes: ver detalhes, suspender, bloquear

### 4.4 Detalhe da Empresa (/admin/merchants/:id)
- Dados cadastrais
- Stripe Account ID
- Transacoes do lojista
- Saldo (disponivel, pendente, reserva)
- Taxa de chargeback
- Historico de disputas
- Acoes: editar taxas, suspender, bloquear

### 4.5 Todas as Transacoes (/admin/transactions)
- Lista com filtros (data, status, metodo, lojista)
- Status: aprovada, pendente, recusada, reembolsada, chargeback
- Metodo: cartao, PIX, boleto
- Exportar CSV

### 4.6 Todas as Transferencias (/admin/transfers)
- Repasses para lojistas
- Status: pendente, processando, concluida, falha
- Filtros por data e lojista

### 4.7 Todas as Antecipacoes (/admin/anticipations)
- Solicitacoes de antecipacao de recebiveis
- Status e valores

### 4.8 Todos os Usuarios (/admin/users)
- Lista de usuarios da plataforma
- Roles (admin, merchant)
- Status

### 4.9 Faturamento por Empresa (/admin/revenue-by-merchant)
- Tabela com faturamento de cada lojista
- Filtro por periodo

### 4.10 Faturamento por Periodo (/admin/revenue-by-period)
- Grafico e tabela de faturamento por periodo
- Filtros: diario, semanal, mensal

### 4.11 Comissoes por Periodo (/admin/commissions)
- Quanto a plataforma ganhou em taxas
- Filtro por periodo

### 4.12 Lucro por Empresa (/admin/profit-by-merchant)
- Lucro liquido da plataforma por lojista
- Considera taxas cobradas vs custos Stripe

### 4.13 White Label - Configuracoes (/admin/white-label)
- Logo da plataforma
- Cores do tema
- Nome do gateway
- Dominio customizado

### 4.14 White Label - Regras de Pagamento (/admin/payment-rules)
- Taxas padrao para novos lojistas
- Limites de transacao
- Metodos de pagamento habilitados
- Regras de reserva (% e periodo)

---

## 5. DASHBOARD DO LOJISTA

### 5.1 Overview (/dashboard)
Metricas do lojista:
- Faturamento (hoje/semana/mes)
- Numero de vendas
- Taxa de aprovacao (%)
- Taxa de chargeback (%)
- Ticket medio
- Saldo disponivel / pendente / reserva
- Grafico de vendas (ultimos 7/30 dias)

### 5.2 Transacoes (/dashboard/transactions)
- Lista com filtros (data, status, metodo, valor)
- Detalhe da transacao ao clicar
- Exportar CSV

### 5.3 Detalhe da Transacao (/dashboard/transactions/:id)
- Dados do pagamento
- Dados do cliente
- Status timeline
- Acoes: reembolsar

### 5.4 Saldo e Saques (/dashboard/balance)
- Saldo disponivel
- Saldo pendente
- Saldo em reserva (retido)
- Historico de saques
- Botao "Solicitar saque"

### 5.5 Produtos (/dashboard/products)
- CRUD de produtos (nome, preco, descricao, imagem)
- Status (ativo/inativo)
- Link de checkout por produto

### 5.6 Links de Checkout (/dashboard/checkout-links)
- Gerar link de pagamento para produto
- Personalizar (cores, logo)
- Copiar link
- QR Code

### 5.7 Clientes (/dashboard/customers)
- Lista de compradores
- Historico de compras por cliente
- Total gasto

### 5.8 Disputas (/dashboard/disputes)
- Chargebacks abertos
- Status da disputa
- Evidencias enviadas
- Resultado

### 5.9 Configuracoes (/dashboard/settings)
- Dados da empresa
- Dados bancarios
- Taxas aplicadas
- Notificacoes

### 5.10 API Keys (/dashboard/api-keys)
- Gerar chave de API
- Listar chaves ativas
- Revogar chave
- Documentacao inline

### 5.11 Webhooks (/dashboard/webhooks)
- Registrar URL de webhook
- Selecionar eventos
- Log de entregas
- Teste manual

---

## 6. CHECKOUT (/pay/:checkout_id)

Pagina publica de pagamento. O cliente final acessa para comprar.

### Layout
- Mobile-first, responsivo
- Customizavel (cores e logo do lojista)
- One-page
- Timer de urgencia (opcional)

### Dados do Produto
- Nome, preco, imagem, descricao
- Quantidade
- Cupom de desconto

### Formulario do Comprador
- Nome completo
- Email
- CPF
- Telefone

### Metodos de Pagamento
- **Cartao de credito** (Stripe Elements)
  - Numero, validade, CVV
  - Parcelamento (ate 12x)
- **PIX**
  - Gera QR Code + codigo copia-e-cola
  - Timer de 30 minutos
  - Confirmacao automatica via webhook
- **Boleto**
  - Gera PDF para download
  - Vencimento em 3 dias uteis
  - Confirmacao via webhook

### Order Bump
- Oferta extra entre o formulario e o botao de pagar
- 1 clique para adicionar
- Configuravel por produto

### Pos-Compra
- Pagina de "Processando..."
- Pagina de sucesso
  - Upsell (1-click, sem re-digitar dados)
  - Downsell (se recusar upsell)
  - Pagina de obrigado final
- Pagina de falha (com botao retry)

---

## 7. SISTEMA DE SPLIT / COMISSOES

### Configuracao
- Por produto: definir % ou valor fixo por participante
- Participantes: plataforma, produtor, afiliado(s)

### Exemplo de split
```
Produto: R$ 297,00
├── Plataforma: 4.99% = R$ 14,82 (application_fee)
├── Produtor: 85% = R$ 252,45 (connected account)
└── Afiliado: 10.01% = R$ 29,73 (transfer separado)
```

### Stripe Connect Implementation
- application_fee_amount no PaymentIntent (taxa da plataforma)
- transfer_data.destination (conta do lojista)
- Transfers separados para afiliados

---

## 8. ANTIFRAUDE

### Camada 1: Stripe Radar (automatico)
- Machine learning em cada transacao
- Score de risco

### Camada 2: 3D Secure
- Autenticacao adicional do cartao
- Reduz chargebacks de fraude

### Camada 3: Regras customizaveis
- Bloquear por pais
- Bloquear por valor maximo
- Bloquear por velocidade (X compras em Y minutos)
- Blacklist de CPF/email
- Alertas para transacoes suspeitas

---

## 9. PRE-CHARGEBACK

### Verifi RDR (Visa)
- Auto-resolve disputas antes de virar chargeback
- Configurar regras no Stripe Dashboard
- Disputas resolvidas NAO contam na taxa

### Ethoca Alerts (Mastercard)
- Notifica 24-72h antes do chargeback
- Permite reembolsar preventivamente

### Order Insights (Visa)
- Mostra detalhes da compra no app do banco do cliente
- Previne disputas por "nao reconheco"

### Reserva Financeira
- Reter X% de cada transacao por 90 dias
- Usar para cobrir chargebacks
- Liberar automaticamente apos periodo

---

## 10. API PUBLICA (Para lojistas)

### Autenticacao
- API Key no header: `X-API-Key: sk_live_...`
- Rate limit: 100 req/min

### Endpoints
```
POST   /api/v1/charges           # Criar cobranca
GET    /api/v1/charges/:id       # Consultar cobranca
POST   /api/v1/charges/:id/refund # Reembolsar
GET    /api/v1/transactions      # Listar transacoes
GET    /api/v1/balance           # Consultar saldo
POST   /api/v1/payouts           # Solicitar saque
POST   /api/v1/customers         # Criar cliente
GET    /api/v1/customers/:id     # Consultar cliente
POST   /api/v1/webhooks          # Registrar webhook
GET    /api/v1/products          # Listar produtos
POST   /api/v1/products          # Criar produto
POST   /api/v1/checkout-links    # Criar link de checkout
```

### Webhooks (eventos disponiveis para lojistas)
```
payment.created
payment.approved
payment.declined
payment.refunded
payment.chargeback
payout.created
payout.completed
subscription.renewed
```

---

## 11. WEBHOOKS STRIPE (Backend escuta)

Eventos que o backend precisa processar:

```
payment_intent.succeeded       → Marcar transacao como aprovada
payment_intent.payment_failed  → Marcar como falha
charge.dispute.created         → Registrar chargeback
charge.dispute.closed          → Atualizar status disputa
charge.refunded                → Registrar reembolso
account.updated                → Status KYC do lojista
payout.paid                    → Confirmar saque enviado
payout.failed                  → Alertar falha no saque
```

---

## 12. BANCO DE DADOS

### Tabelas principais

```sql
-- Usuarios da plataforma (admins e lojistas)
users (
  id UUID PK,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  name VARCHAR,
  role ENUM('admin', 'merchant'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Lojistas (connected accounts)
merchants (
  id UUID PK,
  user_id UUID FK → users,
  company_name VARCHAR,
  document VARCHAR, -- CPF ou CNPJ
  document_type ENUM('cpf', 'cnpj'),
  phone VARCHAR,
  stripe_account_id VARCHAR,
  stripe_status ENUM('pending', 'reviewing', 'verified', 'rejected'),
  status ENUM('pending', 'active', 'suspended', 'blocked'),
  fee_percentage DECIMAL, -- taxa cobrada deste lojista
  reserve_percentage DECIMAL, -- % de reserva
  reserve_days INTEGER, -- dias de retencao
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Produtos
products (
  id UUID PK,
  merchant_id UUID FK → merchants,
  name VARCHAR,
  description TEXT,
  price DECIMAL,
  currency VARCHAR DEFAULT 'brl',
  image_url VARCHAR,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Transacoes
transactions (
  id UUID PK,
  merchant_id UUID FK → merchants,
  customer_id UUID FK → customers,
  product_id UUID FK → products,
  amount DECIMAL,
  fee DECIMAL, -- taxa da plataforma
  net DECIMAL, -- valor liquido pro lojista
  currency VARCHAR DEFAULT 'brl',
  status ENUM('pending', 'approved', 'declined', 'refunded', 'chargeback'),
  payment_method ENUM('credit_card', 'pix', 'boleto'),
  installments INTEGER DEFAULT 1,
  stripe_payment_intent_id VARCHAR,
  stripe_charge_id VARCHAR,
  metadata JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Clientes (compradores)
customers (
  id UUID PK,
  email VARCHAR,
  name VARCHAR,
  document VARCHAR, -- CPF
  phone VARCHAR,
  stripe_customer_id VARCHAR,
  created_at TIMESTAMP
)

-- Splits de pagamento
splits (
  id UUID PK,
  transaction_id UUID FK → transactions,
  recipient_type ENUM('platform', 'merchant', 'affiliate'),
  recipient_id VARCHAR, -- stripe account id ou platform
  amount DECIMAL,
  percentage DECIMAL,
  stripe_transfer_id VARCHAR,
  created_at TIMESTAMP
)

-- Disputas/Chargebacks
disputes (
  id UUID PK,
  transaction_id UUID FK → transactions,
  merchant_id UUID FK → merchants,
  reason VARCHAR,
  status ENUM('open', 'under_review', 'won', 'lost'),
  amount DECIMAL,
  stripe_dispute_id VARCHAR,
  evidence_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  resolved_at TIMESTAMP
)

-- Saques
payouts (
  id UUID PK,
  merchant_id UUID FK → merchants,
  amount DECIMAL,
  fee DECIMAL DEFAULT 0,
  net DECIMAL,
  status ENUM('pending', 'processing', 'completed', 'failed'),
  stripe_payout_id VARCHAR,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
)

-- Webhooks dos lojistas
webhooks (
  id UUID PK,
  merchant_id UUID FK → merchants,
  url VARCHAR,
  events TEXT[], -- array de eventos
  active BOOLEAN DEFAULT true,
  secret VARCHAR, -- para assinatura
  created_at TIMESTAMP
)

-- Log de webhook
webhook_logs (
  id UUID PK,
  webhook_id UUID FK → webhooks,
  event VARCHAR,
  payload JSONB,
  status_code INTEGER,
  response TEXT,
  delivered BOOLEAN,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP
)

-- Links de checkout
checkout_links (
  id UUID PK,
  merchant_id UUID FK → merchants,
  product_id UUID FK → products,
  slug VARCHAR UNIQUE,
  config JSONB, -- cores, upsell, order bump, timer
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
)

-- API Keys dos lojistas
api_keys (
  id UUID PK,
  merchant_id UUID FK → merchants,
  key_hash VARCHAR, -- hash da chave
  key_prefix VARCHAR, -- primeiros 8 chars para identificacao
  label VARCHAR,
  active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP
)

-- Reserva financeira
reserves (
  id UUID PK,
  merchant_id UUID FK → merchants,
  transaction_id UUID FK → transactions,
  amount DECIMAL,
  status ENUM('held', 'released'),
  release_date DATE,
  released_at TIMESTAMP,
  created_at TIMESTAMP
)
```

---

## 13. FLUXO DE DINHEIRO

```
Cliente paga R$ 100,00
├── Stripe processa (taxa Stripe ~3.49% + R$0.39) = R$3.88
├── Plataforma fica (application_fee ~4.99%) = R$4.99
├── Afiliado recebe (split) = R$10.00 (10%)
└── Lojista recebe (liquido) = R$81.13

Reserva: 10% retido por 90 dias = R$8.11
Lojista recebe imediato: R$73.02
Apos 90 dias: +R$8.11 liberado
```

---

## 14. FASES DE IMPLEMENTACAO

### FASE 1 - MVP (prioridade)
- [x] Documentacao do projeto
- [ ] Auth (login/registro)
- [ ] Onboarding lojista (Stripe Connect)
- [ ] Checkout basico (cartao + PIX)
- [ ] Dashboard lojista (transacoes + saldo)
- [ ] Dashboard admin (metricas + lojistas)
- [ ] Webhooks Stripe

### FASE 2 - Crescimento
- [ ] Split de pagamentos / afiliados
- [ ] Order bump + upsell no checkout
- [ ] Sistema de webhooks para lojistas
- [ ] API publica basica
- [ ] Boleto
- [ ] Exportar CSV

### FASE 3 - Maturidade
- [ ] Pre-chargeback (Verifi + Ethoca)
- [ ] Antifraude avancado (regras custom)
- [ ] Checkout customizavel (cores, layout)
- [ ] Subscriptions/recorrencia
- [ ] Multi-moeda
- [ ] White-label configuracoes
- [ ] App mobile (opcional)

---

## 15. REFERENCIAS VISUAIS

Gateways usados como referencia de design:
- HubFlash Global (sidebar escura, badges de role, filtros)
- CartPanda Pay (checkout one-page, order bump)
- MundPay (checkout inteligente, upsell 1-click)
- Hopy Pay (white-label, dashboard limpo)
- AppMax (dashboard moderno, graficos)
- Cakto (interface minimalista)
- Lastlink (dashboard colorido)

### Paleta de Cores
- Background: #0F0F1A (escuro) / #1A1A2E (cards)
- Accent primario: #8B5CF6 (roxo/violeta)
- Accent secundario: #06D6A0 (verde sucesso)
- Texto: #FFFFFF (primario) / #A0A0B8 (secundario)
- Erro: #EF4444 (vermelho)
- Warning: #F59E0B (amarelo)
- Border: #2A2A3E

### Tipografia
- Font: Inter ou Plus Jakarta Sans
- Headings: 600-700 weight
- Body: 400-500 weight
