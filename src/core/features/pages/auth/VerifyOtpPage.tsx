import { useState, useEffect } from 'react'
import { useRouter, useRouteContext, useSearch } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm, revalidateLogic } from '@tanstack/react-form'

import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { resendOtpAction, verifyOtpAction } from '@/core/actions/auth/otp'
import {
  otpSchema
} from '@/core/validators/otp.schema'
import { env } from '@/env'
import { clearSession } from '@/core/actions/auth/session'



function getErrorMessages(errors: Array<any>): Array<string> {
  return errors.map((err) => (typeof err === 'string' ? err : err.message))
}

export function OtpPage() {
  const router = useRouter()
  const { context } = useSearch({ from: '/_auth/verify-otp' }) as { context?: 'login' | 'reset' }


  // check for user /agent
  const { session } = useRouteContext({ from: '/_auth/verify-otp' })
  const role = session.user?.role as "CUSTOMER" | "AGENT"

  // logout if no role is available
  if (!role) {
    return clearSession()
  }

  const [destination, setDestination] = useState<'EMAIL' | 'MOBILE'>('EMAIL')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendCount, setResendCount] = useState(0)

  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'

  const MAX_RESENDS = env.VITE_OTP_MAX_RETRIES
  const RESEND_INTERVAL = env.VITE_OTP_RESEND_INTERVAL        // seconds  

  const form = useForm({
    defaultValues: {
      otp: '',
      user_agent: userAgent,
    },
    validators: {
      onSubmit: otpSchema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'blur',
    }),
    onSubmit: async ({ value }) => {
      await verifyMutation.mutateAsync({ data: value })
    },
  })

  // Verify OTP
  const verifyMutation = useMutation({
    mutationFn: verifyOtpAction,
    onSuccess: (res) => {
      toast.success('OTP Verified Successfully', {
        description: res.message || 'Verification successful',
        richColors: true,
      })

      if (context === 'reset') {
        router.navigate({ to: '/reset-password' })
      } else {
        router.navigate({
          to: role === 'AGENT' ? '/dashboard/agent' : '/dashboard/customer',
        })
      }
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
      resendOtpAction({ data: { description: destination } }),
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
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-xl font-bold tracking-tight">
            Enter OTP
          </CardTitle>
          <p className="text-center text-muted-foreground text-sm">
            We have sent a 6-digit code to your email/phone. Please enter it below.
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
                onChangeAsyncDebounceMs: 800,
                onChangeAsync: otpSchema.shape.otp,
              }}
            >
              {(field) => (
                <div className="flex flex-col items-center space-y-4">
                  <InputOTP
                    id={field.name}
                    name={field.name}
                    maxLength={6}
                    value={field.state.value}
                    onChange={(val) => field.handleChange(val)}
                    onBlur={field.handleBlur}
                    aria-invalid={field.state.meta.errors.length > 0}
                    aria-describedby={
                      field.state.meta.errors.length > 0
                        ? `${field.name}-error`
                        : undefined
                    }
                    className="mx-auto"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  {!field.state.meta.errors.length && (
                    <div className="text-center text-muted-foreground text-sm">
                      Enter your one-time password
                    </div>
                  )}

                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <p
                      id={`${field.name}-error`}
                      className="text-sm text-red-500 text-center"
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
                  disabled={!canSubmit || verifyMutation.isPending}
                >
                  {verifyMutation.isPending ? (
                    <>
                      <Spinner className="h-4 w-4 animate-spin text-white" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              )}
            </form.Subscribe>

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
