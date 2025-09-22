// src/core/features/pages/dashboard/DashboardIndexPage.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowLeftRight, ArrowDown, ArrowUp } from "lucide-react"



const mockTransactions = [
  { date: "2025-09-15", type: "Top-up", amount: 2000 },
  { date: "2025-09-12", type: "Interest", amount: 180 },
  { date: "2025-09-10", type: "Withdraw", amount: -1000 },
]

export function IndexPage() {
  return (
    <div className="space-y-6">
      {/* 🚀 Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Button className="flex flex-col h-20 justify-center">
            <ArrowDown className="h-5 w-5 mb-1" /> Top-up
          </Button>
          <Button className="flex flex-col h-20 justify-center" variant="secondary">
            <ArrowUp className="h-5 w-5 mb-1" /> Withdraw
          </Button>
          <Button className="flex flex-col h-20 justify-center" variant="outline">
            <ArrowLeftRight className="h-5 w-5 mb-1" /> Transfer
          </Button>
          <Button className="flex flex-col h-20 justify-center" variant="outline">
            <Wallet className="h-5 w-5 mb-1" /> Switch Fund
          </Button>
                 </div>
      </section>

      {/* 📊 My Investment */}
      <section>
        <h2 className="text-xl font-semibold mb-3">My Investment</h2>
        <Card>
          <CardHeader>
            <CardTitle>Money Market Fund - KES</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>Minimum Investment: <strong>KES 100</strong></li>
              <li>Lock-in Period: <strong>None</strong></li>
              <li>Effective Annual Yield: <strong>12.06%</strong></li>
              <li>Annualized Daily Yield: <strong>11.39%</strong></li>
            </ul>
            <Button className="mt-4">Open New Account</Button>
          </CardContent>
        </Card>
      </section>

      {/* 🧾 Recent Activities */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
        <Card>
          <CardContent className="divide-y">
            {mockTransactions.map((tx, i) => (
              <div key={i} className="flex justify-between py-2">
                <span className="text-sm">{tx.date}</span>
                <span className="text-sm">{tx.type}</span>
                <span
                  className={`text-sm font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {tx.amount > 0 ? `+KES ${tx.amount}` : `-KES ${Math.abs(tx.amount)}`}
                </span>
              </div>
            ))}
            <div className="text-right pt-2">
              <Button variant="link" size="sm">View All</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 📦 Products */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Our Products</h2>
        <Card>
          <CardHeader>
            <CardTitle>Money Market Fund - KES</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>Minimum Investment: <strong>KES 100</strong></li>
              <li>Lock-in Period: <strong>None</strong></li>
              <li>Effective Annual Yield: <strong>12.06%</strong></li>
              <li>Annualized Daily Yield: <strong>11.39%</strong></li>
            </ul>
            <Button className="mt-4">Open New Account</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
