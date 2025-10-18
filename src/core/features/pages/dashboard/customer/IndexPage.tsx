import { useState } from 'react'
import { ArrowDown, ArrowLeftRight, ArrowUp, Wallet, } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProducts } from "@/core/hooks/customer/use-products"
import { usePendingWithdrawals, useTransactions } from '@/core/hooks/customer/use-transactions'
import { TransactionsTable } from '@/core/features/tables/TransactionsTable'
import { PendingWithdrawalsTable } from "@/core/features/tables/PendingWithdrawalsTable"
import { TopupModal } from '@/core/features/modals/TopupModal'


const INITIAL_COUNT = 5
const PAGE_SIZE = 5


export function IndexPage() {
  const [selectedAccount, setSelectedAccount] = useState<string>("")
  const [transactionsCount, setTransactionsCount] = useState<number>(INITIAL_COUNT)
  const [withdrawalCount, setWithdrawalCount] = useState<number>(INITIAL_COUNT)

  const [isTopupOpen, setIsTopupOpen] = useState(false)


  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts()
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useTransactions(selectedAccount)
  const { data: pendingWithdrawals, isLoading: pendingWithdrawalsLoading, error: pendingWithdrawalsError } =
    usePendingWithdrawals(selectedAccount)

  const handleAccountChange = (account: string) => {
    setSelectedAccount(account)
    setTransactionsCount(INITIAL_COUNT)
    setWithdrawalCount(INITIAL_COUNT)
  }

  const handleShowMoreTransactions = () =>
    setTransactionsCount((prev) => prev + PAGE_SIZE)

  const handleShowLessTransactions = () =>
    setTransactionsCount(INITIAL_COUNT)

  const handleShowMoreWithdrawals = () =>
    setWithdrawalCount((prev) => prev + PAGE_SIZE)

  const handleShowLessWithdrawals = () =>
    setWithdrawalCount(INITIAL_COUNT)

  const transactionList = transactions?.transactions ?? []
  const totalTransactions = transactionList.length
  const hasMoreTransactions = transactionsCount < totalTransactions
  const hasLessTransactions = transactionsCount > INITIAL_COUNT

  const pendingList = pendingWithdrawals?.transactions ?? []
  const totalPending = pendingList.length
  const hasMorePending = withdrawalCount < totalPending
  const hasLessPending = withdrawalCount > INITIAL_COUNT

  console.log('Products', productsData)
  console.log('Transactions', transactions)
  console.log('Pending Withdrawals', pendingWithdrawals)


  return (
    <div className="space-y-6">
      {/* 🚀 Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Button className="flex flex-col h-20 justify-center"
            onClick={() => setIsTopupOpen(true)}
          >
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

      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>

        <div className="mb-3">
          <Select
            value={selectedAccount}
            onValueChange={(value) => {
              setSelectedAccount(value)
            }}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Account</SelectItem>
              <SelectItem value="00040-000414-0002-0">00040-000414-0002-0</SelectItem>
              <SelectItem value="00040-1-000414-0001-2">00040-1-000414-0001-2</SelectItem>
              <SelectItem value="00040-1-000414-0002">00040-1-000414-0002</SelectItem>
              <SelectItem value="00040-001-000414-0001-1">00040-001-000414-0001-1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!selectedAccount && (
          <p className="text-sm text-gray-500 italic">
            Please select an account to view your transactions.
          </p>
        )}

        {selectedAccount && (
          <>
            {transactionsLoading && <p className="text-sm text-gray-500">Loading...</p>}
            {transactionsError && (
              <p className="text-sm text-red-500">{transactionsError.message}</p>
            )}
            {!transactionsLoading && totalTransactions === 0 && (
              <p className="text-sm text-gray-500">No transactions found.</p>
            )}

            {totalTransactions > 0 && (
              <>
                <TransactionsTable data={transactionList.slice(0, transactionsCount)} />

                <div className="flex justify-end space-x-2 pt-2">
                  {hasMoreTransactions && (
                    <Button variant="link" size="sm" onClick={handleShowMoreTransactions}>
                      Show More
                    </Button>
                  )}
                  {hasLessTransactions && (
                    <Button variant="link" size="sm" onClick={handleShowLessTransactions}>
                      Show Less
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </section>

      <section className="bg-white shadow rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pending Withdrawals</h2>
        </div>

        <div className="mb-3">
          <Select
            value={selectedAccount}
            onValueChange={(value) => {
              handleAccountChange(value)
            }}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Account</SelectItem>
              <SelectItem value="00040-000414-0002-0">00040-000414-0002-0</SelectItem>
              <SelectItem value="00040-1-000414-0001-2">00040-1-000414-0001-2</SelectItem>
              <SelectItem value="00040-1-000414-0002">00040-1-000414-0002</SelectItem>
              <SelectItem value="00040-001-000414-0001-1">00040-001-000414-0001-1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!selectedAccount && (
          <p className="text-sm text-gray-500 italic">
            Please select an account to view pending withdrawals.
          </p>
        )}

        {selectedAccount && (
          <>
            {pendingWithdrawalsLoading && <p className="text-sm text-gray-500">Loading...</p>}
            {pendingWithdrawalsError && (
              <p className="text-sm text-red-500">{pendingWithdrawalsError.message}</p>
            )}
            {!pendingWithdrawalsLoading && totalPending === 0 && (
              <p className="text-sm text-gray-500">No pending withdrawals found.</p>
            )}

            {totalPending > 0 && (
              <>
                <PendingWithdrawalsTable data={pendingList.slice(0, withdrawalCount)} />

                <div className="flex justify-end space-x-2 pt-2">
                  {hasMorePending && (
                    <Button variant="link" size="sm" onClick={handleShowMoreWithdrawals}>
                      Show More
                    </Button>
                  )}
                  {hasLessPending && (
                    <Button variant="link" size="sm" onClick={handleShowLessWithdrawals}>
                      Show Less
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </section>

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
            {productsData?.securities.length ? (
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


      <TopupModal open={isTopupOpen} onOpenChange={setIsTopupOpen} />


    </div>

    
  )
}
