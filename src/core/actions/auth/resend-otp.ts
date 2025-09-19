// import { createServerFn } from '@tanstack/react-start'
// import { verifyOtp } from '@/core/services/auth/otp.service'
// import { otpSchema } from '@/core/validators/otp.schema'

// export const resendOtpAction = createServerFn({ method: 'POST' })
//   .validator(otpSchema)
//   .handler(async ({ data }) => {
//     try {
//       const response = await verifyOtp(data)

//       return {
//         success: true,
//         message: response.message,
//         otp_generated: response.otp_generated,
//         token: response.token,
//         member_status: response.member_status,
//       }
//     } catch (err: any) {
//       throw {
//         message: err?.message ?? 'Login failed',
//         fieldErrors: err?.fieldErrors ?? null,
//       }
//     }
//   })
