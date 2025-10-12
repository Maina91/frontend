import { revalidateLogic, useForm } from '@tanstack/react-form'
import type { NextOfKinData } from '@/core/validators/kin.schema'
import { nextOfKinSchema } from '@/core/validators/kin.schema'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from "@/components/ui/spinner"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'


function getErrorMessages(errors: Array<any>): Array<string> {
    return errors.map((err) => (typeof err === 'string' ? err : err.message))
}


type KinFormProps = {
    open: boolean
    onClose: () => void
    defaultValues?: Partial<NextOfKinData>
    isEdit: boolean
    onSubmit: (values: NextOfKinData) => Promise<void>
}


export function NextOfKinForm({
    open,
    onClose,
    defaultValues,
    onSubmit,
    isEdit
}: KinFormProps) {

    const form = useForm({
        defaultValues: {
            id: defaultValues?.id,
            full_name: defaultValues?.full_name ?? '',
            relationship: defaultValues?.relationship ?? '',
            identification_no: defaultValues?.identification_no ?? '',
            mobile_no: defaultValues?.mobile_no ?? '',
            email_address: defaultValues?.email_address ?? '',
        },
        validators: {
            onChange: ({ value }) => {
                const result = nextOfKinSchema.safeParse(value)
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
                nextOfKinSchema.parse(value)

                await onSubmit(value)

                form.reset()
                onClose()
            } catch (error) {
                console.error(error)
            }
        },
    })

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {defaultValues ? 'Edit Next of Kin' : 'Add Next of Kin'}
                    </DialogTitle>
                </DialogHeader>

                <form.Subscribe selector={(s) => s.values}>
                    {() => {
                        if (defaultValues) {
                            form.reset({
                                id: defaultValues.id,
                                full_name: defaultValues.full_name ?? '',
                                relationship: defaultValues.relationship ?? '',
                                identification_no: defaultValues.identification_no ?? '',
                                mobile_no: defaultValues.mobile_no ?? '',
                                email_address: defaultValues.email_address ?? '',
                            })
                        }
                        return null
                    }}
                </form.Subscribe>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await form.handleSubmit()
                    }}
                    className="space-y-4"
                >
                    <form.Field
                        name="full_name"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: nextOfKinSchema.shape.full_name,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="full_name">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="full_name"
                                    name={field.name}
                                    placeholder="Enter full name"
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

                    <form.Field
                        name="relationship"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: nextOfKinSchema.shape.relationship,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="relationship">
                                    Relationship <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="relationship"
                                    name={field.name}
                                    placeholder="e.g., Spouse, Parent, Sibling"
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

                    <form.Field
                        name="identification_no"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: nextOfKinSchema.shape.identification_no,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="identification_no">
                                    ID/Passport Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="identification_no"
                                    name={field.name}
                                    placeholder="Enter ID or passport number"
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

                    <form.Field
                        name="mobile_no"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: nextOfKinSchema.shape.mobile_no,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="mobile_no">
                                    Mobile Number
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="mobile_no"
                                    name={field.name}
                                    type="tel"
                                    placeholder="e.g., 0712345678 or +254712345678"
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

                    <form.Field
                        name="email_address"
                        validators={{
                            onChangeAsyncDebounceMs: 500,
                            onChangeAsync: nextOfKinSchema.shape.email_address,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label htmlFor="email_address">
                                    Email Address
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email_address"
                                    name={field.name}
                                    type="email"
                                    placeholder="email@example.com"
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

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={onClose}
                            disabled={form.state.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <form.Subscribe
                            selector={(s) => [s.canSubmit, s.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Spinner className="h-4 w-4 animate-spin text-white" />
                                            {isEdit ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>{isEdit ? 'Update' : 'Create'}</>
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
