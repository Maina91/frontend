// components/customer/documents/DocumentsSection.tsx
import * as React from "react"
import { toast } from "sonner"

import { DocumentsTable } from "./DocumentsTable"
import { DocumentsUploadDialog } from "./DocumentsUploadDialog"
import type { UploadedDocument } from "@/core/types/uploads"
// import { DocumentViewDialog } from "./DocumentViewDialog"
import { useDocuments } from "@/core/hooks/customer/use-uploads"

export function DocumentsSection() {
    const { data, isLoading, isError } = useDocuments()
    const [showUploadDialog, setShowUploadDialog] = React.useState(false)
    const [showViewDialog, setShowViewDialog] = React.useState(false)
    const [selectedDoc, setSelectedDoc] = React.useState<UploadedDocument | null>(null)

    const handleOpenView = (doc: UploadedDocument) => {
        setSelectedDoc(doc)
        setShowViewDialog(true)
    }

    return (
        <>
            <DocumentsTable
                data={data?.files ?? []}
                isLoading={isLoading}
                isError={isError}
                onUpload={() => setShowUploadDialog(true)}
                onView={handleOpenView}
            />

            <DocumentsUploadDialog
                open={showUploadDialog}
                onClose={() => setShowUploadDialog(false)}
            />

            {/* <DocumentViewDialog
                open={showViewDialog}
                onClose={() => setShowViewDialog(false)}
                document={selectedDoc}
            /> */}
        </>
    )
}
