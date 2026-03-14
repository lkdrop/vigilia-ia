# UI Reference - Payment Gateway

## Design System

### Paleta de Cores

```css
/* Background */
--bg-primary: #0F0F1A;      /* Fundo principal */
--bg-secondary: #1A1A2E;    /* Cards, sidebar */
--bg-tertiary: #16213E;     /* Hover, inputs */
--bg-elevated: #1E1E32;     /* Modais, dropdowns */

/* Accent */
--accent-primary: #8B5CF6;   /* Roxo - botoes, links, badges */
--accent-hover: #7C3AED;     /* Roxo hover */
--accent-light: #A78BFA;     /* Roxo claro */
--accent-bg: rgba(139, 92, 246, 0.1); /* Background com accent */

/* Status */
--success: #06D6A0;          /* Verde - aprovado, ativo */
--success-bg: rgba(6, 214, 160, 0.1);
--warning: #F59E0B;          /* Amarelo - pendente, alerta */
--warning-bg: rgba(245, 158, 11, 0.1);
--error: #EF4444;            /* Vermelho - falha, bloqueado */
--error-bg: rgba(239, 68, 68, 0.1);
--info: #3B82F6;             /* Azul - informacao */
--info-bg: rgba(59, 130, 246, 0.1);

/* Texto */
--text-primary: #FFFFFF;
--text-secondary: #A0A0B8;
--text-muted: #6B6B80;

/* Bordas */
--border: #2A2A3E;
--border-hover: #3A3A4E;

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #8B5CF6, #6366F1);
--gradient-success: linear-gradient(135deg, #06D6A0, #059669);
--gradient-card: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(99, 102, 241, 0.05));
```

### Tipografia

