import { useState } from 'react'
import { Outlet, useRouteContext } from '@tanstack/react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './header'
import { clearSession } from '@/core/actions/auth/session'



export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // check for user /agent
    const { session } = useRouteContext({ from: '/dashboard' })
    const role = session.user?.role as "CUSTOMER" | "AGENT" 

    // logout if no role is available
    if (!role) {
        return clearSession()
    }

    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">

            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                role={role}
            />

            <div className="flex flex-1 flex-col transition-all duration-300">

                <Topbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}
