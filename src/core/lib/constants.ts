export const USER_TYPES = ['CUSTOMER', 'AGENT'] as const

export type UserType = (typeof USER_TYPES)[number]
