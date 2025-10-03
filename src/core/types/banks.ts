export interface BankAccount {
    id: number
    member_no: string
    account_no: string
    bank_code: string
    branch_code: string
    account_name: string
    account_type: string
    currency_code: string
    default_account: boolean
    verified: boolean
    active: boolean
    name: string // bank name
    branch_name: string
    payment_type?: string
}

export interface BankDetailsResponse {
    status_code: number
    success: boolean
    message: string
    banks: BankAccount[]
    mobile_payments_no: string | null
}