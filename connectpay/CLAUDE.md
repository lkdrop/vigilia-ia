# ConnectPay - Payment Gateway Platform

## Sobre o Projeto

ConnectPay e um sistema de gateway de pagamento white-label estilo CartPanda Pay, MundPay, Hopy Pay e HubFlash Global.
Permite que lojistas se cadastrem, processem pagamentos (cartao, PIX, boleto) e gerenciem transacoes,
tudo usando Stripe Connect como infraestrutura de pagamentos por baixo.

## Stack Tecnologica

- **Frontend:** React 18 + Tailwind CSS + Vite
- **Backend:** Node.js (Express) - pasta /server
- **Banco de dados:** PostgreSQL (Supabase)
- **Pagamentos:** Stripe Connect (Custom accounts)
- **Auth:** JWT (jsonwebtoken + bcrypt)
- **Icones:** Lucide React
- **Graficos:** Recharts
- **Deploy:** Vercel (frontend) + Railway/Render (backend)

## Estrutura do Projeto

```
connectpay/
├── CLAUDE.md                    # Este arquivo - contexto para agentes AI
├── docs/
│   ├── SPEC.md                  # Especificacao completa do sistema
│   ├── DATABASE.md              # Schema do banco de dados
│   ├── API.md                   # Documentacao da API REST
│   ├── STRIPE_INTEGRATION.md    # Guia de integracao Stripe Connect
│   └── UI_REFERENCE.md          # Referencias de design/UI
├── src/                         # Frontend React
│   ├── App.jsx                  # Router principal
│   ├── main.jsx                 # Entry point
│   ├── index.css                # Estilos globais + tema
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Onboarding.jsx
│   │   ├── Checkout.jsx
│   │   ├── admin/               # Paginas do admin
│   │   └── merchant/            # Paginas do lojista
│   ├── components/
│   │   ├── ui/                  # Button, Input, Card, Badge, Table, Modal
│   │   ├── layout/              # Sidebar, Header
│   │   ├── charts/              # Graficos
│   │   └── checkout/            # PaymentForm, OrderBump, Upsell
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── formatters.js
│   │   └── constants.js
│   └── data/                    # Mock data para dev sem backend
│       └── mockData.js
├── server/                      # Backend Express
│   ├── index.js
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── db/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .env.example
└── .gitignore
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
JWT_SECRET=uma-chave-secreta-forte-aqui

# App
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
PORT=3001
```

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Rodar frontend (Vite, porta 5173)
npm run server       # Rodar backend (Express, porta 3001)
npm run build        # Build de producao
```

## Arquitetura de Pagamentos

```
Cliente Final → Checkout (frontend)
    → Stripe Payment Intent (backend cria)
    → Stripe processa o pagamento
    → Webhook confirma sucesso
    → Split: plataforma fica com application_fee
    → Lojista recebe na connected account
```

## Roles/Papeis

1. **Admin** - Dono da plataforma. Ve tudo, gerencia lojistas, configura taxas
2. **Merchant (Lojista)** - Se cadastra, cria produtos, processa pagamentos
3. **Customer (Cliente final)** - Compra via checkout (sem cadastro)

## Design/UI

- Tema escuro com acentos em roxo/violeta (#8B5CF6)
- Sidebar colapsavel com icones (Lucide React)
- Cards com glassmorphism sutil
- Graficos com Recharts
- Mobile-first, responsivo
- Font: Inter
- Referencia visual: HubFlash Global, CartPanda, AppMax

## Notas para Agentes AI

- Projeto independente (nao faz parte do Vigilia IA)
- Sempre usar modo teste da Stripe (sk_test_, pk_test_)
- Nunca commitar .env ou chaves de API
- Dados mock em src/data/mockData.js para desenvolvimento sem backend
- Frontend usa React Router DOM v6
- Tailwind CSS com tema customizado
- Icones: sempre usar lucide-react
- Formatacao de moeda: sempre BRL com Intl.NumberFormat
