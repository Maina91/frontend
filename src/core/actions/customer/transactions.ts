import { createServerFn } from '@tanstack/react-start'
import { transactionSchema, cancelPendingWithdrawalSchema } from '@/core/validators/transaction.schema'
import type { TransactionsResponse, PendingWithdrawalsResponse, CancelPendingWithdrawalResponse } from '@/core/types/transaction'
import { useAppSession } from '@/core/lib/session'
import { fetchTransactionsService, fetchPendingWithdrawalsService, cancelPendingWithdrawalService } from '@/core/services/customer/transactions'


export const fetchTransactions = createServerFn({ method: 'GET' })
    .inputValidator(transactionSchema)
    .handler(async ({ data }): Promise<TransactionsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await fetchTransactionsService(auth_token, data)

            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch transactions',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })

export const fetchPendingWithdrawals = createServerFn({ method: 'GET' })
    .inputValidator(transactionSchema)
    .handler(async ({ data }): Promise<PendingWithdrawalsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await fetchPendingWithdrawalsService(auth_token, data)

            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch pending withdrawals',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })

export const cancelPendingWithdrawals = createServerFn({ method: 'POST' })
    .inputValidator(cancelPendingWithdrawalSchema)
    .handler(async ({ data }): Promise<CancelPendingWithdrawalResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized')

            const res = await cancelPendingWithdrawalService(auth_token, data)

            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to cancel withdrawal',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })
