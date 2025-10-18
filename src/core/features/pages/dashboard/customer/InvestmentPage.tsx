import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays, FileText, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

export const InvestmentPage = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('all')
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  // Simulated data – replace with real API data
  const investments = [
    {
      id: 1,
      fund: 'Etica MMF',
      account: 'MMF-00123',
      currency: 'KES',
      principal: 500000,
      net_interest: 12500,
      withdrawal: 0,
      investment_balance: 512500,
      cash_balance: 25000,
      start_date: '2025-10-18',
    },
    {
      id: 2,
      fund: 'Etica Treasury Fund',
      account: 'ETF-00456',
      currency: 'KES',
      principal: 300000,
      net_interest: 9800,
      withdrawal: 10000,
      investment_balance: 298000,
      cash_balance: 10000,
      start_date: '2025-09-10',
    },
  ]

  const total = investments.reduce(
    (acc, inv) => acc + inv.investment_balance + inv.cash_balance,
    0
  )

  return (
    <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Investments
          </h1>
        </div>

      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start"
              >
                <CalendarDays className="w-4 h-4" />
                {startDate ? (
                  format(startDate, 'MMM dd, yyyy')
                ) : (
                  <span>Start Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* End Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start"
              >
                <CalendarDays className="w-4 h-4" />
                {endDate ? (
                  format(endDate, 'MMM dd, yyyy')
                ) : (
                  <span>End Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> --- Select Account ---</SelectItem>
              <SelectItem value="00040-000414-0002-0">00040-000414-0002-0</SelectItem>
              <SelectItem value="00040-1-000414-0001-2">00040-1-000414-0001-2</SelectItem>
              <SelectItem value="00040-1-000414-0002">00040-1-000414-0002</SelectItem>
              <SelectItem value="00040-001-000414-0001-1">00040-001-000414-0001-1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Button
            className="flex items-center justify-center gap-2 w-full"
          >
            <LineChart className="w-4 h-4" /> View Interest
          </Button>

          <Button
            className="flex items-center justify-center gap-2 w-full"
          >
            <FileText className="w-4 h-4" /> View Statement
          </Button>
        </div>
      </section>

    </div>
  )
}
