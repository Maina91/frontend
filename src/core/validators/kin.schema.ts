import { z } from 'zod'


export const nextOfKinSchema = z
    .object({
        id: z.coerce.
            number()
            .optional(),
        full_name: z
            .string()
            .min(1, 'Full name is required'),
        relationship: z
            .string()
            .min(1, 'Relationship is required'),
        identification_no: z
            .string()
            .min(1, 'ID number is required'),
        mobile_no: z
            .string()
            .min(1, 'Mobile number is required'),
        email_address: z
            .string()
            .email('Invalid email address'),
    })
export type NextOfKinData = z.infer<typeof nextOfKinSchema>


export const nextOfKinDeleteSchema = z.object({
    id: z.coerce.number().int().positive(),
})


