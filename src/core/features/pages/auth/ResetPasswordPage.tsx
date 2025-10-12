import { useMutation } from '@tanstack/react-query'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import { Spinner } from "@/components/ui/spinner"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { updatePasswordSchema } from '@/core/validators/auth.schema'
import { updatePassword } from '@/core/actions/auth/auth'

import { clearSession } from '@/core/actions/auth/session'



function getErrorMessages(errors: Array<any>): Array<string> {
    return errors.map((err) => (typeof err === 'string' ? err : err.message))
}


export function ResetPasswordPage() {
    const router = useRouter()

    const { session } = useRouteContext({ from: '/dashboard' })
    const customer_ref = session.user?.custom_ref

    if (!customer_ref){
        return clearSession()
    }
    

    const form = useForm({
        defaultValues: {
            password: '',
            confirm_password: '',
        },
        validators: {
            onChange: ({ value }) => {
                const result = updatePasswordSchema.shape.password.safeParse(value.password)
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
            await mutation.mutateAsync({
                data: {
                    password: value.password,
                    customer_ref: customer_ref
                },
            })
        },
    })

    const mutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success('Password reset successfully!', {
                description: 'You can now log in with your new password.',
            })
            router.navigate({ to: '/login' })
        },
        onError: (err: any) => {
            toast.error('Error', {
                description: err?.message || 'Please try again later.',
                richColors: true,
            })
        },
    })



    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">
                        Set New Password
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-5"
                    >
                        <form.Field
                            name="password"
                            validators={{
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: updatePasswordSchema.shape.password,
                            }}
                        >
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor={field.name}>
                                        New Password
                                    </Label>
                                    <Input
                                        id={field.name}
                                        type={field.name}
                                        placeholder="Enter new password"
                                        value={field.state.value}
                                        autoComplete="new-password"
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

                        <form.Field name="confirm_password">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor={field.name}>
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id={field.name}
                                        type={field.name}
                                        placeholder="Confirm password"
                                        value={field.state.value}
                                        autoComplete="new-password"
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

                        <form.Subscribe selector={(s) => [s.canSubmit]}>
                            {([canSubmit]) => (
                                <Button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2"
                                    disabled={!canSubmit || mutation.isPending}
                                >
                                    {mutation.isPending ? (
                                        <>
                                            <Spinner className="h-4 w-4 animate-spin text-white" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        "Save Password"
                                    )}
                                </Button>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
