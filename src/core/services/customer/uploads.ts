import type { UploadDocumentsResponse } from '@/core/types/uploads'
import type { DocumentUploadData } from '@/core/validators/document.schema'
import { apiClient } from '@/core/lib/api.client'


export async function uploadClientDocumentsService(
    token: string,
    formData: FormData,
): Promise<UploadDocumentsResponse> {
    try {
        const endpoint = '/upload_documents'

        const res = await apiClient.post<UploadDocumentsResponse>(endpoint, formData, {
            headers: {
                'auth-token': token,
            },
        })

        if (res.status_code !== 200) {
            throw new Error(res.message || 'Unable to upload documents')
        }

        return res
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Unable to upload documents. Please try again later.')
    }
}
