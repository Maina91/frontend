import { z } from 'zod'

export const bankCreateSchema = z.object({
    bank_code: z.string().min(1, 'Bank code is required'),
    branch_code: z.string().optional(),
    account_name: z.string().min(1, 'Account name is required'),
    account_no: z.string().min(1, 'Account number is required'),
    account_type: z.string().min(1, 'Account type is required'),
    currency_code: z.string().min(1, 'Currency code is required'),
    status: z.number().optional(),
})
export type BankCreateData = z.infer<typeof bankCreateSchema>

export const bankUpdateSchema = z.object({
    id: z.coerce.number(), 
    bank_code: z.string().optional(),
    branch_code: z.string().optional().nullable(),
    account_name: z.string().optional(),
    account_no: z.string().optional(),
    account_type: z.string().optional(),
    currency_code: z.string().optional(),
    status: z.number().optional().nullable(),
})
export type BankUpdateData = z.infer<typeof bankUpdateSchema>
