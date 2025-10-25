import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
    NextOfKinResponse,
} from '@/core/types/kin'
import type { NextOfKinData } from '@/core/validators/kin.schema'
import {
    createNextOfKin,
    deleteNextOfKin,
    fetchNextOfKin,
    updateNextOfKin,
} from '@/core/actions/customer/kin'


const KIN_QUERY_KEY = ['customer', 'nextOfKin'];

export const useKin = () => {
    return useQuery<NextOfKinResponse, Error>({
        queryKey: KIN_QUERY_KEY,
        queryFn: async () => {
            try {
                const res = await fetchNextOfKin()

                return {
                    ...res,
                    next_of_kin: res.next_of_kin,
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load next of kin details'
                throw new Error(error_message)
            }
        },
    })
}


export function useCreateKin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: NextOfKinData) => createNextOfKin({ data }),
        onSuccess: () => {
            toast.success("Next of kin added successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to add next of kin")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: KIN_QUERY_KEY })
        },
    })
}


export function useUpdateKin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: NextOfKinData) => updateNextOfKin({ data }),
        onSuccess: () => {
            toast.success("Next of kin updated successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to update next of kin")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: KIN_QUERY_KEY })
        },
    })
}


export function useDeleteKin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteNextOfKin({ data: { id } }),
        onSuccess: () => {
            toast.success("Next of kin deleted successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to delete next of kin")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: KIN_QUERY_KEY })
        },
    })
}