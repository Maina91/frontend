import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

import type { LoginData } from '@/core/validators/auth.schema'
import { loginSchema } from '@/core/validators/auth.schema'
import { loginAction } from '@/core/actions/auth/login'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SessionClient } from '@/core/lib/session.client'

function getErrorMessages(errors: Array<any>): Array<string> {
  return errors.map((err) => (typeof err === 'string' ? err : err.message))
}

export function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (res) => {
      // Set OTP Token
      console.log('login res', res)
      if (typeof window !== 'undefined' && res.token) {
        SessionClient.setOtpToken(res.token)
      }

      toast.success('Successful login', {
        description:
          res.message ||
          'Logged in successfully. Proceed to verify the code sent to your email/ Mobile no',
      })
      router.navigate({
        to: '/verify-otp',
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
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm">
                      {getErrorMessages(field.state.meta.errors).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field
              name="email_address"
              validators={{
                onChange: ({ value }) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  return !emailRegex.test(value)
                    ? 'Please enter a valid email address.'
                    : undefined
                },
              }}
            >
              {(field) => (
                <div>
                  <Label>Email address or username</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="email"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm">
                      {getErrorMessages(field.state.meta.errors).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.trim() === '' ? 'Password is required' : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col">
                  <Label>Password</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="new-password"
                      className="pr-10" 
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
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      {getErrorMessages(field.state.meta.errors).join(', ')}
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
