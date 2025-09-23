import { useCustomerProfile } from '@/core/hooks/customer/use-profile'
import { useState } from 'react'
import { Bell, ChevronDown, Menu } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { logoutAction } from '@/core/actions/auth/auth'
import { SessionClient } from '@/core/lib/session.client'
import { toast } from 'sonner'
import clsx from 'clsx'

interface TopbarProps {
    onSidebarToggle?: () => void
}

export const Topbar = ({ onSidebarToggle }: TopbarProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter()
    const { data: profile, isLoading, isError } = useCustomerProfile()

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const token = SessionClient.getAuthToken()
            if (!token) throw new Error('No active session')
            return logoutAction({ data: { token } })
        },
        onSuccess: (res) => {
            SessionClient.clearAll()
            toast.success(res.message || 'Logged out successfully')
            router.navigate({ to: '/login' })
        },
        onError: () => {
            SessionClient.clearAll()
            toast.success('Logged out successfully')
            router.navigate({ to: '/login' })
        },
    })

    return (
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-white border-b shadow-md z-50 sticky top-0">
            {/* Left: Mobile toggle + avatar */}
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

                <Avatar className="h-10 w-10">
                    {isLoading || !profile?.full_name ? (
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                        <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
                    )}
                </Avatar>
                <div className="hidden sm:flex flex-col">
                    <span className="text-xs text-gray-500">Welcome</span>
                    <span
                        className={clsx(
                            'font-semibold text-gray-800 text-sm sm:text-base',
                            isLoading && 'bg-gray-200 rounded w-24 h-5 animate-pulse'
                        )}
                    >
                        {!isLoading ? profile?.first_name ?? 'To your dashboard' : ''}
                    </span>
                </div>
            </div>

            {/* Right: Notifications + dropdown */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gray-100 rounded-full transition-colors duration-150"
                >
                    <Bell className="w-5 h-5 text-gray-600 transition-transform duration-150 group-hover:scale-110" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </Button>

                <div className="relative">
                    <button
                        className={clsx(
                            'flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-shadow duration-150',
                            isLoading ? 'animate-pulse shadow-inner' : 'shadow-sm'
                        )}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={isLoading || isError}
                    >
                        <Avatar className="h-8 w-8">
                            {profile?.full_name ? (
                                <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
                            ) : (
                                <AvatarFallback>U</AvatarFallback>
                            )}
                        </Avatar>
                        <span className="hidden md:inline text-sm font-medium text-gray-700">
                            {!isLoading && profile?.full_name}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {isDropdownOpen && profile && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50 overflow-hidden animate-fadeIn">
                            <div className="px-4 py-2 text-sm text-gray-600">
                                Signed in as <br />
                                <span className="font-medium">{profile.email_address}</span>
                            </div>
                            <hr className="border-gray-200" />
                            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition">
                                Profile
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition">
                                Settings
                            </button>
                            <button
                                onClick={() => logoutMutation.mutate()}
                                disabled={logoutMutation.isPending}
                                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
                            >
                                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
