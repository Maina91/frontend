import * as React from "react"
import { Eye, Upload } from "lucide-react"
import type { UploadedDocument } from "@/core/types/uploads"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Props {
    data: Array<UploadedDocument>
    isLoading: boolean
    isError: boolean
    onUpload: () => void
    onView: (doc: UploadedDocument) => void
}

export function DocumentsTable({ data, isLoading, isError, onUpload, onView }: Props) {
    if (isError) return <div className="text-red-500">Failed to load documents.</div>
    if (isLoading) return <div className="text-muted-foreground">Loading documents...</div>

    return (
        <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold">Uploaded Documents</h2>
                <Button onClick={onUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Document Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Uploaded On</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                                    No documents uploaded yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((doc) => (
                                <TableRow key={doc.}>
                                    <TableCell>{doc.type}</TableCell>
                                    <TableCell>{doc.status}</TableCell>
                                    <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => onView(doc)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody> */}
                </Table>
            </CardContent>
        </Card>
    )
}
