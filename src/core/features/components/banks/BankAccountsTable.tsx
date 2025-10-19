import * as React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { BankDetailsResponse } from '@/core/types/banks'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'


type Props = {
    data: BankDetailsResponse | null
    isLoading: boolean
    isError: boolean
    onCreate: () => void
    onDelete: (bank: any) => void
}


export function BankAccountsTable({ data, isLoading, isError, onCreate, onDelete }: Props) {
    const columns = React.useMemo<Array<ColumnDef<any>>>(() => [
        {
            accessorKey: 'account_name',
            header: 'Account Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'account_no',
            header: 'Account Number',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'name',
            header: 'Bank',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'branch_name',
            header: 'Branch',
            cell: (info) => info.getValue(),
        },
        {
            id: 'actions',
            header: 'Actions',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        size="sm"
                        title="Delete Bank Account"
                        onClick={() => onDelete(row.original)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ],
        [onDelete]
    )

    const table = useReactTable({
        data: data?.banks ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bank Accounts</h2>
                <Button
                    variant="outline" size="sm"
                    onClick={onCreate}>
                    <Plus className="w-4 h-4 mr-1" /> Add Bank Account
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-2 animate-pulse">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-56 bg-gray-200 rounded" />
                </div>
            ) : isError ? (
                <p className="text-red-600 text-sm">Failed to load bank details.</p>
                ) : !data?.banks.length ? (
                <p className="text-gray-500 text-sm">
                    No bank or mobile money accounts found.
                </p>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={cn(header.column.getCanSort() && 'cursor-pointer select-none')}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() === 'asc' && ' 🔼'}
                                            {header.column.getIsSorted() === 'desc' && ' 🔽'}
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

                    {data.mobile_payments_no && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700">
                                Mobile Payment Number
                            </h3>
                            <p className="text-gray-900">{data.mobile_payments_no}</p>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}
