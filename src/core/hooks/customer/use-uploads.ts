import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRef } from "react"
import type { UploadDocumentsResponse } from "@/core/types/uploads"
import type { DocumentUploadData } from "@/core/validators/document.schema"
import { uploadClientDocuments } from "@/core/actions/customer/uploads"


export const DOCUMENTS_QUERY_KEY = ['customer', 'documents']


// export const useDocuments = () => {
//     return useQuery<UploadDocumentsResponse, Error>({
//         queryKey: DOCUMENTS_QUERY_KEY,
//         queryFn: async () => {
//             try {
//                 const res = await fetchClientDocuments()
//                 return res
//             } catch (err: any) {
//                 console.error(err)
//                 throw new Error("Failed to load customer documents")
//             }
//         },
//         staleTime: 1000 * 60 * 5, // 5 minutes
//         retry: (failureCount, error: Error) => {
//             if (failureCount >= 3) return false
//             if (error.message.startsWith("4")) return false
//             return true
//         },
//         refetchOnWindowFocus: false,
//     })
// }


export function useUploadDocuments() {
    const queryClient = useQueryClient()
    const abortControllerRef = useRef<AbortController | null>(null)

    const mutation = useMutation({
        mutationFn: async (data: DocumentUploadData) => {
            // Optional: cancel any previous upload in-flight
            abortControllerRef.current?.abort()
            abortControllerRef.current = new AbortController()

            const res = await uploadClientDocuments({
                data,
                signal: abortControllerRef.current.signal,
            })
            return res
        },
        onSuccess: () => {
            toast.success("Documents uploaded successfully")
            queryClient.invalidateQueries({ queryKey: DOCUMENTS_QUERY_KEY })
        },
        onError: (err: any) => {
            if (err.name === "AbortError") {
                toast.warning("Upload cancelled")
            } else {
                toast.error(err?.message ?? "Failed to upload documents")
            }
        },
        onSettled: () => {
            abortControllerRef.current = null
        },
    })

    return {
        ...mutation,
        cancelUpload: () => {
            abortControllerRef.current?.abort()
            abortControllerRef.current = null
        },
    }
}
