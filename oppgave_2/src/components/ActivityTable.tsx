"use client"
import { useEffect, useState } from "react"
import { getCoreRowModel, getFilteredRowModel, useReactTable, flexRender, ColumnFiltersState, createColumnHelper } from "@tanstack/react-table";
import DropdownFilter from "./DropdownFilter"
import { Activity } from "@/types";
import { getTranslation } from "@/features/translateString";

const columnHelper = createColumnHelper<Activity>()

// Define columns
const columns = [
    columnHelper.accessor(
        "sport",
        {
            header: "Sport",
            cell: props => <p>{getTranslation(props.cell.getValue())}</p>
        }
    ),
    columnHelper.accessor(
        "date",
        {
            header: "Dato",
            cell: props => {
                const date: Date = props.row.getValue(props.column.id)
                return <p>{new Date(date).toLocaleDateString()}</p>
            }
        }
    ),
    columnHelper.accessor(
        "name",
        {
            header: "Tittel",
            cell: props => <p>{props.getValue()}</p>
        }
    ),
    columnHelper.accessor(
        "tags",
        {
            header: "Tags",
            cell: props => 
            <ul className="flex flex-col md:flex-row">
                {props.getValue().map(prop =>
                    <li key={prop} className="bg-blue-50 p-1 rounded mb-2 md:mb-0 md:mr-2">
                        {prop.toLowerCase()}
                    </li>)}
            </ul>
        }
    ),
    columnHelper.accessor(
        // TODO: Not implemented, just showing dummy
        "rapport",
        {
            header: "Rapport",
            cell: <p>-</p>  
        }
    )
]

// Filter-values for sport types
const sportFilterItems = ["Alle", "running", "cycling", "skiing", "triathlon", "swimming", "strength", "other"]

// Filter-values for rapport-status
const reportFilterItems = ["Alle", "no", "low", "normal", "high"]

export default function ActivityTable(
    { url }: { url: string }  
) {
    const [data, setData] = useState<Activity[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    useEffect(() => {
        const fetchActivites = async () => {
            const response = await fetch(url, {
                method: "GET",
                
            })
            const result = (await response.json()) as {success: boolean, data: Activity[]}
            setData(result.data)
        }
        fetchActivites()
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