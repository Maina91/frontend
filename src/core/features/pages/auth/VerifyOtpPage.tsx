import { useState, useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

import { resendOtpAction, verifyOtpAction } from '@/core/actions/auth/otp'
import {
  otpSchema
} from '@/core/validators/otp.schema'
import { SessionClient } from '@/core/lib/session.client'
import { env } from '@/env'


export function OtpPage() {
  const router = useRouter()
  const [destination, setDestination] = useState<'EMAIL' | 'MOBILE'>('EMAIL')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendCount, setResendCount] = useState(0)

  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'

  const token = SessionClient.getOtpToken()

  const MAX_RESENDS = env.VITE_OTP_MAX_RETRIES
  const RESEND_INTERVAL = env.VITE_OTP_RESEND_INTERVAL        // seconds
  const AUTH_TOKEN_EXPIRY = env.VITE_AUTH_TOKEN_EXPIRY        // seconds
  

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
      await verifyMutation.mutateAsync({ data: value })
    },
  })

  // Verify OTP
  const verifyMutation = useMutation({
    mutationFn: verifyOtpAction,
    onSuccess: (res) => {
      console.log("otp res", res)

      toast.success('OTP Verified Successfully', {
        description: res.message || 'You are now logged in.',
      })

      SessionClient.clearOtpToken()
      SessionClient.setToken(res.token, AUTH_TOKEN_EXPIRY)

      router.navigate({ to: '/dashboard' })
    },
    onError: (err: any) => {
      toast.error('OTP Verification Failed', {
        description: err?.message || 'Invalid OTP. Please try again.',
        richColors: true,
      })
    },
  })

  // Resend OTP
  const resendMutation = useMutation({
    mutationFn: () =>
      resendOtpAction({ data: { token: token!, description: destination } }),
    onSuccess: (res) => {
      console.log("resend otp res", res)
      toast.success('OTP Resent', {
        description: 'A new OTP has been sent to your email/phone.',
      })
      setResendCooldown(RESEND_INTERVAL)
      setResendCount((prev) => prev + 1)
    },
    onError: (err: any) => {
      toast.error('Failed to Resend OTP', {
        description: err?.message || 'Please try again later.',
        richColors: true,
      })
    }
  })

  // Handle resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [resendCooldown])



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

            {/* OTP Input */}
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

            {/* Verify button */}
            <form.Subscribe selector={(s) => [s.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!canSubmit || verifyMutation.isPending}
                >
                  {verifyMutation.isPending ? 'Verifying...' : 'Verify OTP'}
                </Button>
              )}
            </form.Subscribe>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Didn’t receive a code?
                </span>
              </div>
            </div>

            {/* Resend OTP */}
            <div className="space-y-2 mt-4 text-center ">
              <RadioGroup
                value={destination}
                onValueChange={(value: string) => setDestination(value as 'EMAIL' | 'MOBILE')}
                className="flex justify-center gap-6 mb-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="EMAIL" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MOBILE" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
              </RadioGroup>

              <Button
                type="button"
                variant="link"
                disabled={resendCooldown > 0 || resendCount >= MAX_RESENDS || resendMutation.isPending}
                onClick={() => resendMutation.mutate()}
              >
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : resendCount >= MAX_RESENDS
                    ? 'Maximum attempts reached'
                    : 'Resend OTP'}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
