import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ============ AUTH ============

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, document, phone } = req.body
  // TODO: hash password, save to DB, create Stripe connected account
  const token = 'jwt_mock_token_' + Date.now()
  res.status(201).json({
    token,
    user: { id: 'user_' + Date.now(), name, email, role: 'merchant' },
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  // TODO: verify password, lookup user in DB
  const isAdmin = email === 'admin@connectpay.com'
  const token = 'jwt_mock_token_' + Date.now()
  res.json({
    token,
    user: {
      id: isAdmin ? 'user_admin' : 'user_merchant',
      name: isAdmin ? 'Admin ConnectPay' : 'Lojista',
      email,
      role: isAdmin ? 'admin' : 'merchant',
    },
  })
})

// ============ STRIPE CONNECT ============

app.post('/api/stripe/create-account', async (req, res) => {
  // TODO: Create Stripe Connected Account
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  // const account = await stripe.accounts.create({
  //   type: 'custom',
  //   country: 'BR',
  //   email: req.body.email,
  //   capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
  //   business_type: 'individual',
  // })
  res.json({ account_id: 'acct_mock_' + Date.now() })
})

app.post('/api/stripe/create-payment-intent', async (req, res) => {
  const { amount, currency, merchant_stripe_id, fee_percentage } = req.body
  // TODO: Create real Stripe PaymentIntent
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  // const feeAmount = Math.round(amount * (fee_percentage / 100))
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: Math.round(amount * 100), // centavos
  //   currency: currency || 'brl',
  //   payment_method_types: ['card'],
  //   application_fee_amount: feeAmount,
  //   transfer_data: { destination: merchant_stripe_id },
  // })
  res.json({
    client_secret: 'pi_mock_secret_' + Date.now(),
    payment_intent_id: 'pi_mock_' + Date.now(),
  })
})

app.post('/api/stripe/create-pix-payment', async (req, res) => {
  const { amount, merchant_stripe_id, fee_percentage } = req.body
  // TODO: Create PIX PaymentIntent
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: Math.round(amount * 100),
  //   currency: 'brl',
  //   payment_method_types: ['pix'],
  //   application_fee_amount: feeAmount,
  //   transfer_data: { destination: merchant_stripe_id },
  // })
  res.json({
    client_secret: 'pi_pix_mock_' + Date.now(),
    pix_code: '00020126580014br.gov.bcb.pix0136mock-uuid-here',
  })
})

// ============ WEBHOOKS STRIPE ============

app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  // TODO: Verify webhook signature and process events
  // const sig = req.headers['stripe-signature']
  // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  //
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     // Update transaction status to approved
  //     // Create reserve entry
  //     // Dispatch merchant webhooks
  //     break
  //   case 'payment_intent.payment_failed':
  //     // Update transaction status to declined
  //     break
  //   case 'charge.dispute.created':
  //     // Create dispute record
  //     // Alert merchant
  //     break
  //   case 'account.updated':
  //     // Update merchant KYC status
  //     break
  //   case 'payout.paid':
  //     // Update payout status to completed
  //     break
  // }

  console.log('Webhook received')
  res.json({ received: true })
})

// ============ ADMIN ENDPOINTS ============

app.get('/api/admin/stats', (req, res) => {
  // TODO: Query real data from DB
  res.json({
    totalVolume: 1548230.50,
    platformRevenue: 77260.23,
    activeMerchants: 156,
    totalTransactions: 12450,
    approvalRate: 92.3,
    chargebackRate: 0.4,
  })
})

app.get('/api/admin/merchants', (req, res) => {
  // TODO: Query from DB with pagination
  res.json({ data: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } })
})

// ============ MERCHANT ENDPOINTS ============

app.get('/api/transactions', (req, res) => {
  // TODO: Query from DB filtered by merchant_id from JWT
  res.json({ data: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } })
})

app.get('/api/balance', (req, res) => {
  // TODO: Calculate real balance from DB
  res.json({ available: 0, pending: 0, reserved: 0 })
})

app.post('/api/payouts', (req, res) => {
  // TODO: Create Stripe payout for connected account
  res.json({ id: 'pay_' + Date.now(), status: 'pending' })
})

app.get('/api/products', (req, res) => {
  // TODO: Query from DB
  res.json({ data: [] })
})

app.post('/api/products', (req, res) => {
  // TODO: Save to DB
  res.status(201).json({ id: 'prod_' + Date.now(), ...req.body })
})

// ============ CHECKOUT ============

app.get('/api/checkout/:slug', (req, res) => {
  // TODO: Lookup checkout link config from DB
  res.json({
    merchant: { name: 'Digital Academy' },
    product: { name: 'Curso de Marketing', price: 297.00 },
    config: { installments: 12, showTimer: true, timerMinutes: 15 },
  })
})

app.post('/api/checkout/pay', async (req, res) => {
  const { checkout_link_id, customer, payment_method, installments } = req.body
  // TODO: Create customer, transaction, PaymentIntent
  res.json({
    client_secret: 'pi_mock_' + Date.now(),
    transaction_id: 'txn_' + Date.now(),
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`ConnectPay API running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})
