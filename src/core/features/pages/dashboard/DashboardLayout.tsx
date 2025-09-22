import { useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './header'

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Main content */}
            <div className="flex flex-1 flex-col transition-all duration-300">
                {/* Topbar */}
                <Topbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
