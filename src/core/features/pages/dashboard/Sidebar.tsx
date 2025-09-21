import { Link, useRouterState } from '@tanstack/react-router'
import {
    Home,
    LineChart,
    User,
    LogOut,
} from 'lucide-react'
import clsx from 'clsx'

export const Sidebar = () => {
    const router = useRouterState()

    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: Home },
        { to: '/dashboard/investments', label: 'Investments', icon: LineChart },
        { to: '/dashboard/profile', label: 'Profile', icon: User },
    ]

    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-gray-800">
                <span className="text-lg font-bold tracking-wide">Investment Capital</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => {
                    const isActive = router.location.pathname === to
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer actions */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={() => {
                        // TODO: hook into your logout flow
                        console.log('Logout clicked')
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}
