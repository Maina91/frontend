import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

export const documentUploadSchema = z.object({
    id_front: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or PDF files allowed"
        ),
    id_back: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or PDF files allowed"
        ),
    passport_photo: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or PDF files allowed"
        ),
    bank_proof: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or PDF files allowed"
        ),
    kra_no: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or PDF files allowed"
        ),
    tax_exempt_document: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or PDF files allowed"
        ),
})

export type DocumentUploadData = z.infer<typeof documentUploadSchema>
