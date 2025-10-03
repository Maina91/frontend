import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchNextOfKin,
    createNextOfKin,
    updateNextOfKin,
    deleteNextOfKin,
} from '@/core/actions/customer/kin'
import type {
    NextOfKinResponse,
} from '@/core/types/kin'
import { toast } from "sonner";
import type { NextOfKinCreateData, NextOfKinUpdateData } from '@/core/validators/kin.schema'


export const useKin = () => {
    return useQuery<NextOfKinResponse, Error>({
        queryKey: ['customer', 'nextOfKin'],
        queryFn: async () => {
            try {
                const res = await fetchNextOfKin()

                return {
                    ...res,
                    next_of_kin: res.next_of_kin ?? [],
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load next of kin details'
                throw new Error(error_message)
            }
        },
        staleTime: 1000 * 60 * 5, 
        retry: (failureCount, error: Error) => {
            if (failureCount >= 3) return false
            if (error.message.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}


export function useCreateKin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: NextOfKinCreateData) => createNextOfKin({ data }),
        onSuccess: () => {
            toast.success("Next of kin added successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to add next of kin")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['customer', 'nextOfKin'] })
        },
    })
}


export function useUpdateKin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: NextOfKinUpdateData) => updateNextOfKin({ data }),
        onSuccess: () => {
            toast.success("Next of kin updated successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to update next of kin")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['customer', 'nextOfKin'] })
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
            queryClient.invalidateQueries({ queryKey: ['customer', 'nextOfKin'] })
        },
    })
}