import { Dispatch, SetStateAction, useState } from "react"
import { ColumnFiltersState } from "@tanstack/react-table"

export default function DropdownFilter({ 
    setColumnFilters, 
    columnToFilter, 
    items, 
    defaultItem
}: {
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
    columnToFilter: string,
    items: string[],
    defaultItem: string
}) {

    const [isOpen, setIsOpen] = useState(false)

    const openCloseDropdown = () => setIsOpen(!isOpen)
    
    const handleSelected = (item: string) => {
        const filterValue = item === defaultItem ? "" : item

        setColumnFilters([
            {
                id: columnToFilter,
                value: filterValue,
            },
        ]);
        openCloseDropdown();
    }

    return (
        <div>

            {/* ------ Open/close button ------ */}
            <button onClick={openCloseDropdown} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                {columnToFilter}
                <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            {/* ------ Dropdown Menu ------ */}
            <div className={`${isOpen ? 'block' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    {items.map(item => 
                    <li 
                        key={item} 
                        onClick={() => handleSelected(item)}  
                        className="block px-4 py-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {item}
                    </li>)}
                </ul>
            </div>
        </div>
    )


}