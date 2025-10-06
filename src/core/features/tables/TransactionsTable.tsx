import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Transaction } from '@/core/types/transaction'

interface TransactionsTableProps {
    data: Transaction[]
}

export function TransactionsTable({ data }: TransactionsTableProps) {
    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: 'trans_date',
            header: 'Date',
            cell: (info) =>
                new Date(info.getValue<string>()).toLocaleDateString(),
        },
        {
            accessorKey: 'trans_type',
            header: 'Type',
        },
        {
            accessorKey: 'net_amount',
            header: 'Amount',
            cell: (info) => {
                const value = info.getValue<number>()
                return (
                    <span
                        className={`font-semibold ${value > 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {value > 0 ? `+KES ${value}` : `-KES ${Math.abs(value)}`}
                    </span>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
