import { z } from 'zod'

export const nextOfKinCreateSchema = z
    .object({
        full_name: z
            .string()
            .min(1, 'Full name is required'),
        relationship: z
            .string()
            .min(1, 'Relationship is required'),
        identification_no: z
            .string()
            .min(1, "ID/Passport number is required"),
        mobile_no: z
            .string()
            .default(''),
        email_address: z
            .string()
            .email('Invalid email address')
            .default(''),
    })

export type NextOfKinCreateData = z.infer<typeof nextOfKinCreateSchema>

export const nextOfKinUpdateSchema = z.object({
    id: z.coerce.number(), 
    full_name: z.string().optional(),
    identification_no: z.string().optional().nullable(),
    mobile_no: z.string().optional().nullable(),
    // email_address: z.string().email('Invalid email').optional().nullable(),
    email_address: z
        .string()
        .email('Invalid email address')
        .optional()
        .nullable()
        .transform((val) => (val === '' ? null : val)),
    relationship: z.string().optional(),
})

export type NextOfKinUpdateData = z.infer<typeof nextOfKinUpdateSchema>
