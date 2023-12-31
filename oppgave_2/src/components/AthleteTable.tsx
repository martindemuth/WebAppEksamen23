"use client"

import { Athlete } from "@/types"
import { useState } from "react"
import { getCoreRowModel, getFilteredRowModel, useReactTable, flexRender, ColumnFiltersState, Cell, createColumnHelper } from "@tanstack/react-table";
import SearchFilter from "./SearchFilter"
import { useRouter } from 'next/navigation'
import Link from "next/link";
import useAthletes from "@/features/athletes/useAthletes";
import { getTranslation } from "@/features/translateString";

const columnHelper = createColumnHelper<Athlete>()

// Define columns
const columns = [
    columnHelper.accessor(
        "userId",
        {
            header: "Utøver",
            cell: props =>  <Link href={`/athletes/${props.row.original.id}`} className=" text-blue-500 hover:underline">
                                {props.getValue()}
                            </Link>   
        } 
    ),
    columnHelper.accessor(
        "gender",
        {
            header: "Kjønn",
            cell: props => <p>{getTranslation(props.cell.getValue())}</p>
        }
    ),
    columnHelper.accessor(
        "sport",
        {
            header: "Sport", 
            cell: props => <p>{getTranslation(props.cell.getValue())}</p>
        }
    )
]

export default function AthleteTable () {
    const {athletes} = useAthletes()
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()

    // Get all athletes
    const data = athletes

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
    
    /* 
    React-table: https://www.youtube.com/watch?v=CjqG277Hmgg
    Tailwind: https://flowbite.com/docs/components/tables/
    */
    
    return (  
        <div className="mt-20 mx-28">
            {/* ------ Table Header ------ */}
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                
                {/* ------ Filter ------ */}
                <SearchFilter setColumnFilters={setColumnFilters} columnFilters={columnFilters}/>
                
                {/* ------ Btn Opprett utøver ------ */}
                <button onClick={() => router.push("/athletes")} type="button" className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
                    Ny utøver
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