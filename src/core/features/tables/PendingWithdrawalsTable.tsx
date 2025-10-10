import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PendingWithdrawalTransaction } from '@/core/types/transaction'
import { useCancelPendingWithdrawal } from "@/core/hooks/customer/use-transactions"
import { useForm, revalidateLogic } from '@tanstack/react-form'
import { cancelPendingWithdrawalSchema } from "@/core/validators/transaction.schema"

interface Props {
    data: PendingWithdrawalTransaction[]
}

function getErrorMessages(errors: Array<any>): Array<string> {
    return errors.map((err) => (typeof err === 'string' ? err : err.message))
}


export const PendingWithdrawalsTable: FC<Props> = ({ data }) => {
    const [selectedTx, setSelectedTx] = useState<PendingWithdrawalTransaction | null>(null)
    const cancelMutation = useCancelPendingWithdrawal()

    const form = useForm({
        defaultValues: {
            reason: "",
        },
        validators: {
            onChange: ({ value }) => {
                const result = cancelPendingWithdrawalSchema.safeParse(value)
                if (!result.success) {
                    return result.error.format()._errors.join(', ') || 'Validation failed'
                }
                return undefined
            },
        },
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'blur',
        }),
        onSubmit: async ({ value }) => {
            if (!selectedTx) return
            await cancelMutation.mutateAsync({
                account_no: selectedTx.account_no,
                transaction_id: selectedTx.trans_id,
                reason: value.reason,
            })
            setSelectedTx(null)
            form.reset()
        },
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((tx) => (
                        <TableRow key={`${tx.trans_id}-${tx.trans_date}`}>
                            <TableCell>{new Date(tx.trans_date).toLocaleDateString()}</TableCell>
                            <TableCell>{tx.trans_type}</TableCell>
                            <TableCell className="font-medium">KES {tx.amount.toLocaleString()}</TableCell>
                            <TableCell>{tx.mop ?? "—"}</TableCell>
                            <TableCell>{tx.reason ?? "—"}</TableCell>
                            <TableCell>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setSelectedTx(tx)}
                                    disabled={cancelMutation.isPending}
                                >
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Cancel Confirmation Dialog */}
            <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Pending Withdrawal</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-4"
                    >
                        <form.Field
                            name="reason"
                            validators={{
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: cancelPendingWithdrawalSchema.shape.reason,
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                            <Label htmlFor={field.name}>
                                Reason for Cancellation
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                placeholder="Enter reason"
                                value={form.state.values.reason}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                aria-invalid={field.state.meta.errors.length > 0}
                                aria-describedby={
                                    field.state.meta.errors.length > 0
                                        ? `${field.name}-error`
                                        : undefined
                                }
                            />
                            {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                <p
                                    id={`${field.name}-error`}
                                    className="text-sm text-red-500"
                                    aria-live="polite"
                                >
                                    {getErrorMessages(field.state.meta.errors)[0]}
                                </p>
                            )}
                        </div>
                        )}
                        </form.Field>

                        <DialogFooter className="pt-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSelectedTx(null)}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                disabled={cancelMutation.isPending}
                            >
                                {cancelMutation.isPending ? "Cancelling..." : "Confirm Cancel"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
