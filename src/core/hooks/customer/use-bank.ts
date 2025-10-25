import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { BankDetailsResponse } from "@/core/types/banks";
import type { BankCreateData, BankUpdateData } from '@/core/validators/bank.schema'
import {
    createBankDetails,
    deleteBankDetails,
    fetchBankDetails,
    updateBankDetails
} from '@/core/actions/customer/bank'

const BANK_QUERY_KEY = ['customer', 'bankDetails'];


export const useBank = () => {
    return useQuery <BankDetailsResponse, Error>({
        queryKey: BANK_QUERY_KEY,
        queryFn: async () => {
            try {
                const res = await fetchBankDetails()

                return {
                    ...res,
                    banks: res.banks,
                }
            } catch (err: any) {
                const error = err?.message ?? ''
                console.error(error)

                const error_message = 'Failed to load bank details'
                throw new Error(error_message)
            }
        },
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
            queryClient.invalidateQueries({ queryKey: BANK_QUERY_KEY })
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
            queryClient.invalidateQueries({ queryKey: BANK_QUERY_KEY })
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
            queryClient.invalidateQueries({ queryKey: BANK_QUERY_KEY })
        },
    })
}