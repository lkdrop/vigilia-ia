# API Documentation - Payment Gateway

## Base URL
```
Development: http://localhost:3001/api
Production:  https://seu-dominio.com/api
```

## Autenticacao

### Admin/Merchant (JWT)
```
Authorization: Bearer <jwt_token>
```

### API Publica (Lojistas)
```
X-API-Key: sk_live_...
```

---

## Endpoints Internos (JWT)

### Auth

#### POST /api/auth/register
Criar nova conta.
```json
{
  "name": "Joao Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "document": "123.456.789-00",
  "document_type": "cpf",
  "phone": "11999999999"
}
```
Response: `{ "token": "jwt...", "user": { ... } }`

#### POST /api/auth/login
Login com email e senha.
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```
Response: `{ "token": "jwt...", "user": { ... } }`

#### GET /api/auth/me
Retorna usuario logado (requer JWT).

---

### Merchants (Admin)

#### GET /api/admin/merchants
Lista todos os lojistas. Filtros: `?status=active&page=1&limit=20`

#### GET /api/admin/merchants/:id
Detalhe do lojista.

#### PATCH /api/admin/merchants/:id
Atualizar lojista (taxas, status, etc).

#### POST /api/admin/merchants/:id/suspend
Suspender lojista.

#### POST /api/admin/merchants/:id/block
Bloquear lojista.

---

### Transactions

#### GET /api/transactions
Lista transacoes do lojista logado (ou todas para admin).
Filtros: `?status=approved&method=pix&from=2026-01-01&to=2026-03-14&page=1&limit=20`

#### GET /api/transactions/:id
Detalhe da transacao.

#### POST /api/transactions/:id/refund
Reembolsar transacao.
```json
{
  "reason": "requested_by_customer",
  "amount": 29700  // parcial ou total (omitir para total)
}
```

---

### Products (Lojista)

#### GET /api/products
Lista produtos do lojista.

#### POST /api/products
Criar produto.
```json
{
  "name": "Curso de Marketing",
  "description": "Curso completo...",
  "price": 297.00,
  "currency": "brl",
  "image_url": "https://..."
}
```

#### PATCH /api/products/:id
Atualizar produto.

#### DELETE /api/products/:id
Desativar produto.

---

### Checkout

#### POST /api/checkout/create-payment
Criar pagamento.
```json
{
  "checkout_link_id": "cl_123",
  "customer": {
    "name": "Maria Santos",
    "email": "maria@email.com",
    "document": "123.456.789-00",
    "phone": "11888888888"
  },
  "payment_method": "credit_card",
  "installments": 3,
  "order_bump_ids": ["prod_bump1"]
}
```
Response: `{ "client_secret": "pi_..._secret_...", "transaction_id": "txn_..." }`

---

### Balance (Lojista)

#### GET /api/balance
```json
{
  "available": 15000.00,
  "pending": 3200.00,
  "reserved": 1800.00,
  "total": 20000.00
}
```

---

### Payouts (Saques)

#### GET /api/payouts
Historico de saques.

#### POST /api/payouts
Solicitar saque.
```json
{
  "amount": 5000.00
}
```

---

### Webhooks (Lojista)

#### GET /api/webhooks
Lista webhooks do lojista.

#### POST /api/webhooks
Registrar webhook.
```json
{
  "url": "https://meu-site.com/webhook",
  "events": ["payment.approved", "payment.refunded"]
}
```

#### DELETE /api/webhooks/:id
Remover webhook.

#### GET /api/webhooks/:id/logs
Logs de entrega do webhook.

---

### API Keys (Lojista)

#### GET /api/api-keys
Lista chaves de API.

#### POST /api/api-keys
Gerar nova chave.
```json
{
  "label": "Producao"
}
```
Response: `{ "key": "sk_live_abc123...", "id": "key_123" }`
IMPORTANTE: A chave completa so e mostrada uma vez.

#### DELETE /api/api-keys/:id
Revogar chave.

---

### Checkout Links (Lojista)

#### GET /api/checkout-links
Lista links de checkout.

#### POST /api/checkout-links
Criar link.
```json
{
  "product_id": "prod_123",
  "config": {
    "theme_color": "#8B5CF6",
    "show_timer": true,
    "timer_minutes": 15,
    "order_bump": {
      "product_id": "prod_456",
      "discount_percentage": 30
    },
    "upsell": {
      "product_id": "prod_789"
    }
  }
}
```

---

### Admin Dashboard

#### GET /api/admin/stats
Metricas globais da plataforma.
```json
{
  "total_volume": 1500000.00,
  "platform_revenue": 74925.00,
  "active_merchants": 156,
  "total_transactions": 12450,
  "approval_rate": 92.3,
  "chargeback_rate": 0.4,
  "today": {
    "volume": 45000.00,
    "transactions": 380,
    "revenue": 2247.50
  }
}
```

#### GET /api/admin/stats/chart
Dados para graficos. Filtros: `?period=7d|30d|90d`

#### GET /api/admin/revenue-by-merchant
Faturamento por lojista.

#### GET /api/admin/revenue-by-period
Faturamento por periodo.

#### GET /api/admin/commissions
Comissoes da plataforma.

---

## Webhooks Stripe (Recebidos)

#### POST /api/webhooks/stripe
Endpoint que recebe eventos da Stripe.
Header: `stripe-signature`
Body: raw JSON

---

## Codigos de Status

- 200: Sucesso
- 201: Criado
- 400: Requisicao invalida
- 401: Nao autenticado
- 403: Sem permissao
- 404: Nao encontrado
- 429: Rate limit excedido
- 500: Erro interno

## Paginacao

Todos os endpoints de listagem suportam:
```
?page=1&limit=20
```
Response inclui:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```
