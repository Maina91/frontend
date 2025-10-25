import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TransactionData, cancelPendingWithdrawalData } from '@/core/validators/transaction.schema'
import type { PendingWithdrawalsResponse, TransactionsResponse } from '@/core/types/transaction'
import { cancelPendingWithdrawals, fetchPendingWithdrawals, fetchTransactions } from '@/core/actions/customer/transactions'


const TRANSACTIONS_QUERY_KEY = ['transactions'];

export function useTransactions(account_no: string ) {
    return useQuery<TransactionsResponse, Error>({
        queryKey: [...TRANSACTIONS_QUERY_KEY, account_no],
        queryFn: async () => {
            try {
                const data: TransactionData = { account_no }

                const res = await fetchTransactions({ data })

                return res
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load transactions'
                throw new Error(error_message)
            }
        }
    })
}

export function usePendingWithdrawals(account_no: string) {
    return useQuery<PendingWithdrawalsResponse, Error>({
        queryKey: [...TRANSACTIONS_QUERY_KEY, account_no],

        queryFn: async () => {
            try {
                const data: TransactionData = { account_no }

                const res = await fetchPendingWithdrawals({ data })

                return res
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load pending withdrawals'
                throw new Error(error_message)
            }
        }
    })
}


export function useCancelPendingWithdrawal() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: cancelPendingWithdrawalData) => cancelPendingWithdrawals({ data }),
        onSuccess: (_res, variables) => {
            toast.success("Next of kin deleted successfully")
            queryClient.invalidateQueries({ queryKey: [...TRANSACTIONS_QUERY_KEY, variables.account_no] })
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to delete next of kin")
        },
        onSettled: (_res, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: [...TRANSACTIONS_QUERY_KEY, variables.account_no] })
        },
    })
}
