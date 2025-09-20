import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { verifyOtpAction } from '@/core/actions/auth/verify-otp'
import { otpSchema } from '@/core/validators/otp.schema'

export function OtpPage() {
  const router = useRouter()

  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'

  const token =
    typeof window !== 'undefined' ? sessionStorage.getItem('OtpToken') : null

  if (!token && typeof window !== 'undefined') {
    // Redirect user back to login if token is missing
    router.navigate({ to: '/login' })
  }

  const mutation = useMutation({
    mutationFn: verifyOtpAction,
    onSuccess: (res) => {
      toast.success('OTP Verified!', {
        description: res.message || 'You are now logged in.',
      })

      // Remove OTP token after successful verification
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('OtpToken')
      }

      router.navigate({ to: '/profile' })
    },
    onError: (err: any) => {
      toast.error('OTP Verification Failed', {
        description: err?.message || 'Invalid OTP. Please try again.',
        richColors: true,
      })
    },
  })

  // 🔹 TanStack Form setup
  const form = useForm({
    defaultValues: {
      otp: '',
      user_agent: userAgent,
      token: token || '',
    },
    validators: {
      onSubmit: otpSchema,
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
            Enter OTP
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-2">
            We have sent a code to your email/phone. Please enter it below.
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
              name="otp"
              validators={{
                onChange: ({ value }) =>
                  !/^\d{6}$/.test(value)
                    ? 'Enter a valid 6-digit OTP'
                    : undefined,
              }}
            >
              {(field) => (
                <div>
                  <Label>OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    maxLength={6}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm">
                      {field.state.meta.errors.join(', ')}
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
                  {mutation.isPending ? 'Verifying...' : 'Verify OTP'}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
