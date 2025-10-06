import { useCustomerProfile } from '@/core/hooks/customer/use-profile'
import { useState, useEffect, useRef } from 'react'
import { Bell, ChevronDown, Menu } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { logoutAction } from '@/core/actions/auth/auth'
import { toast } from 'sonner'
import clsx from 'clsx'
import { clearSession } from '@/core/actions/auth/session'


interface TopbarProps {
    onSidebarToggle?: () => void
}

export const Topbar = ({ onSidebarToggle }: TopbarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { data: profile, isLoading, isError } = useCustomerProfile()

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return logoutAction()
        },
        onSuccess: (res) => {
            toast.success(res.message || 'Logged out successfully')
            clearSession()
            router.navigate({ to: '/login' })
        },
        onError: () => {
            toast.success('Logged out successfully')
            clearSession()
            router.navigate({ to: '/login' })
        },
    })

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    return (
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white border-b shadow-sm z-50 sticky top-0">
            {/* Left: Mobile toggle + greeting */}
            <div className="flex items-center gap-3">
                {onSidebarToggle && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden mr-2"
                        onClick={onSidebarToggle}
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </Button>
                )}

                <div className="hidden sm:flex flex-col">
                    <span className="text-xs text-gray-500">Welcome</span>
                    <span
                        className={clsx(
                            'font-semibold text-gray-800 text-sm sm:text-base',
                            isLoading && 'bg-gray-200 rounded w-24 h-5 animate-pulse'
                        )}
                    >
                        {!isLoading ? profile?.full_name ?? 'To your dashboard' : ''}
                    </span>
                </div>
            </div>

            {/* Right: Notifications + avatar dropdown */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gray-100 rounded-full transition-colors duration-150"
                >
                    <Bell className="w-5 h-5 text-gray-600 transition-transform duration-150 group-hover:scale-110" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </Button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        className={clsx(
                            'flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 transition',
                            isLoading ? 'animate-pulse' : 'shadow-sm'
                        )}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={isLoading || isError}
                    >
                        <Avatar className="h-9 w-9">
                            {profile?.full_name ? (
                                <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
                            ) : (
                                <AvatarFallback>U</AvatarFallback>
                            )}
                        </Avatar>
                        <ChevronDown
                            className={clsx(
                                'w-4 h-4 text-gray-500 transition-transform duration-200',
                                isDropdownOpen && 'rotate-180'
                            )}
                        />
                    </button>

                    {isDropdownOpen && profile && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 animate-fadeIn">
                            <div className="px-4 py-3 border-b bg-gray-50">
                                <p className="text-xs text-gray-500">Signed in as</p>
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {profile.email_address}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <button className="px-4 py-2 text-left text-sm hover:bg-gray-100 transition">
                                    Profile
                                </button>
                                <button className="px-4 py-2 text-left text-sm hover:bg-gray-100 transition">
                                    Settings
                                </button>
                                <button
                                    onClick={() => logoutMutation.mutate()}
                                    disabled={logoutMutation.isPending}
                                    className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
                                >
                                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
