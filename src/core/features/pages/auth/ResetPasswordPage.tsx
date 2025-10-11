import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import { useForm, revalidateLogic } from '@tanstack/react-form'
import { toast } from 'sonner'

import { Spinner } from "@/components/ui/spinner"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


import { setNewPasswordSchema } from '@/core/validators/auth.schema'
import { setNewPasswordAction } from '@/core/actions/auth/reset'

export function ResetPasswordPage() {
    const router = useRouter()
    const search = useSearch<{ email: string; token: string }>()

    const mutation = useMutation({
        mutationFn: setNewPasswordAction,
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

    const form = useForm({
        defaultValues: {
            password: '',
            confirm_password: '',
        },
        validators: {
            onSubmit: setNewPasswordSchema,
        },
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'blur',
        }),
        onSubmit: async ({ value }) => {
            await mutation.mutateAsync({
                data: {
                    email: search.email,
                    token: search.token,
                    password: value.password,
                },
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
                        <form.Field name="password">
                            {(field) => (
                                <div className="space-y-1">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter new password"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="confirm_password">
                            {(field) => (
                                <div className="space-y-1">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                    <Input
                                        id="confirm_password"
                                        type="password"
                                        placeholder="Re-enter password"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </div>
                            )}
                        </form.Field>

                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full flex items-center justify-center gap-2"
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
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
