import { useQuery } from '@tanstack/react-query'
import type { BanksResponse, BranchesResponse } from '@/core/types/data/banks'
import { fetchBanks, fetchBranches } from '@/core/actions/data/banks'
import { bankCreateSchema } from '@/core/validators/bank.schema'



export const useBanks = () => {
    return useQuery<BanksResponse, Error>({
        queryKey: ['banks'],
        queryFn: async () => {
            try {
                const res = await fetchBanks()
                return res
            } catch (err: any) {
                console.error('Error fetching banks:', err)
                throw new Error(err?.message ?? 'Failed to fetch banks')
            }
        },
        staleTime: 1000 * 60 * 10, // cache for 10 minutes
        retry: (failureCount, error: Error) => {
            if (failureCount >= 3) return false
            if (error.message.startsWith('4')) return false
            return true
        },
        refetchOnWindowFocus: false,
    })
}


export const useBranches = (bank_code?: string) => {
    const valid = bankCreateSchema.safeParse({ bank_code })

    return useQuery<BranchesResponse, Error>({
        queryKey: ['branches', bank_code],
        enabled: !!bank_code && valid.success, 
        queryFn: async () => {
            if (!bank_code || !valid.success) throw new Error('Invalid bank code')

            try {
                const res = await fetchBranches({ data: { bank_code } })
                return res
            } catch (err: any) {
                console.error('Error fetching branches:', err)
                throw new Error(err?.message ?? 'Failed to fetch branches')
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
