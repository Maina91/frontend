import { FC } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PendingWithdrawalTransaction } from '@/core/types/transaction'

interface Props {
    data: PendingWithdrawalTransaction[]
}

export const PendingWithdrawalsTable: FC<Props> = ({ data }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Reason</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((tx) => (
                        <TableRow key={`${tx.trans_id}-${tx.trans_date}`}>
                            <TableCell>{new Date(tx.trans_date).toLocaleDateString()}</TableCell>
                            <TableCell>{tx.trans_type}</TableCell>
                            <TableCell className="font-medium">KES {tx.amount.toLocaleString()}</TableCell>
                            <TableCell>{tx.mop ?? "—"}</TableCell>
                            <TableCell>{tx.reason ?? "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
