import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const WithdrawModal = ({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) => {
    const [account, setAccount] = useState<string>('SAVINGS')
    const [amount, setAmount] = useState<string>('')
    const [paymentAccount, setPaymentAccount] = useState<string>('')

    const mutation = useMutation({
        mutationFn: async () => {
            const payload = {
                account_ref: account,
                amount: Number(amount),
                payment_account: paymentAccount,
                security_code: 'WITHDRAW',
            }

            const res = await axios.post('/api/payments/withdraw', payload)
            return res.data
        },
        onSuccess: (res) => {
            toast.success(res.message || 'Withdrawal request submitted successfully')
            onOpenChange(false)
            setAmount('')
            setPaymentAccount('')
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Failed to process withdrawal')
        },
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    <div>
                        <label className="text-sm font-medium">Account</label>
                        <Select
                            value={account}
                            onValueChange={(val) => setAccount(val)}
                            disabled={mutation.isPending}
                        >
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select Account" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Account</SelectLabel>
                                    <SelectItem value="00040-000414-0002-0">00040-000414-0002-0</SelectItem>
                                    <SelectItem value="00040-1-000414-0001-2">00040-1-000414-0001-2</SelectItem>
                                    <SelectItem value="00040-1-000414-0002">00040-1-000414-0002</SelectItem>
                                    <SelectItem value="00040-001-000414-0001-1">00040-001-000414-0001-1</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Amount</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={mutation.isPending}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Payment Account</label>
                        <Input
                            placeholder="e.g. 2547XXXXXXXX or Bank Account"
                            value={paymentAccount}
                            onChange={(e) => setPaymentAccount(e.target.value)}
                            disabled={mutation.isPending}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => mutation.mutate()}
                        disabled={!amount || !paymentAccount || mutation.isPending}
                    >
                        {mutation.isPending ? 'Processing...' : 'Withdraw'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
