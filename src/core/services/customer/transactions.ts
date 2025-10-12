import type { TransactionData, cancelPendingWithdrawalData } from '@/core/validators/transaction.schema'
import type { CancelPendingWithdrawalResponse, PendingWithdrawalsResponse, TransactionsResponse } from '@/core/types/transaction'
import { apiClient } from '@/core/lib/api.client'


export async function fetchTransactionsService(
    token: string,
    data: TransactionData,
): Promise<TransactionsResponse> {
    try {
        const endpoint = `/lofty/transaction_history/${data.account_no}`

        const res = await apiClient.get<TransactionsResponse>(endpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to fetch transactions')
        }

        return res


    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch transactions. Please try again later.')
    }
}


export async function fetchPendingWithdrawalsService(
    token: string,
    data: TransactionData,
): Promise<PendingWithdrawalsResponse> {
    try {
        const endpoint = `/lofty/pending_withdrawals/${data.account_no}`

        const res = await apiClient.get<PendingWithdrawalsResponse>(endpoint, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to fetch pending withdrawals')
        }

        return res


    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to fetch pending withdrawals. Please try again later.')
    }
}


export async function cancelPendingWithdrawalService(
    token: string,
    data: cancelPendingWithdrawalData
): Promise<CancelPendingWithdrawalResponse> {
    try {
        const endpoint = `/lofty/cancel_pending_transaction`;

        const res = await apiClient.post<CancelPendingWithdrawalResponse>(endpoint, data, {
            headers: {
                "auth-token": token,
            },
        });

        if (res.status_code !== 200) {
            throw new Error(res.message || "Failed to cancel withdrawal");
        }

        return res;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Unable to cancel withdrawal. Please try again later.");
    }
}


