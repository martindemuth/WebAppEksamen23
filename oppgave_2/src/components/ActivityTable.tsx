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
        <div className="mt-20 mx-28">
            {/* ------ Table Header ------ */}
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                
                {/* ------ Filter ------ */}
                <div className="flex space-x-4">
                    <DropdownFilter setColumnFilters={setColumnFilters} columnToFilter={"sport"} items={sportFilterItems} defaultItem={"Alle"} />
                    <DropdownFilter setColumnFilters={setColumnFilters} columnToFilter={"rapport"} items={reportFilterItems} defaultItem={"Alle"} />
                </div>
                
                {/* ------ Btn Opprett økt ------ */}
                <button type="button" className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
                    Opprett økt
                </button>
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
        </div>
    )
}