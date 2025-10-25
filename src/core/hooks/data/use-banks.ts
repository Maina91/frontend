import { useQuery } from '@tanstack/react-query'
import type { BanksResponse, BranchesResponse } from '@/core/types/data/banks'
import { fetchBanks, fetchBranches } from '@/core/actions/data/banks'
import { bankCreateSchema } from '@/core/validators/bank.schema'


const BANKS_QUERY_KEY = ['banks'];

export const useBanks = () => {
    return useQuery<BanksResponse, Error>({
        queryKey: BANKS_QUERY_KEY,
        queryFn: async () => {
            try {
                const res = await fetchBanks()
                return res
            } catch (err: any) {
                console.error('Error fetching banks:', err)
                throw new Error(err?.message ?? 'Failed to fetch banks')
            }
        }
    })
}


export const useBranches = (bank_code?: string) => {
    const valid = bankCreateSchema.safeParse({ bank_code })

    return useQuery<BranchesResponse, Error>({
        queryKey: BANKS_QUERY_KEY,
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
        }
    })
}