```css
/* Font family */
font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, sans-serif;

/* Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Espacamento e Border Radius

```css
/* Border radius */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
--shadow-glow: 0 0 20px rgba(139, 92, 246, 0.15);
```

---

## Layout Structure

### Sidebar (Referencia HubFlash)

```
┌──────────────────────────────────────────────────┐
│  [Logo]  NomePay    [Badge: Admin]    [Avatar]   │
├──────────┬───────────────────────────────────────│
│          │                                       │
│  ☰ Menu  │   Conteudo principal                  │
│          │                                       │
│ ┌──────┐ │   ┌─────────┐  ┌─────────┐           │
│ │Admin │ │   │ Card    │  │ Card    │           │
│ │      │ │   │ Metrica │  │ Metrica │           │
│ │ Dash │ │   └─────────┘  └─────────┘           │
│ │ Solic│ │                                       │
│ │ Empre│ │   ┌─────────────────────────┐         │
│ │ Trans│ │   │                         │         │
│ │ Transf│ │   │    Grafico             │         │
│ │ Antec│ │   │                         │         │
│ │ Usuar│ │   └─────────────────────────┘         │
│ │ Fatur│ │                                       │
│ │ Comis│ │   ┌─────────────────────────┐         │
│ │ Lucro│ │   │    Tabela               │         │
│ │      │ │   │    (transacoes)         │         │
│ ├──────┤ │   │                         │         │
│ │W.Lab │ │   └─────────────────────────┘         │
│ │Config│ │                                       │
│ │Regras│ │                                       │
│ └──────┘ │                                       │
│          │                                       │
└──────────┴───────────────────────────────────────┘
```

### Sidebar - Itens do Menu

**Admin:**
- Dashboard (icone: LayoutDashboard)
- Solicitacoes Gateway (icone: FileCheck)
- Todas as empresas (icone: Building2)
- Todas as transacoes (icone: ArrowLeftRight)
- Todas as transferencias (icone: Send)
- Todas as antecipacoes (icone: Clock)
- Todos os usuarios (icone: Users)
- Faturamento por empresa (icone: BarChart3)
- Faturamento por periodo (icone: Calendar)
- Comissoes por periodo (icone: Coins)
- Lucro por empresa (icone: TrendingUp)

**White Label:**
- Configuracoes (icone: Settings)
- Regras de pagamento (icone: Shield)

**Lojista:**
- Overview (icone: LayoutDashboard)
- Transacoes (icone: ArrowLeftRight)
- Saldo e Saques (icone: Wallet)
- Produtos (icone: Package)
- Links de Checkout (icone: Link)
- Clientes (icone: Users)
- Disputas (icone: AlertTriangle)
- Webhooks (icone: Webhook)
- API Keys (icone: Key)
- Configuracoes (icone: Settings)

---

## Componentes

### Cards de Metrica

```
┌────────────────────────────┐
│  ↑ 12.5%                   │
│                            │
│  R$ 45.230,00              │  (numero grande, bold)
│  Volume hoje               │  (label, text-secondary)
│                            │
│  ░░░░░░░░░░░░ sparkline    │
└────────────────────────────┘
```

Cores do indicador:
- ↑ Verde = crescimento
- ↓ Vermelho = queda
- → Amarelo = estavel

### Status Badges

```
[● Aprovado]   → verde com bg verde transparente
[● Pendente]   → amarelo com bg amarelo transparente
[● Recusado]   → vermelho com bg vermelho transparente
[● Chargeback] → vermelho com bg vermelho transparente
[● Reembolsado]→ azul com bg azul transparente
```

### Tabela de Transacoes

```
┌──────┬──────────────┬──────────┬────────┬──────────┬──────────┐
│ ID   │ Cliente      │ Valor    │ Metodo │ Status   │ Data     │
├──────┼──────────────┼──────────┼────────┼──────────┼──────────┤
│ #001 │ Maria Santos │ R$297,00 │ 💳 Card│ ●Aprovado│ 14/03/26 │
│ #002 │ Joao Lima    │ R$147,00 │ PIX    │ ●Pendente│ 14/03/26 │
│ #003 │ Ana Costa    │ R$497,00 │ 💳 Card│ ●Recusad│ 13/03/26 │
└──────┴──────────────┴──────────┴────────┴──────────┴──────────┘
```

- Linhas com hover effect (bg ligeiramente mais claro)
- Clicavel → abre detalhe
- Filtros no topo: periodo, status, metodo de pagamento

### Checkout Page

```
┌─────────────────────────────────────────────────┐
│              [Logo do Lojista]                   │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │  📦 Curso de Marketing Digital              │ │
│  │  R$ 297,00                                  │ │
│  │  ou 12x de R$ 24,75                         │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  Nome completo  ________________________________ │
│  Email          ________________________________ │
│  CPF            ________________________________ │
│  Telefone       ________________________________ │
│                                                  │
│  ┌─ Order Bump ──────────────────────────────┐   │
│  │ ☑ Adicionar e-book por apenas +R$ 27,00   │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  [💳 Cartao]  [PIX]  [Boleto]                    │
│                                                  │
│  Numero do cartao  _____________________________ │
│  Validade  ___________  CVV  ___________________ │
│  Parcelas  [12x de R$ 24,75 ▼]                   │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │         🔒 PAGAR R$ 324,00                  │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  🔒 Pagamento seguro via Stripe                  │
│  Seus dados estao protegidos                     │
└─────────────────────────────────────────────────┘
```

---

## Icones

Usar Lucide React (https://lucide.dev) - mesma biblioteca usada pelos gateways de referencia.

```bash
npm install lucide-react
```

Icones principais:
- LayoutDashboard, BarChart3, TrendingUp
- ArrowLeftRight, Send, Clock
- Building2, Users, FileCheck
- Wallet, Package, Link, Key
- Shield, Settings, AlertTriangle
- CreditCard, QrCode, FileText (boleto)
- Search, Filter, Download, Plus
- ChevronDown, ChevronRight, X, Check
- Eye, EyeOff, Copy, ExternalLink

---

## Animacoes

- Transicoes: 200ms ease
- Hover em cards: translateY(-2px) + shadow
- Sidebar collapse: width transition 300ms
- Modais: fade in + scale 95%→100%
- Loading: skeleton pulse animation
- Numeros: count-up animation nos cards de metrica

---

## Responsividade

- Mobile: sidebar vira drawer (overlay)
- Tablet: sidebar colapsada (so icones)
- Desktop: sidebar expandida

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

---

## Gateways de Referencia Visual

1. **HubFlash Global** (app.hubflashglobal.com.br)
   - Sidebar branca/clara com secoes colapsaveis
   - Badge "Administrador" em roxo
   - Menu items com bullet point ativo
   - Layout limpo e espaçado

2. **CartPanda** (cartpanda.com)
   - Checkout one-page com order bump integrado
   - Dashboard com metricas em cards
   - Sidebar escura

3. **AppMax** (appmax.com.br)
   - Dashboard moderno com graficos destacados
   - Cores vibrantes nos indicadores
   - Interface clean

4. **Cakto** (cakto.com.br)
   - Interface minimalista
   - Foco em dados financeiros
   - Tabelas bem formatadas

5. **Lastlink** (lastlink.com)
   - Dashboard colorido
   - Cards com gradientes
   - UX friendly
