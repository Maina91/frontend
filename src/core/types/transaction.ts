export interface Transaction {
    net_amount: number
    trans_date: string 
    trans_type: string
}

export type TransactionsResponse = {
    transactions: Array<Transaction>
    status: number
    status_code: number
    message: string
}

export interface PendingWithdrawalTransaction {
    trans_type: string
    trans_date: string 
    trans_id: string 
    account_no: string
    amount: number
    mop: string | null
    reason?: string | null
}


export type PendingWithdrawalsResponse = {
    status: number
    status_code: number
    message: string
    transactions: Array<PendingWithdrawalTransaction>
    totals: number| null
    count_pending_transactions: number
    count_monthly_transactions: number
}

export interface CancelPendingWithdrawalResponse {
    status: number;
    status_code: number;
    message: string;
}