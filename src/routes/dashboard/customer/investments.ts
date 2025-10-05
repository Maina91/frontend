import { createFileRoute } from '@tanstack/react-router'
import { InvestmentPage } from '@/core/features/pages/dashboard/customer/InvestmentPage'

export const Route = createFileRoute('/dashboard/customer/investments')({
  component: InvestmentPage,
})

