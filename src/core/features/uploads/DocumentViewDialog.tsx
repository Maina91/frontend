// import * as React from "react"
// import type { UploadedDocument } from "@/core/types/uploads"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// interface Props {
//     open: boolean
//     onClose: () => void
//     document: UploadedDocument | null
// }

// export function DocumentViewDialog({ open, onClose, document }: Props) {
//     if (!document) return null

//     const isImage = document.url?.match(/\.(jpg|jpeg|png)$/i)
//     const isPDF = document.url?.endsWith(".pdf")

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle>{document.type}</DialogTitle>
//                 </DialogHeader>
//                 <div className="flex justify-center items-center h-full">
//                     {isImage ? (
//                         <img src={document.url} alt={document.type} className="max-h-[70vh] rounded-lg" />
//                     ) : isPDF ? (
//                         <iframe src={document.url} className="w-full h-[70vh]" title={document.type} />
//                     ) : (
//                         <p className="text-muted-foreground">Preview not available</p>
//                     )}
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }
