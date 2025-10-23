import * as React from "react"
import { toast } from "sonner"
import { BankAccountsTable } from "./BankAccountsTable"
import { BankDetailsForm } from "./BankDetailsForm"
import { BankDeleteDialog } from "./BankDeleteDialog"
import { useBank, useCreateBank, useDeleteBank } from "@/core/hooks/customer/use-bank"

export function BankSection() {
    const { data, isLoading, isError } = useBank()
    const createMutation = useCreateBank()
    const deleteBankDetails = useDeleteBank()



    const [showCreateModal, setShowCreateModal] = React.useState(false)
    const [showDeleteModal, setShowDeleteModal] = React.useState(false)
    const [selectedBank, setSelectedBank] = React.useState<any | null>(null)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleCreateBank = async (values: any) => {
        try {
            await createMutation.mutateAsync(values)
            setShowCreateModal(false)
        } catch (error) {
            toast.error("Failed to create bank account")
        }
    }

    const handleDeleteBank = async () => {
        if (!selectedBank) return
        try {
            setIsDeleting(true)
            await deleteBankDetails.mutateAsync(selectedBank.id)
            toast.success("Bank account deleted successfully")
        } catch (error: any) {
            toast.error(error?.message ?? "Failed to delete bank account")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    const handleOpenCreate = () => setShowCreateModal(true)

    const handleOpenDelete = (bank: any) => {
        setSelectedBank(bank)
        setShowDeleteModal(true)
    }

    return (
        <>
            <BankAccountsTable
                data={data ?? null}
                isLoading={isLoading}
                isError={isError}
                onCreate={handleOpenCreate}
                onDelete={handleOpenDelete}
            />

            <BankDetailsForm
                open={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateBank}
            />

            <BankDeleteDialog
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteBank}
                isDeleting={isDeleting}
                bankName={selectedBank?.account_name}
            />
        </>
    )
}
