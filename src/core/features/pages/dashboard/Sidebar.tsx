import { Link } from '@tanstack/react-router'

export const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-4 text-xl font-bold">MMF Dashboard</div>
            <nav className="flex-1 px-2 space-y-1">
                <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-800">
                    Dashboard
                </Link>
                <Link to="/dashboard/investments" className="block px-3 py-2 rounded hover:bg-gray-800">
                    Investments
                </Link>
                <Link to="/dashboard/profile" className="block px-3 py-2 rounded hover:bg-gray-800">
                    Profile
                </Link>
            </nav>
        </aside>
    )
}