import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z.string().url(),
    VITE_APP_TITLE: z.string().min(1).optional(),

    VITE_OTP_TOKEN_EXPIRY: z.string().transform((val) => parseInt(val, 10)).default("300"), // seconds
    VITE_ACCESS_TOKEN_EXPIRY: z.string().transform((val) => parseInt(val, 10)).default("300"), // seconds

    VITE_OTP_MAX_RETRIES: z.string().transform((val) => parseInt(val, 10)).default("3"),
    VITE_OTP_RESEND_INTERVAL: z.string().transform((val) => parseInt(val, 10)).default("30"),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
