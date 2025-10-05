import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchBankDetails,
    createBankDetails,
    updateBankDetails,
    deleteBankDetails
} from '@/core/actions/customer/bank'
import type { BankDetailsResponse } from "@/core/types/banks";
import type { BankCreateData, BankUpdateData } from '@/core/validators/bank.schema'
import { toast } from "sonner";


export const useBank = () => {
    return useQuery <BankDetailsResponse, Error>({
        queryKey: ['customer', 'bankDetails'],
        queryFn: async () => {
            try {
                const res = await fetchBankDetails()

                return {
                    ...res,
                    banks: res.banks ?? [],
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load bank details'
                throw new Error(error_message)
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error: any) => {
            if (failureCount >= 3) return false
            if (error?.message?.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}


export function useCreateBank() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: BankCreateData) => createBankDetails({ data }),
        onSuccess: () => {
            toast.success("Bank details added successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to add bank details")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['customer', 'bankDetails'] })
        },
    })
}


export function useUpdateBank() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: BankUpdateData) => updateBankDetails({ data }),
        onSuccess: () => {
            toast.success("Bank details updated successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to update bank details")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['customer', 'bankDetails'] })
        },
    })
}


export function useDeleteBank() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteBankDetails({ data: { id } }),
        onSuccess: () => {
            toast.success("Bank details deleted successfully")
        },
        onError: (err: any) => {
            toast.error(err?.message ?? "Failed to delete bank details")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['customer', 'bankDetails'] })
        },
    })
}