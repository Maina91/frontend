import { z } from 'zod'

export const transactionSchema = z.object({
    account_no: z
        .string(),
})
export type TransactionData = z.infer<typeof transactionSchema>

export const cancelPendingWithdrawalSchema = z.object({
    account_no: z
        .string(),
    transaction_id: z
        .string(),
    reason: z
        .string()
        .min(3, "Reason is required"),
})
export type cancelPendingWithdrawalData = z.infer<typeof cancelPendingWithdrawalSchema>