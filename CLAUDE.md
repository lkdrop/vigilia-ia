# Projeto: Payment Gateway Platform

## Sobre o Projeto

Sistema de gateway de pagamento white-label estilo CartPanda Pay, MundPay, Hopy Pay e HubFlash Global.
Permite que lojistas se cadastrem, processem pagamentos (cartao, PIX, boleto) e gerenciem transacoes,
tudo usando Stripe Connect como infraestrutura de pagamentos por baixo.

## Stack Tecnologica

- **Frontend:** React 18 + Tailwind CSS + Vite
- **Backend:** Node.js (Express)
- **Banco de dados:** PostgreSQL (Supabase)
- **Pagamentos:** Stripe Connect (Custom accounts)
- **Auth:** JWT (jsonwebtoken + bcrypt)
- **Deploy:** Vercel (frontend) + Railway/Render (backend)

## Estrutura do Projeto

```
/
├── CLAUDE.md                    # Este arquivo - contexto para agentes AI
├── docs/
│   ├── SPEC.md                  # Especificacao completa do sistema
│   ├── DATABASE.md              # Schema do banco de dados
│   ├── API.md                   # Documentacao da API REST
│   ├── STRIPE_INTEGRATION.md    # Guia de integracao Stripe Connect
│   └── UI_REFERENCE.md          # Referencias de design/UI
├── src/                         # Frontend React
│   ├── pages/                   # Paginas da aplicacao
│   ├── components/              # Componentes reutilizaveis
│   ├── layouts/                 # Layouts (AdminLayout, MerchantLayout)
│   ├── context/                 # React Context (Auth, Theme)
│   ├── hooks/                   # Custom hooks
│   ├── services/                # API calls (axios/fetch)
│   ├── utils/                   # Funcoes utilitarias
│   └── data/                    # Dados estaticos/mock
├── api/                         # Backend (serverless functions ou Express)
│   ├── auth/                    # Endpoints de autenticacao
│   ├── merchants/               # CRUD de lojistas
│   ├── transactions/            # Transacoes
│   ├── webhooks/                # Webhooks Stripe
│   ├── checkout/                # Checkout/pagamentos
│   └── admin/                   # Endpoints administrativos
├── server.js                    # Servidor de desenvolvimento
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

## Variaveis de Ambiente (.env)

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (Supabase)
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# Auth
JWT_SECRET=...

# App
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Rodar frontend (Vite) + backend
npm run build        # Build de producao
npm run preview      # Preview do build
```

## Arquitetura de Pagamentos

```
Cliente Final → Checkout (seu frontend)
    → Stripe Payment Intent (backend cria)
    → Stripe processa o pagamento
    → Webhook confirma sucesso
    → Split: plataforma fica com application_fee
    → Lojista recebe na connected account
```

## Roles/Papeis

1. **Admin** - Dono da plataforma. Ve tudo, gerencia lojistas, configura taxas
2. **Merchant (Lojista)** - Se cadastra, cria produtos, processa pagamentos
3. **Customer (Cliente final)** - Compra via checkout (sem cadastro necessario)

## Fluxo de Onboarding do Lojista

1. Lojista se registra na plataforma
2. Sistema cria Connected Account na Stripe (Custom)
3. Lojista preenche dados (KYC via Stripe)
4. Stripe verifica automaticamente
5. Conta ativada → pode processar pagamentos

## Design/UI

- Tema escuro com acentos em roxo/violeta (#8B5CF6)
- Sidebar colapsavel com icones
- Cards com glassmorphism sutil
- Graficos com Recharts ou Chart.js
- Mobile-first, responsivo
- Referencia visual: HubFlash Global, CartPanda, AppMax

## Integracao Stripe Connect

- Tipo de conta: Custom (controle total, white-label)
- application_fee_amount em cada PaymentIntent
- Webhooks: payment_intent.succeeded, charge.dispute.created, account.updated, payout.paid
- Pre-chargeback: Verifi RDR + Ethoca Alerts (ativar no Stripe Dashboard)

## Notas para Agentes AI

- O projeto originalmente era "Vigilia IA" (app de oracoes). O gateway de pagamento esta sendo adicionado como feature/modulo separado
- Sempre rodar em modo teste da Stripe (sk_test_, pk_test_)
- Nunca commitar .env ou chaves de API
- Branch de desenvolvimento: claude/payment-gateway-stripe-J0OP1
- O frontend usa React Router DOM para rotas
- Tailwind CSS esta configurado no tailwind.config.js
