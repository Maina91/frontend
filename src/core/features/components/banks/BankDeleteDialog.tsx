import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"


type BankDeleteDialogProps = {
    open: boolean
    onClose: () => void
    onConfirm: () => Promise<void>
    bankName?: string
    isDeleting?: boolean
}


export function BankDeleteDialog({
    open,
    onClose,
    onConfirm,
    isDeleting,
}: BankDeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Bank Account</AlertDialogTitle>
                    <AlertDialogDescription>
                        {`Are you sure you want to delete this account? This action cannot be undone.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row-reverse justify-between sm:justify-between">
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={onConfirm}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
