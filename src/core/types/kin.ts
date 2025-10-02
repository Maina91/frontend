export interface NextOfKin {
    id: number
    full_name: string
    identification_no?: string 
    mobile_no?: string 
    email_address?: string 
    relationship: string
}


export interface NextOfKinResponse {
    status: number
    status_code: number
    message: string
    next_of_kin: NextOfKin[]
    success?: boolean
}
