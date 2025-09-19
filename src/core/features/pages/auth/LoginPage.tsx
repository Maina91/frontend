import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import type { LoginFormData } from '@/core/validators/login.schema'
import { loginSchema } from '@/core/validators/login.schema'
import { loginAction } from '@/core/actions/auth/login'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function LoginPage() {
  const router = useRouter()

  // 🔹 Mutation for login action
  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (res) => {
      toast.success('Successful login', {
        description: res.message ?? 'Welcome back',
      })
      router.navigate({ to: '/' })
    },
    onError: (err: any) => {
      if (err?.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, message]) => {
          form.setFieldMeta(field as keyof LoginFormData, (meta) => ({
            ...meta,
            errors: [String(message)],
          }))
        })
      }

      toast.error('User Login Error', {
        description: err?.message ?? 'An unexpected error occurred',
        richColors: true,
      })
    },
  })

  // 🔹 TanStack Form setup with full Zod schema
  const form = useForm({
    defaultValues: {
      email_address: '',
      password: '',
      user_type: 'customer' as 'customer' | 'agent',
    },
    validators: {
      onSubmit: loginSchema,
    },
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
            {/* User type */}
            <form.Field name="user_type">
              {(field) => (
                <div>
                  <Label>Login as</Label>
                  <RadioGroup
                    value={field.state.value}
                    onValueChange={(val: typeof field.state.value) =>
                      field.handleChange(val)
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer">Customer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agent" id="agent" />
                      <Label htmlFor="agent">Agent</Label>
                    </div>
                  </RadioGroup>
                  {field.state.meta.errors[0] && (
                    <p className="text-red-500 text-sm">
                      {form.state.fieldMeta.email_address.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field name="email_address">
              {(field) => (
                <div>
                  <Label>Email address or username</Label>
                  <Input
                    type="text"
                    placeholder="Enter email address or username"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-red-500 text-sm">
                      {form.state.fieldMeta.email_address.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-red-500 text-sm">
                      {form.state.fieldMeta.email_address.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Submit button */}
            <form.Subscribe selector={(s) => [s.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || mutation.isPending}
                >
                  {mutation.isPending ? 'Signing in...' : 'Sign In'}
                </Button>
              )}
            </form.Subscribe>

            <div className="flex justify-between text-sm">
              <a
                href="/onboarding/signup"
                className="text-primary hover:underline"
              >
                Create Account
              </a>
              <a
                href="/onboarding/forgot-password"
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
