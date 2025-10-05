import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import clsx from 'clsx'
import { logoutAction } from '@/core/actions/auth/auth'
import { toast } from 'sonner'
import { navConfig } from './navConfig'


interface SidebarProps {
    isOpen: boolean
    onToggle?: () => void
    role: string
}

export const Sidebar = ({ isOpen, onToggle, role }: SidebarProps) => {
    const router = useRouter()
    const routerState = useRouterState()

    const normalizedRole = role?.toUpperCase() ?? ""
    const navItems = [
        ...navConfig.shared,
        ...(normalizedRole.includes("CUSTOMER") ? navConfig.customer : []),
        ...(normalizedRole.includes("AGENT") ? navConfig.agent : []),
    ]
    

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return logoutAction()
        },
        onSuccess: (res) => {
            toast.success(res.message || 'Logged out successfully')
            router.navigate({ to: '/login' })
        },
        onError: () => {
            toast.success('Logged out successfully')
            router.navigate({ to: '/login' })
        },
    })

    const handleNavClick = () => {
        // Close sidebar on mobile after clicking menu
        if (onToggle && window.innerWidth < 768) onToggle()
    }

    return (
        <>
            <aside
                className={clsx(
                    'fixed top-0 left-0 h-full w-64 bg-gray-900 text-white border-r border-gray-800 flex flex-col transition-transform duration-300 z-40',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                    'md:translate-x-0 md:static md:flex-shrink-0'
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-gray-800 font-bold text-lg tracking-wide">
                    Investment Capital
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map(({ to, label, icon: Icon }) => {
                        const isActive = routerState.location.pathname.startsWith(to)
                        return (
                            <Link
                                key={to}
                                to={to}
                                onClick={handleNavClick}
                                className={clsx(
                                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                                    isActive
                                        ? 'bg-gray-800 text-white shadow-inner'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        disabled={logoutMutation.isPending}
                        onClick={() => logoutMutation.mutate()}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        {logoutMutation.isPending ? 'Logging out…' : 'Logout'}
                    </button>
                </div>
            </aside>

            {isOpen && onToggle && (
                <div
                    onClick={onToggle}
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                />
            )}
        </>
    )
}