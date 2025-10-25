import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRef } from "react"
import type { UploadDocumentsResponse } from "@/core/types/uploads"
import type { DocumentUploadData } from "@/core/validators/document.schema"
import { uploadClientDocuments } from "@/core/actions/customer/uploads"


export const DOCUMENTS_QUERY_KEY = ['customer', 'documents']


export const useDocuments = () => {
    return useQuery<UploadDocumentsResponse, Error>({
        queryKey: DOCUMENTS_QUERY_KEY,
        queryFn: async () => {
            // try {
            //     const res = await fetchClientDocuments()
            //     return res
            // } catch (err: any) {
            //     console.error(err)
            //     throw new Error("Failed to load customer documents")
            // }

            // Simulate latency
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Simulate random success or failure for testing
            const shouldFail = Math.random() < 0.1 // 10% failure rate
            if (shouldFail) {
                throw new Error("Failed to load customer documents")
            }

            const mockResponse: UploadDocumentsResponse = {
                documents: [
                    {
                        id: "1",
                        type: "ID Front",
                        url: "https://via.placeholder.com/300x200.png?text=ID+Front",
                        status: "Approved",
                        created_at: new Date().toISOString(),
                    },
                    {
                        id: "2",
                        type: "ID Back",
                        url: "https://via.placeholder.com/300x200.png?text=ID+Back",
                        status: "Pending",
                        created_at: new Date().toISOString(),
                    },
                    {
                        id: "3",
                        type: "KRA Document",
                        url: "https://example.com/dummy.pdf",
                        status: "Rejected",
                        created_at: new Date().toISOString(),
                    },
                ],
            }

            return mockResponse
        }
    })
}


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
