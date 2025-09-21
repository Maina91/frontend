import { createFileRoute } from '@tanstack/react-router'
import { InvestmentPage } from '@/core/features/pages/dashboard/InvestmentPage'

export const Route = createFileRoute('/dashboard/investments')({
  component: InvestmentPage,
})

