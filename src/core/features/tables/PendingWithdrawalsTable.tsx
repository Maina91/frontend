import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
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
                const result = cancelPendingWithdrawalSchema.shape.reason.safeParse(value.reason)
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

            const result = cancelPendingWithdrawalSchema.safeParse({
                account_no: selectedTx.account_no,
                transaction_id: selectedTx.trans_id,
                reason: value.reason,
            })

            if (!result.success) {
                return result.error.format()._errors.join(', ') || 'Validation failed'
            }

            await cancelMutation.mutateAsync(result.data)
            form.reset()
            setSelectedTx(null)
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
            <Dialog
                open={!!selectedTx}
                onOpenChange={(open) => {
                    if (!open && !cancelMutation.isPending) setSelectedTx(null)
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Cancel Pending Withdrawal
                        </DialogTitle>
                        <DialogDescription>
                            Please provide a reason for cancelling this withdrawal. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault()
                            await form.handleSubmit()
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
                                        value={field.state.value}
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
                                disabled={cancelMutation.isPending}
                            >
                                Cancel
                            </Button>
                            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                                {([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit || isSubmitting || cancelMutation.isPending}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting || cancelMutation.isPending ? (
                                            <>
                                                <Spinner className="h-4 w-4 animate-spin text-white" />
                                                Cancelling...
                                            </>
                                        ) : (
                                            "Confirm Cancel"
                                        )}
                                    </Button>
                                )}
                            </form.Subscribe>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
