import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { SessionClient } from '@/core/lib/session.client'
import { Sidebar } from '@/components/ui/sidebar'

export const Route = createFileRoute('/dashboard/__layout')({
  beforeLoad: ({ location }) => {
    const token = SessionClient.getToken()
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      }) 
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* <Topbar /> */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet /> {/* Child routes render here */}
        </main>
      </div>
    </div>
  )
}
