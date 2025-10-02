import { useForm } from '@tanstack/react-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { nextOfKinCreateSchema , nextOfKinUpdateSchema} from '@/core/validators/kin.schema'
import type { NextOfKinCreateData, NextOfKinUpdateData } from '@/core/validators/kin.schema'


function getErrorMessages(errors: Array<any>): Array<string> {
    return errors.map((err) => (typeof err === 'string' ? err : err.message))
}


type KinFormProps = {
    open: boolean
    onClose: () => void
    defaultValues?: Partial<NextOfKinUpdateData>
    isEdit: boolean
    onSubmit: (values: NextOfKinCreateData | NextOfKinUpdateData) => void
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
        
        // validators: {
        //     onSubmit: (values) => {
        //         return isEdit
        //             ? nextOfKinUpdateSchema.safeParse(values)
        //             : nextOfKinCreateSchema.safeParse(values)
        //     },
        // },
        onSubmit: async ({ value }) => {
            await onSubmit(value)
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

                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await form.handleSubmit()
                    }}
                    className="space-y-4"
                >
                    {/* Full Name */}
                    <form.Field
                        name="full_name"
                        validators={{
                            onChange: ({ value }) =>
                                value.trim() === '' ? 'Full name is required' : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label>Full Name</Label>
                                <Input
                                    placeholder="Full Name"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {getErrorMessages(field.state.meta.errors).join(', ')}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Relationship */}
                    <form.Field
                        name="relationship"
                        validators={{
                            onChange: ({ value }) =>
                                value.trim() === '' ? 'Relationship is required' : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label>Relationship</Label>
                                <Input
                                    placeholder="Relationship"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {getErrorMessages(field.state.meta.errors).join(', ')}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* ID/Passport */}
                    <form.Field name="identification_no">
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label>ID/Passport Number</Label>
                                <Input
                                    placeholder="ID/Passport Number"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Mobile */}
                    <form.Field name="mobile_no">
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label>Mobile</Label>
                                <Input
                                    placeholder="Mobile"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Email */}
                    <form.Field
                        name="email_address"
                        validators={{
                            onChange: ({ value }) => {
                                if (!value) return undefined
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                return !emailRegex.test(value)
                                    ? 'Please enter a valid email address.'
                                    : undefined
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {getErrorMessages(field.state.meta.errors).join(', ')}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Submit */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                                    {isEdit ? 'Update' : 'Create'}
                                </Button>
                            )}
                        </form.Subscribe>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
