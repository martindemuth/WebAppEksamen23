"use client"

import { Athlete } from "@/types"
import { useEffect, useState, useMemo } from "react"
import { useTable, useGlobalFilter } from "react-table"
import FilterTable from "./FilterTable"

export default function AthleteTable () {
    const [athletes, setAthletes] = useState<Athlete[]>([])

    // Fetch a list with all athletes 
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
        console.log(athletes)
    }, [])

    const fakeData = [
        {
          userId: "user1",
          gender: "Mann",
          sport: "Soccer",
        },
        {
          userId: "user2",
          gender: "Kvinne",
          sport: "Løp",
        },
        {
          userId: "user3",
          gender: "Mann",
          sport: "Svømming",
        },
        {
          userId: "user4",
          gender: "Kvinne",
          sport: "Tennis",
        }
      ]

    const data = useMemo(() => fakeData, [])
    const columns = useMemo(() => [
        {
            Header: "Utøver",
            accessor: "userId",
        },
        {
            Header: "Kjønn",
            accessor: "gender"
        },
        {
            Header: "Sport",
            accessor: "sport"
        },
    ], [])

    /* 
    React-table: https://www.youtube.com/watch?v=A9oUTEP-Q84 
    Glbal Filter: https://hygraph.com/blog/react-table#implmenting-react-table-filtersearch-functionality
    Tailwind: https://flowbite.com/docs/components/tables/
    */
    const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow  } = useTable({columns, data}, useGlobalFilter)
    const { globalFilter } = state;

    return (  
        <div className="relative overflow-x-auto w-1/2 m-auto mt-28">
            <FilterTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
            <table className="w-full text-lg text-left rtl:text-right" {...getTableProps()}>
                <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th className="px-4 py-3" {...column.getHeaderProps()}>
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
                            <tr className="border-b dark:bg-gray-800 dark:border-gray-700" {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td className="px-4 py-3" {...cell.getCellProps()}>
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