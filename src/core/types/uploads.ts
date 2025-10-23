export interface UploadedDocument {
    id_front?: string | null
    id_back?: string | null
    passport_photo?: string | null
    bank_proof?: string | null
    kra_no?: string | null
    tax_exempt_document?: string | null
}

export interface UploadDocumentsResponse {
    status_code: number
    message: string
    member_no: string
    files: UploadedDocument
    success?: boolean
}
