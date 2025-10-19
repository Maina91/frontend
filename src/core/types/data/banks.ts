export interface Bank {
    bank_code: string
    name: string
    short_name?: string
}

export interface Branch {
    branch_code: string
    branch_name: string
    bank_code: string
}

export interface BanksResponse {
    status: number
    status_code: number
    message?: string
    banks: Array<Bank>
    success: boolean
}

export interface BranchesResponse {
    status: number
    status_code: number
    message?: string
    branches: Array<Branch>
    success: boolean
}
