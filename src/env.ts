import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z.string().url(),
    VITE_APP_TITLE: z.string().min(1).optional(),
    VITE_OTP_MAX_RETRIES: z.string().optional(),
    VITE_OTP_RESEND_INTERVAL: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
