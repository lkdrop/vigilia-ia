# Database Schema - Payment Gateway

## Visao Geral

Banco: PostgreSQL (Supabase recomendado)
ORM: Prisma ou queries diretas com pg

## Diagrama de Relacionamentos

```
users 1──N merchants
merchants 1──N products
merchants 1──N transactions
merchants 1──N payouts
merchants 1──N webhooks
merchants 1──N api_keys
merchants 1──N checkout_links
merchants 1──N disputes
merchants 1──N reserves

transactions N──1 customers
transactions N──1 products
transactions 1──N splits
transactions 1──N disputes
transactions 1──N reserves

webhooks 1──N webhook_logs
checkout_links N──1 products
```

## Schema SQL Completo

```sql
-- Extensoes
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipos ENUM
CREATE TYPE user_role AS ENUM ('admin', 'merchant');
CREATE TYPE merchant_status AS ENUM ('pending', 'active', 'suspended', 'blocked');
CREATE TYPE stripe_status AS ENUM ('pending', 'reviewing', 'verified', 'rejected');
CREATE TYPE document_type AS ENUM ('cpf', 'cnpj');
CREATE TYPE transaction_status AS ENUM ('pending', 'approved', 'declined', 'refunded', 'chargeback');
CREATE TYPE payment_method AS ENUM ('credit_card', 'pix', 'boleto');
CREATE TYPE split_recipient AS ENUM ('platform', 'merchant', 'affiliate');
CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'won', 'lost');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE reserve_status AS ENUM ('held', 'released');

-- Tabelas
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'merchant',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  document VARCHAR(20) NOT NULL,
  document_type document_type NOT NULL,
  phone VARCHAR(20),
  website VARCHAR(255),
  business_type VARCHAR(100),
  stripe_account_id VARCHAR(255),
  stripe_status stripe_status DEFAULT 'pending',
  status merchant_status DEFAULT 'pending',
  fee_percentage DECIMAL(5,2) DEFAULT 4.99,
  reserve_percentage DECIMAL(5,2) DEFAULT 10.00,
  reserve_days INTEGER DEFAULT 90,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  document VARCHAR(20),
  phone VARCHAR(20),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'brl',
  image_url VARCHAR(500),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id),
  customer_id UUID REFERENCES customers(id),
  product_id UUID REFERENCES products(id),
  amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) DEFAULT 0,
  net DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'brl',
  status transaction_status DEFAULT 'pending',
  payment_method payment_method NOT NULL,
  installments INTEGER DEFAULT 1,
  stripe_payment_intent_id VARCHAR(255),
  stripe_charge_id VARCHAR(255),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE splits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  recipient_type split_recipient NOT NULL,
  recipient_id VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  percentage DECIMAL(5,2),
  stripe_transfer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  merchant_id UUID NOT NULL REFERENCES merchants(id),
  reason VARCHAR(255),
  status dispute_status DEFAULT 'open',
  amount DECIMAL(10,2) NOT NULL,
  stripe_dispute_id VARCHAR(255),
  evidence_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id),
  amount DECIMAL(10,2) NOT NULL,
  fee DECIMAL(10,2) DEFAULT 0,
  net DECIMAL(10,2) NOT NULL,
  status payout_status DEFAULT 'pending',
  stripe_payout_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  events TEXT[] NOT NULL,
  active BOOLEAN DEFAULT true,
  secret VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webhook_id UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
  event VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  status_code INTEGER,
  response TEXT,
  delivered BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE checkout_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  slug VARCHAR(100) UNIQUE NOT NULL,
  config JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  key_hash VARCHAR(255) NOT NULL,
  key_prefix VARCHAR(12) NOT NULL,
  label VARCHAR(100),
  active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reserves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  amount DECIMAL(10,2) NOT NULL,
  status reserve_status DEFAULT 'held',
  release_date DATE NOT NULL,
  released_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices
CREATE INDEX idx_merchants_user_id ON merchants(user_id);
CREATE INDEX idx_merchants_status ON merchants(status);
CREATE INDEX idx_transactions_merchant_id ON transactions(merchant_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_stripe_pi ON transactions(stripe_payment_intent_id);
CREATE INDEX idx_disputes_merchant_id ON disputes(merchant_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_payouts_merchant_id ON payouts(merchant_id);
CREATE INDEX idx_reserves_merchant_id ON reserves(merchant_id);
CREATE INDEX idx_reserves_release_date ON reserves(release_date);
CREATE INDEX idx_reserves_status ON reserves(status);
CREATE INDEX idx_checkout_links_slug ON checkout_links(slug);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_customers_email ON customers(email);
```

## Queries Uteis

### Metricas do Admin Dashboard
```sql
-- Volume total e receita
SELECT
  SUM(amount) as total_volume,
  SUM(fee) as platform_revenue,
  COUNT(*) as total_transactions,
  AVG(amount) as avg_ticket,
  COUNT(CASE WHEN status = 'approved' THEN 1 END)::FLOAT /
    NULLIF(COUNT(*), 0) * 100 as approval_rate,
  COUNT(CASE WHEN status = 'chargeback' THEN 1 END)::FLOAT /
    NULLIF(COUNT(*), 0) * 100 as chargeback_rate
FROM transactions
WHERE created_at >= NOW() - INTERVAL '30 days';
```

### Saldo do Lojista
```sql
-- Disponivel (aprovado - saques - reserva retida)
SELECT
  COALESCE(SUM(CASE WHEN t.status = 'approved' THEN t.net ELSE 0 END), 0)
  - COALESCE((SELECT SUM(amount) FROM payouts WHERE merchant_id = $1 AND status IN ('pending','processing','completed')), 0)
  - COALESCE((SELECT SUM(amount) FROM reserves WHERE merchant_id = $1 AND status = 'held'), 0)
  as available
FROM transactions t
WHERE t.merchant_id = $1;
```
