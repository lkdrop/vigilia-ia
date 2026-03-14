# Guia de Integracao Stripe Connect

## Prerequisitos

1. Conta Stripe ativa (pode ser nova)
2. Stripe Connect ativado no Dashboard
3. Chaves de API (test mode para desenvolvimento)

## Configuracao Inicial

### 1. Criar conta Stripe
- Acesse https://dashboard.stripe.com/register
- Complete o cadastro

### 2. Ativar Connect
- No Dashboard, va em Settings > Connect
- Ative o Connect
- Escolha "Platform or Marketplace"

### 3. Obter chaves de API
```
Dashboard > Developers > API Keys
- Publishable key: pk_test_...
- Secret key: sk_test_...
```

### 4. Configurar Webhook
```
Dashboard > Developers > Webhooks > Add endpoint
- URL: https://seu-dominio.com/api/webhooks/stripe
- Eventos:
  - payment_intent.succeeded
  - payment_intent.payment_failed
  - charge.dispute.created
  - charge.dispute.closed
  - charge.refunded
  - account.updated
  - payout.paid
  - payout.failed
```

## Fluxos Principais

### Criar Connected Account (Lojista)

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Criar conta Custom
const account = await stripe.accounts.create({
  type: 'custom',
  country: 'BR',
  email: merchant.email,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: 'individual', // ou 'company'
  business_profile: {
    mcc: '5818', // Digital goods
    url: merchant.website,
  },
});

// Salvar account.id no banco (stripe_account_id)
```

### Criar Payment Intent (Cobranca)

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 29700, // R$ 297,00 em centavos
  currency: 'brl',
  payment_method_types: ['card'],
  application_fee_amount: 1482, // R$ 14,82 (taxa plataforma)
  transfer_data: {
    destination: 'acct_LOJISTA123', // connected account
  },
  metadata: {
    transaction_id: 'txn_123',
    product_id: 'prod_456',
    merchant_id: 'merch_789',
  },
});
```

### Criar Cobranca PIX

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 29700,
  currency: 'brl',
  payment_method_types: ['pix'],
  application_fee_amount: 1482,
  transfer_data: {
    destination: 'acct_LOJISTA123',
  },
});

// O client_secret retornado gera o QR Code no frontend
// via Stripe.js
```

### Criar Cobranca Boleto

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 29700,
  currency: 'brl',
  payment_method_types: ['boleto'],
  payment_method_options: {
    boleto: {
      expires_after_days: 3,
    },
  },
  application_fee_amount: 1482,
  transfer_data: {
    destination: 'acct_LOJISTA123',
  },
});
```

### Processar Webhook

```javascript
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Marcar transacao como aprovada
      // Criar reserva financeira
      // Disparar webhooks do lojista
      break;
    case 'payment_intent.payment_failed':
      // Marcar transacao como falha
      break;
    case 'charge.dispute.created':
      // Registrar chargeback
      // Alertar lojista
      break;
    case 'account.updated':
      // Atualizar status KYC do lojista
      break;
    case 'payout.paid':
      // Confirmar saque enviado
      break;
  }

  res.json({ received: true });
});
```

### Solicitar Saque (Payout)

```javascript
const payout = await stripe.payouts.create(
  {
    amount: 10000, // R$ 100,00
    currency: 'brl',
  },
  {
    stripeAccount: 'acct_LOJISTA123', // connected account
  }
);
```

### Reembolsar Transacao

```javascript
const refund = await stripe.refunds.create({
  payment_intent: 'pi_ABC123',
  reason: 'requested_by_customer',
});
```

## Pre-Chargeback

### Ativar Verifi RDR + Ethoca
1. Stripe Dashboard > Settings > Disputes
2. Ativar "Dispute prevention"
3. Configurar regras de auto-resolucao
4. Nao precisa de codigo - e configuracao no Dashboard

### Reserva Financeira (implementar no backend)
```javascript
// Apos payment_intent.succeeded:
const reserveAmount = transaction.amount * (merchant.reserve_percentage / 100);
const releaseDate = new Date();
releaseDate.setDate(releaseDate.getDate() + merchant.reserve_days);

await db.reserves.create({
  merchant_id: merchant.id,
  transaction_id: transaction.id,
  amount: reserveAmount,
  status: 'held',
  release_date: releaseDate,
});
```

## Taxas Stripe (Brasil)

- Cartao de credito: 3.49% + R$ 0.39
- PIX: 0.50% (max R$ 5.00)
- Boleto: R$ 3.49
- Connect fee: +0.25% por transacao com connected account
- Disputas: R$ 75.00 por chargeback

## Modo Teste

Cartoes de teste:
- Aprovado: 4242 4242 4242 4242
- Recusado: 4000 0000 0000 0002
- 3D Secure: 4000 0000 0000 3220
- Disputa: 4000 0000 0000 0259

PIX teste:
- Qualquer pagamento PIX em test mode e aprovado automaticamente

## Links Uteis

- Stripe Connect Docs: https://docs.stripe.com/connect
- Stripe API Reference: https://docs.stripe.com/api
- Stripe.js Elements: https://docs.stripe.com/js
- Stripe CLI (testing): https://docs.stripe.com/stripe-cli
- Stripe Dashboard: https://dashboard.stripe.com
