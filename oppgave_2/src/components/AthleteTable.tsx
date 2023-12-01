"use client"

import { Athlete } from "@/types"
import { useEffect, useState } from "react"
import { getCoreRowModel, getFilteredRowModel, useReactTable, flexRender, ColumnFiltersState } from "@tanstack/react-table";
import SearchFilter from "./SearchFilter"
import { useRouter } from 'next/navigation'
import Link from "next/link";

// Define columns
const columns = [
    {
        accessorKey: "userId",
        header: "Utøver",
        cell: (props) => <Link 
                            href={`/athletes/${props.row.original.id}`} 
                            className=" text-blue-500 hover:underline">
                                {props.getValue()}
                        </Link> 
    },
    {
        accessorKey: "gender",
        header: "Kjønn",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "sport",
        header: "Sport",
        cell: (props) => <p>{props.getValue()}</p>
    }
]

export default function AthleteTable () {
    const [athletes, setAthletes] = useState<Athlete[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const router = useRouter()

    // Get all athletes
    useEffect(() => {
        async function getAthletes() {
            const response = await fetch("/api/athlete", {
                method: "get"
            })
            const result = await (response.json()) as { 
                data: Athlete[], 
                success: boolean, 
                error: string 
            }
            if(result.success) {
                setAthletes(result.data)
            } else console.error(result.error)
        }
        getAthletes()
        
    }, [])

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