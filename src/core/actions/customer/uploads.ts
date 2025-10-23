// src/routes/customer/actions/upload.action.ts
import { createServerFn } from '@tanstack/react-start'
import type { UploadDocumentsResponse } from '@/core/types/uploads'
import { documentUploadSchema } from '@/core/validators/document.schema'
import { uploadClientDocumentsService } from '@/core/services/customer/uploads'
import { useAppSession } from '@/core/lib/session'


export const uploadClientDocuments = createServerFn({ method: 'POST' })
    .inputValidator(documentUploadSchema)
    .handler(async ({ data }): Promise<UploadDocumentsResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token
            const member_no = session.data.user?.member_no

            if (!auth_token) throw new Error('Unauthorized')
            if (!member_no) throw new Error('Member number not found in session')

            const formData = new FormData()
            if (data.id_back) formData.append('id_back', data.id_back)
            if (data.passport_photo) formData.append('passport_photo', data.passport_photo)
            if (data.bank_proof) formData.append('bank_proof', data.bank_proof)
            if (data.kra_no) formData.append('kra_no', data.kra_no)
            if (data.tax_exempt_document) formData.append('tax_exempt_document', data.tax_exempt_document)

            const res = await uploadClientDocumentsService(auth_token, formData)
            return res
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to create next of kin',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    })
