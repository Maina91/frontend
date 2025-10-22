import { revalidateLogic, useForm } from '@tanstack/react-form'
import type { BankCreateData } from '@/core/validators/bank.schema'
import { bankCreateSchema } from '@/core/validators/bank.schema'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useBanks, useBranches } from '@/core/hooks/data/use-banks'


function getErrorMessages(errors: Array<any>): Array<string> {
    return errors.map((err) => (typeof err === 'string' ? err : err.message))
}

type BankDetailsFormProps = {
    open: boolean
    onClose: () => void
    onSubmit: (values: BankCreateData) => Promise<void>
}

export function BankDetailsForm({ open, onClose, onSubmit }: BankDetailsFormProps) {
    const form = useForm({
        defaultValues: {
            bank_code: '',
            branch_code: '',
            account_name: '',
            account_no: '',
            account_type: '',
            currency_code: '',
            member_no: '',
        },
        validators: {
            onChange: ({ value }) => {
                const result = bankCreateSchema.safeParse(value)
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
            try {
                bankCreateSchema.parse(value)

                await onSubmit(value)

                form.reset()
                onClose()
            } catch (error) {
                console.error(error)
            }
        },
    })

    const { data: banks, isLoading: banksLoading, error: banksError } = useBanks()
    const bankCode = form.state.values.bank_code
    const { data: branches, isLoading: branchesLoading, error: branchesError } = useBranches(bankCode)

    console.log('Banks', banks)
    console.log('Branches', branches)


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Bank Details</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await form.handleSubmit()
                    }}
                    className="space-y-4"
                >
                    <form.Field
                        name="bank_code"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: bankCreateSchema.shape.bank_code,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="bank_code">
                                    Bank Name
                                    <span className="text-red-500">*</span>
                                </Label>
                                {banksLoading ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Spinner className="h-4 w-4 animate-spin" /> Loading banks...
                                    </div>
                                ) : banksError ? (
                                    <p className="text-sm text-red-500">Failed to load banks</p>
                                ) : (
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(val) => field.handleChange(val)}
                                    >
                                        <SelectTrigger id="bank_code" className='w-full'>
                                            <SelectValue placeholder="Select a bank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {banks?.banks
                                                .filter((bank) => bank.bank_code && bank.bank_code.trim() !== '')
                                                .map((bank) => (
                                                    <SelectItem key={bank.bank_code} value={bank.bank_code}>
                                                        {bank.name}
                                                    </SelectItem>
                                                ))}

                                        </SelectContent>
                                    </Select>
                                )}
                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500" aria-live="polite">
                                        {getErrorMessages(field.state.meta.errors)[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="branch_code"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: bankCreateSchema.shape.branch_code,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="branch_code">
                                    Branch Name
                                    <span className="text-red-500">*</span>
                                </Label>
                                {branchesLoading ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Spinner className="h-4 w-4 animate-spin" /> Loading branches...
                                    </div>
                                ) : branchesError ? (
                                    <p className="text-sm text-red-500">Failed to load branches</p>
                                ) : (
                                    <Select
                                        disabled={!bankCode || !branches?.branches.length}
                                        value={field.state.value}
                                        onValueChange={(val) => field.handleChange(val)}
                                    >
                                        <SelectTrigger id="branch_code" className='w-full'>
                                            <SelectValue placeholder="Select a branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches?.branches.map((branch) => (
                                                <SelectItem
                                                    key={branch.branch_code}
                                                    value={branch.branch_code}
                                                >
                                                    {branch.branch_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500" aria-live="polite">
                                        {getErrorMessages(field.state.meta.errors)[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Account Name */}
                    <form.Field
                        name="account_name"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: bankCreateSchema.shape.account_name,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="account_name">
                                    Account Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="account_name"
                                    name={field.name}
                                    placeholder="Enter account name"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500" aria-live="polite">
                                        {getErrorMessages(field.state.meta.errors)[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Account Number */}
                    <form.Field
                        name="account_no"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: bankCreateSchema.shape.account_no,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="account_no">
                                    Account Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="account_no"
                                    name={field.name}
                                    placeholder="Enter account number"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500" aria-live="polite">
                                        {getErrorMessages(field.state.meta.errors)[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Account Type */}
                    <form.Field
                        name="account_type"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: bankCreateSchema.shape.account_type,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="account_type">
                                    Account Type <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="account_type"
                                    name={field.name}
                                    placeholder="Savings / Current"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500" aria-live="polite">
                                        {getErrorMessages(field.state.meta.errors)[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Currency Code */}
                    <form.Field
                        name="currency_code"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: bankCreateSchema.shape.currency_code,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="currency_code">
                                    Currency Code <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="currency_code"
                                    name={field.name}
                                    placeholder="e.g., KES, USD"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500" aria-live="polite">
                                        {getErrorMessages(field.state.meta.errors)[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <div className="flex justify-between items-center pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={onClose}
                            disabled={form.state.isSubmitting}
                            className="min-w-[100px]"
                        >
                            Cancel
                        </Button>
                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="min-w-[100px] flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Spinner className="h-4 w-4 animate-spin text-white" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>Create</>
                                    )}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
