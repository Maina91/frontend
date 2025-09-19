import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import type { LoginFormData } from '@/validations/login.schema'
import { loginSchema } from '@/validations/login.schema'


import { loginUser } from '@/services/auth/auth.service'


import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'


export function LoginPage() {
    const router = useRouter()

    const [formData, setFormData] = useState<LoginFormData>({
      email_address: '',
      password: '',
      user_type: 'customer',
    })

    const mutation = useMutation({
      mutationFn: loginUser,
      onSuccess: () => {
        router.navigate({ to: '/' })
      },
    })

  //   const mutation = useMutation({
  //     mutationFn: async (data: LoginFormData) => {
  //       // Call your login API service
  //       const res = await fetch("/api/auth/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       });

  //       if (!res.ok) throw new Error("Login failed");
  //       return res.json();
  //     },
  //     // onSuccess: () => {
  //     //   router.navigate({ to: "/dashboard" });
  //     // },
  //   });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = loginSchema.safeParse(formData)
    if (!parsed.success) {
      console.error(parsed.error.flatten().fieldErrors)
      return
    }
    mutation.mutate(parsed.data);
  }

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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* user_type Selection */}
            <div>
              <Label>Login as</Label>
              <RadioGroup
                value={formData.user_type}
                onValueChange={(val) => handleChange('user_type', val)}
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
            </div>

            {/* email_address */}
            <div>
              <Label>Email address or username</Label>
              <Input
                type="text"
                placeholder="Enter email address or username"
                value={formData.email_address}
                onChange={(e) => handleChange('email_address', e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>

            {/* Delivery Method */}
            {/* <div>
              <Label>Send Login Token Via</Label>
              <RadioGroup
                value={formData.deliveryMethod}
                onValueChange={(val) => handleChange('deliveryMethod', val)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
              </RadioGroup>
            </div> */}

            {/* Actions */}
            <Button
              type="submit"
              className="w-full"
              //   disabled={mutation.isPending}
            >
              {/* {mutation.isPending ? "Signing in..." : "Send Token"} */}
              Sign In
            </Button>

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
