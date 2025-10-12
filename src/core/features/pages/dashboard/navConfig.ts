import { BarChart2, Home, LineChart, Ticket, User } from 'lucide-react'


export const navConfig = {
    shared: [
        // { to: "/dashboard", label: "Dashboard", icon: Home },
    ],
    customer: [
        { to: '/dashboard/customer/', label: 'Dashboard', icon: Home },
        { to: "/dashboard/customer/investments", label: "Investments", icon: LineChart },
        { to: "/dashboard/customer/profile", label: "Profile", icon: User },
    ],
    agent: [
        { to: '/dashboard/agent/', label: 'Dashboard', icon: Home },
        { to: "/dashboard/agent/profile", label: "Profile", icon: User },
        
        { to: "/dashboard/agent/metrics", label: "Metrics", icon: BarChart2 },
        { to: "/dashboard/agent/tickets", label: "Tickets", icon: Ticket },
    ],
}