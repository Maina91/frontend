import { Outlet } from '@tanstack/react-router'
import { Sidebar } from '@/core/features/pages/dashboard/Sidebar'
import { Topbar } from '@/core/features/pages/dashboard/header'

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <div className="flex flex-1 flex-col">
                {/* Topbar (optional) */}
                <Topbar />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
