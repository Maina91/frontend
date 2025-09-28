export interface NextOfKinCreateInput {
    full_name: string
    id_passport_number?: string | null
    mobile?: string | null
    email?: string | null
    relationship: string
}

export interface NextOfKinUpdateInput {
    id: number
    full_name?: string
    id_passport_number?: string | null
    mobile?: string | null
    email?: string | null
    relationship?: string
}

export interface NextOfKin {
    id: number
    full_name: string
    id_passport_number: string | null
    mobile: string | null
    email: string | null
    relationship: string
}


export interface NextOfKinResponse {
    status: number
    status_code: number
    message: string
    next_of_kin: NextOfKin[]
    success?: boolean
}
