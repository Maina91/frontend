import { z } from 'zod'

export const nextOfKinCreateSchema = z.object({
    full_name: z.string().min(1),
    id_passport_number: z.string().nullable().optional(),
    mobile: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    relationship: z.string().min(1),
})

export const nextOfKinUpdateSchema = z.object({
    id: z.number().min(1),
    full_name: z.string().min(1).optional(),
    id_passport_number: z.string().nullable().optional(),
    mobile: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    relationship: z.string().min(1).optional(),
})