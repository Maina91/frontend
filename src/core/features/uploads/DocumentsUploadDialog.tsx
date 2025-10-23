// components/customer/documents/DocumentsUploadDialog.tsx
import { useState } from "react"
import { toast } from "sonner"
import { FileIcon, UploadCloud, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useUploadDocuments } from "@/core/hooks/customer/use-uploads"
import { cn } from "@/lib/utils"

type DocumentsUploadDialogProps = {
    open: boolean
    onClose: () => void
}

type DocumentFields = {
    id_front?: File
    id_back?: File
    passport_photo?: File
    bank_proof?: File
    kra_no?: File
    tax_exempt_document?: File
}

const DOCUMENT_FIELDS: Array<{ key: keyof DocumentFields; label: string }> = [
    { key: "id_front", label: "ID Front" },
    { key: "id_back", label: "ID Back" },
    { key: "passport_photo", label: "Passport Photo" },
    { key: "bank_proof", label: "Bank Proof" },
    { key: "kra_no", label: "KRA Certificate" },
    { key: "tax_exempt_document", label: "Tax Exemption Document" },
]

export function DocumentsUploadDialog({ open, onClose }: DocumentsUploadDialogProps) {
    const [documents, setDocuments] = useState<DocumentFields>({})
    const { mutateAsync: uploadDocuments, isPending, cancelUpload } = useUploadDocuments()

    const handleFileChange = (key: keyof DocumentFields, fileList: FileList | null) => {
        if (!fileList?.length) return
        setDocuments((prev) => ({ ...prev, [key]: fileList[0] }))
    }

    const handleRemove = (key: keyof DocumentFields) => {
        setDocuments((prev) => {
            const updated = { ...prev }
            delete updated[key]
            return updated
        })
    }

    const handleUpload = async () => {
        if (Object.keys(documents).length === 0) {
            toast.warning("Please select at least one document to upload")
            return
        }

        try {
            await uploadDocuments(documents)
            toast.success("Documents uploaded successfully")
            setDocuments({})
            onClose()
        } catch (error: any) {
            toast.error(error.message ?? "Failed to upload documents")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Upload Documents</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {DOCUMENT_FIELDS.map(({ key, label }) => (
                        <div key={key} className="space-y-1">
                            <Label htmlFor={key}>{label}</Label>
                            <div
                                className={cn(
                                    "flex items-center justify-between border rounded-md p-2 bg-muted/10",
                                    "hover:bg-muted/20 transition"
                                )}
                            >
                                {documents[key] ? (
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2 truncate">
                                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm truncate max-w-[200px]">
                                                {documents[key].name}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-muted-foreground hover:text-red-500 transition"
                                            onClick={() => handleRemove(key)}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor={key}
                                        className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-primary transition"
                                    >
                                        <UploadCloud className="h-4 w-4 text-primary/70" />
                                        <span>Upload {label}</span>
                                        <Input
                                            id={key}
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png,.docx"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(key, e.target.files)}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => {
                            cancelUpload()
                            onClose()
                        }}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={Object.keys(documents).length === 0 || isPending}
                    >
                        {isPending ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
