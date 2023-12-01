import { Dispatch, SetStateAction, useState } from "react"
import { ColumnFiltersState } from "@tanstack/react-table"

export default function SearchFilter ({ 
    setColumnFilters,
    columnFilters
}: {
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
    columnFilters: ColumnFiltersState}) 
{
    // If filter exist grab value, otherwise value=""
    const athleteId = String(columnFilters.find(filter => filter.id === "userId")?.value || "")

    const onFilterChange = (id: string, value: string) => setColumnFilters(
        // Remove previous filter and create new filter object with current input
        prev => prev.filter(filter => filter.id !== id).concat({
            id, value
        })
    ) 

    return (
        <div className="relative mb-4 mt-1 ml-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input 
                type="text"
                value={athleteId}
                onChange={(e) => onFilterChange("userId", e.target.value)}
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Søk etter utøver"/>
        </div>
    )
}