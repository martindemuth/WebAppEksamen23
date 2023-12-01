"use client"

import ActicityTable from "@/components/ActivityTable"
import Navigation from "@/components/Navigation"
import { getByUserId } from "@/features/athletes/athlete.repository"
import { Athlete } from "@/types"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function AthletePage (props: { params: { id: string }}) {
    const [athlete, setAthlete] = useState<Athlete>()
    const router = useRouter()
   
    const id = props.params.id
    console.log(id)
    
    useEffect(() => {
        async function getAthlete() {
            const response = await fetch(`/api/athlete/${id}`, {
                method: "get"
            })
            const result = await (response.json()) as { 
                data: Athlete, 
                success: boolean, 
                error: string 
            }
            if(result.success) {
                setAthlete(result.data)
            } else console.error(result.error)
        }
        getAthlete()    
    }, [])

    return (
        <main>
            <Navigation />
            <div className="mt-20 mx-28">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                    <button 
                    type="button" 
                    onClick={() => router.push(`/athletes/${id}/activities`)}
                    className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
                        Opprett økt
                    </button>
                    <ActicityTable />
                </div>
            </div>  
        </main>
    )
}