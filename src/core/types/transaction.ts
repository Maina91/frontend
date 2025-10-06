export interface Transaction {
    net_amount: number
    trans_date: string 
    trans_type: string
}

export type TransactionsResponse = {
    transactions: Transaction[]
    status: number
    status_code: number
    message: string
}