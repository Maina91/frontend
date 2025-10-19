import { createServerFn } from '@tanstack/react-start'
import type { BanksResponse, BranchesResponse } from '@/core/types/data/banks'
import { fetchBanksService, fetchBranchesService } from '@/core/services/data/banks'
import { bankCreateSchema } from '@/core/validators/bank.schema'
import { useAppSession } from '@/core/lib/session'


export const fetchBanks = createServerFn({ method: 'GET' })
.handler(async (): Promise<BanksResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const res = await fetchBanksService(auth_token)

            return {
                status: res.status,
                status_code: res.status_code,
                message: res.message,
                banks: res.banks,
                success: true,
            }
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch banks',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    },
)

export const fetchBranches = createServerFn({ method: 'GET' })
.inputValidator(bankCreateSchema.pick({ bank_code:true }))
.handler(async ({ data }): Promise<BranchesResponse> => {
        try {
            const session = await useAppSession()
            const auth_token = session.data.auth_token

            if (!auth_token) throw new Error('Unauthorized') 

            const res = await fetchBranchesService(auth_token, data.bank_code)

            return {
                status: res.status,
                status_code: res.status_code,
                message: res.message,
                branches: res.branches,
                success: true,
            }
        } catch (err: any) {
            throw {
                message: err?.message ?? 'Unable to fetch branches',
                fieldErrors: err?.fieldErrors ?? null,
            }
        }
    },
)
