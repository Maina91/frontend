import { useState } from 'react'
import { Bell, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export const Topbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    // Fake user data (later load from session or API)
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '/avatars/user-1.png',
    }

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            {/* Left section (can be page title or search bar later) */}
            <div className="font-semibold text-lg text-gray-800">
                Dashboard
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                {/* Notification bell */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>

                {/* User dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline text-sm font-medium text-gray-700">
                            {user.name}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg">
                            <div className="px-4 py-2 text-sm text-gray-600">
                                Signed in as <br />
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <hr />
                            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Profile
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Settings
                            </button>
                            <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
