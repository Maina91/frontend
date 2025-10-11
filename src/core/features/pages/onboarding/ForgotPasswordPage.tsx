import { useMutation } from '@tanstack/react-query'
import { useForm, revalidateLogic } from '@tanstack/react-form'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { resetPasswordSchema } from '@/core/validators/auth.schema'
import { resetPassword } from '@/core/actions/auth/auth'

function getErrorMessages(errors: Array<any>): Array<string> {
  return errors.map((err) => (typeof err === 'string' ? err : err.message))
}


export function ForgotPasswordPage() {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      toast.success('Email Sent', {
        description: res.message,
      })
    },
    onError: (err: any) => {
      toast.error('Error', {
        description: err?.message || 'An error occurred. Please try again later.',
        richColors: true,
      })
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'blur',
    }),
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({ data: value })
      form.reset()
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Forgot Password
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-2">
            Enter your registered email address to receive a password reset OTP on your email / mobile.
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            <form.Field
              name="email"
              validators={{
                onChangeAsyncDebounceMs: 800,
                onChangeAsync: resetPasswordSchema.shape.email,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>Email Address</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter your email"
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
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              )}
            </form.Subscribe>

            <div className="flex justify-between text-sm">
              <a
                href="/register"
                className="text-muted-foreground hover:underline"
              >
                Create Account
              </a>
              <a
                href="/login"
                className="text-muted-foreground hover:underline"
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
