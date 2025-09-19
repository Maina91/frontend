import { createFileRoute } from '@tanstack/react-router'
import LandingPage from '@/core/features/pages/public/LandingPage'

export const Route = createFileRoute('/_public/')({
  component: LandingPage,
})

