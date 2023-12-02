"use client"
import { useEffect, useState } from "react"
import { getCoreRowModel, getFilteredRowModel, useReactTable, flexRender, ColumnFiltersState } from "@tanstack/react-table";
import DropdownFilter from "./DropdownFilter"
import { TrainingGoal } from "@/types";


// Define columns
const columns = [
    {
        accessorKey: 'date',
        header: 'Dato',
        cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'name',
        header: 'Navn',
        cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'goalTarget',
        header: 'Mål',
        cell: (props: any) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'comment',
        header: 'Kommentar',
        cell: (props: any) => <p>{props.getValue()}</p>
    }
]

export default function TrainingGoalTable(
    { id }: { id: string }  
) {
    const [data, setData] = useState<TrainingGoal[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await fetch(`/api/athlete/${id}/training-goals`, {
                method: "GET",
                
            })
            const result = (await response.json()) as {success: boolean, data: TrainingGoal[]}
            setData(result.data)
        }
        fetchGoals()
    }, [])
    
    // React-table
    const table = useReactTable({
        data, 
        columns,
        state: {
            columnFilters    
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
     })
    
    return (
        <>
            {/* ------ Filter ------ */}
            <div className="flex space-x-4">
                <DropdownFilter setColumnFilters={setColumnFilters} columnToFilter={"sport"} items={[]} defaultItem={"Alle"} />
                <DropdownFilter setColumnFilters={setColumnFilters} columnToFilter={"rapport"} items={[]} defaultItem={"Alle"} />
            </div>                
            {/* ------ Column Headers ------ */}
            <table className="w-full text-lg text-left rtl:text-right">
                <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {table.getHeaderGroups().map(headerGroup => ( 
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-4 py-3">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {/* ------ Rows ------ */}
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 py-3">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>        
    )
}