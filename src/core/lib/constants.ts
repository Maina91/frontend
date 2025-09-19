// src/core/constants.ts
export const USER_TYPES = ['customer', 'agent'] as const

// In TypeScript, infer:
export type UserType = (typeof USER_TYPES)[number]
