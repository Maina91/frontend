import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import type { LoginData } from '@/core/validators/auth.schema'
import { loginSchema } from '@/core/validators/auth.schema'
import { loginAction } from '@/core/actions/auth/auth'
import { Spinner } from "@/components/ui/spinner"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'


function getErrorMessages(errors: Array<any>): Array<string> {
  return errors.map((err) => (typeof err === 'string' ? err : err.message))
}

export function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (res) => {

      toast.success('Successful login', {
        description:
          res.message ||
          'Logged in successfully. Proceed to verify the code sent to your email/ Mobile no',
      })
      router.navigate({
        to: '/verify-otp',
        search: { context: 'login' },
      })
    },
    onError: (err: any) => {
      if (err?.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          form.setFieldMeta(field as keyof LoginData, (meta) => ({
            ...meta,
            errors: [String(message)],
          }))
        })
      }

      toast.error('Login Error', {
        description: err?.message || 'An unexpected error occurred',
        richColors: true,
      })
    },
  })

  const form = useForm({
    defaultValues: {
      email_address: '',
      password: '',
      user_type: 'CUSTOMER' as 'CUSTOMER' | 'AGENT',
    },
    validators: {
      onSubmit: loginSchema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'blur',
    }),
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({ data: value })
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Welcome to <br />
            <span className="text-primary">The Investment Platform</span>
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-2">
            Where you imagine more
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
              name="user_type">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Login as</Label>
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(val: typeof field.state.value) =>
                      field.handleChange(val)
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="CUSTOMER" id="customer" />
                      <Label htmlFor="customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AGENT" id="agent" />
                      <Label htmlFor="agent">Agent</Label>
                    </div>
                  </RadioGroup>
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
                onChangeAsync: loginSchema.shape.email_address,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="email_address">
                    Email address
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter email address"
                    value={field.state.value}
                    autoComplete="email"
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
              name="password"
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: loginSchema.shape.password,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <div className="relative flex items-center">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={field.state.value}
                      autoComplete="current-password"
                      className="pr-10"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={field.state.meta.errors.length > 0}
                      aria-describedby={
                        field.state.meta.errors.length > 0
                          ? `${field.name}-error`
                          : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
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
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
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
                href="/forgot-password"
                className="text-muted-foreground hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
