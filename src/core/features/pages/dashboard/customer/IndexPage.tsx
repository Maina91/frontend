// src/core/features/pages/dashboard/DashboardIndexPage.tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ArrowLeftRight, ArrowDown, ArrowUp } from "lucide-react"
import { useProducts } from "@/core/hooks/customer/use-products"



const mockTransactions = [
  { date: "2025-09-15", type: "Top-up", amount: 2000 },
  { date: "2025-09-12", type: "Interest", amount: 180 },
  { date: "2025-09-10", type: "Withdraw", amount: -1000 },
]

export function IndexPage() {
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts()


  console.log('ProductsData', productsData)  



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

        {productsLoading && (
          <div className="space-y-3 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-32 w-full bg-gray-200 rounded"></div>
            <div className="h-32 w-full bg-gray-200 rounded"></div>
          </div>
        )}

        {productsError && (
          <Card>
            <CardContent className="p-4 text-red-600 text-sm">
              Failed to load products. Please try again later.
            </CardContent>
          </Card>
        )}

        {!productsLoading && !productsError && (
          <>
            {productsData?.securities?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productsData.securities.map((product) => (
                  <Card key={product.security_code}>
                    <CardHeader>
                      <CardTitle>{product.fund_name}</CardTitle>
                      {product.fund_description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {product.fund_description}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-1">
                        <li>
                          Minimum Investment:{" "}
                          <strong>
                            {product.minimum_investment
                              ? `KES ${product.minimum_investment}`
                              : "N/A"}
                          </strong>
                        </li>
                        <li>
                          Effective Annual Yield:{" "}
                          <strong>
                            {product.annual_yield
                              ? `${product.annual_yield.toFixed(2)}%`
                              : "N/A"}
                          </strong>
                        </li>
                        <li>
                          Risk Profile:{" "}
                          <strong>{product.risk_profile ?? "N/A"}</strong>
                        </li>
                        <li>
                          Trustee:{" "}
                          <strong>{product.fund_trustee ?? "N/A"}</strong>
                        </li>
                      </ul>
                      <Button className="mt-4 w-full">Open New Account</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-4 text-sm text-muted-foreground">
                  No products available at the moment.
                </CardContent>
              </Card>
            )}
          </>
        )}
      </section>

    </div>
  )
}
