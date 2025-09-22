import { useCustomerProfile } from '@/core/hooks/customer/useCustomerProfile'
import { useState } from 'react'
import { Bell, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { logoutAction } from '@/core/actions/auth/auth'
import { SessionClient } from '@/core/lib/session.client'
import { toast } from 'sonner'
import clsx from 'clsx'

export const Topbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { data: profile, isLoading, isError } = useCustomerProfile()

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const token = SessionClient.getToken()
            if (!token) throw new Error('No active session')
            return logoutAction({ data: { token } })
        },
        onSuccess: (res) => {
            SessionClient.clear()
            toast.success(res.message || 'Logged out successfully')
            router.navigate({ to: '/login' })
        },
        onError: () => {
            SessionClient.clear()
            toast.success('Logged out successfully')
            router.navigate({ to: '/login' })
        },
    })

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-md">
            {/* Left section: Avatar + Welcome */}
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    {isLoading || !profile?.full_name ? (
                        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                    ) : (
                        <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
                    )}
                </Avatar>

                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Welcome</span>
                    <span
                        className={clsx(
                            'font-semibold text-lg text-gray-800 transition-colors duration-150',
                            isLoading && 'bg-gray-200 rounded w-24 h-5 animate-pulse'
                        )}
                    >
                        {!isLoading ? profile?.first_name ?? 'To your dashboard' : ''}
                    </span>
                </div>
            </div>

            {/* Right section: Notifications + Dropdown */}
            <div className="flex items-center gap-4">
                {/* Notification bell */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative group hover:bg-gray-100 rounded-full transition-colors duration-150"
                >
                    <Bell className="h-5 w-5 text-gray-600 transition-transform duration-150 group-hover:scale-110" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </Button>

                {/* User dropdown */}
                <div className="relative">
                    <button
                        className={clsx(
                            'flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 transition-shadow duration-150',
                            isLoading ? 'animate-pulse shadow-inner' : 'shadow-sm'
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                        disabled={isLoading || isError}
                    >
                        <Avatar className="h-8 w-8">
                            {profile?.full_name ? (
                                <AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
                            ) : (
                                <AvatarFallback>U</AvatarFallback>
                            )}
                        </Avatar>

                        <span
                            className={clsx(
                                'hidden md:inline text-sm font-medium text-gray-700',
                                isLoading && 'bg-gray-200 rounded w-20 h-4'
                            )}
                        >
                            {!isLoading && profile?.full_name}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && profile && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg z-50 animate-fadeIn overflow-hidden">
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
