export interface NextOfKin {
    id: number
    full_name: string
    id_passport_number?: string 
    mobile?: string 
    email?: string 
    relationship: string
}


export interface NextOfKinResponse {
    status: number
    status_code: number
    message: string
    next_of_kin: Array<NextOfKin>
    success?: boolean
}
