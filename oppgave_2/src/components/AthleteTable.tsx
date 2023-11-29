"use client"

import { Athlete } from "@/types"
import { useEffect, useState, useMemo } from "react"
import { useTable, useGlobalFilter } from "react-table"
import FilterTable from "./FilterTable"
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function AthleteTable () {
    const [athletes, setAthletes] = useState<Athlete[]>([])
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
    
    // Set up data and columns for table
    const data = useMemo(() => athletes, [athletes])    
    const columns = useMemo(() => [
        {
            Header: 'Utøver',
            accessor: 'userId',
        },
        {
            Header: 'Kjønn',
            accessor: 'gender'
        },
        {
            Header: 'Sport',
            accessor: 'sport'
        }
    ], [])

    /* 
    React-table: https://www.youtube.com/watch?v=A9oUTEP-Q84 
    Glbal Filter: https://hygraph.com/blog/react-table#implmenting-react-table-filtersearch-functionality
    Tailwind: https://flowbite.com/docs/components/tables/
    */
    
    // Rect-table functions
    const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow  } = useTable({ columns, data}, useGlobalFilter)
    const { globalFilter } = state;

    return (  
        <div className="mt-20 mx-28">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <FilterTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
                <button onClick={() => router.push("/athletes")} type="button" className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
                    Ny utøver
                </button>
            </div>
            <table {...getTableProps()} className="w-full text-lg text-left rtl:text-right">
                <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th scope="col"  {...column.getHeaderProps()} className="px-4 py-3">
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-4 py-3">
                                        {cell.column.id === "userId" ? (
                                            <Link href={`/athletes/${row.original.userId}`} className=" text-blue-500 hover:underline">   
                                                {cell.render("Cell")}   
                                            </Link>
                                        ) : (
                                            cell.render("Cell") 
                                            )
                                        }    
                                    </td>
                                ))}
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}