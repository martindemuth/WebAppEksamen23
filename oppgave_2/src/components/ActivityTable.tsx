"use client"
import { useState } from "react"
import { getCoreRowModel, getFilteredRowModel, useReactTable, flexRender, ColumnFiltersState } from "@tanstack/react-table";
import DropdownFilter from "./DropdownFilter"

// Type
type Activity = {
    date: string,
    name: string,
    tags: string[],
    sport: string,
    rapport: string
}

// Dummy data for activities
const activities: Activity[] = [
    {
        "date": "23/12/2023",
        "name": "Rolig kveldstur",
        "tags": [
            "Lett",
            "grus"
        ],
        "sport": "Løp",
        "rapport": "no"
    },
    {
        "date": "27/12/2023",
        "name": "Super pump",
        "tags": [
            "Moderat"
        ],
        "sport": "Styrke",
        "rapport": "high"
    }
]

// Define columns
const columns = [
    {
        accessorKey: 'sport',
        header: 'Sport',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'date',
        header: 'Dato',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'name',
        header: 'Tittel',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'tags',
        header: 'Tags',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: 'rapport',
        header: 'Rapport',
        cell: (props) => <p>{props.getValue()}</p>
    }
]

// Filter-values for sport types
const sportFilterItems = ["Alle", "Løp", "Sykkel", "Ski", "Triathlon", "Svømming", "Styrke", "Annet"]

// Filter-values for rapport-status
const reportFilterItems = ["Alle", "no", "low", "normal", "high"]

export default function ActicityTable() {
    const [data, setData] = useState(activities)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    
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
                <DropdownFilter setColumnFilters={setColumnFilters} columnToFilter={"sport"} items={sportFilterItems} defaultItem={"Alle"} />
                <DropdownFilter setColumnFilters={setColumnFilters} columnToFilter={"rapport"} items={reportFilterItems} defaultItem={"Alle"} />
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