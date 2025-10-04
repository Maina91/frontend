import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    API_URL: z.string().url().optional(),
    SESSION_SECRET: z.string().min(32).default('7d9c8a12a9c4e23c6f13c4a761dfbaf0e04cbf621ebc7a44ab7fa23e18c07d58c7e94f8a7c8492dfd6e4f1d3e8b9b6'),
    SESSION_EXPIRY: z.string().transform((val) => parseInt(val, 10)).default("600"),
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
