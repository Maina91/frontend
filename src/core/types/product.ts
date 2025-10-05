export interface Product {
    rate_date: string | null
    interest_rate: number | null
    fund_type: string | null
    fund_name: string
    fund_description: string | null
    fund_trustee: string | null
    risk_profile: string | null
    agent_comm: number | null
    management_fee: number | null
    custody_fee: number | null
    trustee_fee: number | null
    abbreviation: string | null
    security_code: string
    contribution_account_no: string | null
    currency_code: string | null
    annual_yield: number | null
    custodian: string | null
    minimum_investment: number | null
    initial_deposit: number | null
    minimum_withdrawal: number | null
    allow_mpesa_payments: number
    other_yield: string | null
    yield_used: string | null
}

export interface RawProductResponse {
    status: number
    status_code: number
    message: string
    securities: {
        rows: Product[]
    }
    success?: boolean
}


export interface ProductResponse {
    status: number
    status_code: number
    message: string
    securities: Product[]   
    success?: boolean
}
