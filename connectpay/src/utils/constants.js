export const TRANSACTION_STATUS = {
  pending: { label: 'Pendente', color: 'warning', bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  approved: { label: 'Aprovado', color: 'success', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  declined: { label: 'Recusado', color: 'error', bg: 'bg-red-500/10', text: 'text-red-500' },
  refunded: { label: 'Reembolsado', color: 'info', bg: 'bg-blue-500/10', text: 'text-blue-500' },
  chargeback: { label: 'Chargeback', color: 'error', bg: 'bg-red-500/10', text: 'text-red-500' },
}

export const MERCHANT_STATUS = {
  pending: { label: 'Pendente', bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  active: { label: 'Ativo', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  suspended: { label: 'Suspenso', bg: 'bg-orange-500/10', text: 'text-orange-500' },
  blocked: { label: 'Bloqueado', bg: 'bg-red-500/10', text: 'text-red-500' },
}

export const PAYMENT_METHODS = {
  credit_card: { label: 'Cartao', icon: 'CreditCard' },
  pix: { label: 'PIX', icon: 'QrCode' },
  boleto: { label: 'Boleto', icon: 'FileText' },
}

export const DISPUTE_STATUS = {
  open: { label: 'Aberta', bg: 'bg-red-500/10', text: 'text-red-500' },
  under_review: { label: 'Em analise', bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  won: { label: 'Ganha', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  lost: { label: 'Perdida', bg: 'bg-red-500/10', text: 'text-red-500' },
}

export const PAYOUT_STATUS = {
  pending: { label: 'Pendente', bg: 'bg-yellow-500/10', text: 'text-yellow-500' },
  processing: { label: 'Processando', bg: 'bg-blue-500/10', text: 'text-blue-500' },
  completed: { label: 'Concluido', bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  failed: { label: 'Falhou', bg: 'bg-red-500/10', text: 'text-red-500' },
}
