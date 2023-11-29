import { useMemo } from "react"
import { useTable } from "react-table"

export default function ActicityTable() {
    
    // Dummy data for activities
    const activities = [
        {
            "date": "Tor, 23/12/2023",
            "name": "Rolig kveldstur",
            "tags": [
                "Lett",
                "grus"
            ],
            "sport": "Løp",
            "rapport": "mo"
        }
    ]

    // Set up data and columns for table
    const data = useMemo(() => activities, [activities])    
    const columns = useMemo(() => [
        {
            Header: 'Sport',
            accessor: 'sport',
        },
        {
            Header: 'Dato',
            accessor: 'date'
        },
        {
            Header: 'Tittel',
            accessor: 'name'
        },
        {
            Header: 'Rapport',
            accessor: 'rapport'
        },
        {
            Header: 'Tags',
            accessor: 'tags'
        }
    ], [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow  } = useTable({ columns, data })
    
    return (
        <div className="mt-20 mx-28">
            {/* ------ Table Header ------ */}
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                {/* ------ Dropdown Sport ------ */}
                <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Action button</span>
                    Sport
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                {/* ------ Btn Opprett økt ------ */}
                <button type="button" className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
                    Opprett økt
                </button>
            </div>
            {/* ------ Column Headers ------ */}
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
                {/* ------ Rows ------ */}
                {/*<tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-4 py-3">
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr> 
                        )
                    })}
                </tbody>*/}
            </table>
        </div>

    )
}