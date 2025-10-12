export interface Beneficiary {
    id: number
    full_name: string
    id_passport_number: string | null
    mobile: string | null
    email: string | null
    relationship: string
    percentage_share: string | null
}


export interface BeneficiariesResponse {
    status: number
    status_code: number
    message: string
    beneficiaries: Array<Beneficiary>
    success?: boolean
}