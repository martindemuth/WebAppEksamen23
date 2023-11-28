"use client"

import { Athlete } from "@/types"
import { useEffect, useState, useMemo } from "react"
import { useTable, useGlobalFilter } from "react-table"
import FilterTable from "./FilterTable"
import { useRouter } from 'next/navigation'

export default function AthleteTable () {
    const [athletes, setAthletes] = useState<Athlete[]>([])
    const router = useRouter()

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
    
    const data = useMemo(() => athletes, [athletes])    
    const columns = useMemo(() => [
        {
            Header: 'Utøver',
            accessor: 'userId'
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
    const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow  } = useTable({ columns, data}, useGlobalFilter)
    const { globalFilter } = state;

    return (  
        <div className="relative overflow-x-auto w-1/2 m-auto mt-28">
            <FilterTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
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
                            <tr {...row.getRowProps()} onClick={() => router.push(`/athletes/${row.original.userId}`)} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-4 py-3">
                                        {cell.render("Cell")}
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