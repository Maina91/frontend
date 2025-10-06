import { z } from 'zod'

export const transactionSchema = z.object({
    account_no: z
        .string(),
})
export type TransactionData = z.infer<typeof transactionSchema>