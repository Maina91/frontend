import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export const TopupModal = ({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) => {
    const [account, setAccount] = useState<string>('SAVINGS')
    const [amount, setAmount] = useState<string>('')
    const [phoneNo, setPhoneNo] = useState<string>('')
    const [currency, setCurrency] = useState<string>('KES')
    const [paymentMethod, setPaymentMethod] = useState<string>('mpesa')

    const mutation = useMutation({
        mutationFn: async () => {
            const payload: Record<string, any> = {
                account_ref: account,
                amount: Number(amount),
                security_code: 'TOPUP',
                payment_method: paymentMethod,
            }

            if (paymentMethod === 'mpesa') payload.phone_no = phoneNo
            if (paymentMethod === 'bank') payload.currency = currency

            const res = await axios.post('/api/payments/purchase', payload)
            return res.data
        },
        onSuccess: (res) => {
            toast.success(res.message || 'Top-up request sent successfully')
            onOpenChange(false)
            setAmount('')
            setPhoneNo('')
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Failed to process top-up')
        },
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Top-up Account</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-3">
                    {/* Account Selection */}
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
                                <SelectItem value="all">Select Account</SelectItem>
                                <SelectItem value="00040-000414-0002-0">00040-000414-0002-0</SelectItem>
                                <SelectItem value="00040-1-000414-0001-2">00040-1-000414-0001-2</SelectItem>
                                <SelectItem value="00040-1-000414-0002">00040-1-000414-0002</SelectItem>
                                <SelectItem value="00040-001-000414-0001-1">00040-001-000414-0001-1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="text-sm font-medium">Payment Method</label>
                        <Select
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                            disabled={mutation.isPending}
                        >
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select Payment Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mpesa">M-Pesa</SelectItem>
                                <SelectItem value="bank">Bank Transfer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Conditional Fields */}
                    {paymentMethod === 'mpesa' && (
                        <div>
                            <label className="text-sm font-medium">Mobile Number</label>
                            <Input
                                placeholder="2547XXXXXXXX"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                disabled={mutation.isPending}
                            />
                        </div>
                    )}

                    {paymentMethod === 'bank' && (
                        <div>
                            <label className="text-sm font-medium">Currency</label>
                            <Select
                                value={currency}
                                onValueChange={setCurrency}
                                disabled={mutation.isPending}
                            >
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="KES">KES</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Amount */}
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
                        disabled={
                            !amount ||
                            mutation.isPending ||
                            (paymentMethod === 'mpesa' && !phoneNo)
                        }
                    >
                        {mutation.isPending ? 'Processing...' : 'Top-up'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
