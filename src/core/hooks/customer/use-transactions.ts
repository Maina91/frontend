import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTransactions, fetchPendingWithdrawals, cancelPendingWithdrawals } from '@/core/actions/customer/transactions'
import type { TransactionData, cancelPendingWithdrawalData } from '@/core/validators/transaction.schema'
import { TransactionsResponse, PendingWithdrawalsResponse } from '@/core/types/transaction'
import { toast } from "sonner";


export function useTransactions(account_no: string ) {
    return useQuery<TransactionsResponse, Error>({
        queryKey: ['transactions', account_no],

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
        },
        enabled: !!account_no,
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error: Error) => {
            if (failureCount >= 3) return false
            if (error.message.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}

export function usePendingWithdrawals(account_no: string) {
    return useQuery<PendingWithdrawalsResponse, Error>({
        queryKey: ['pending_withdrawals', account_no],

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
        },
        enabled: !!account_no,
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error: Error) => {
            if (failureCount >= 3) return false
            if (error.message.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}


export function useCancelPendingWithdrawal() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: cancelPendingWithdrawalData) => cancelPendingWithdrawals({ data }),
        onSuccess: (_res, variables) => {
            toast.success("Next of kin deleted successfully")
            queryClient.invalidateQueries({ queryKey: ['pending_withdrawals', variables.account_no] })
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to delete next of kin")
        },
        onSettled: (_res, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: ['transactions', variables.account_no] })
        },
    })
}
