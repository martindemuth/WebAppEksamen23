"use client"

import { getById } from "@/features/athletes/athlete.repository"
import { Athlete } from "@/types"
import { useEffect, useState } from "react"

export default function AthletePage (props: { params: { id: string }}) {
    const [athlete, setAthlete] = useState<Athlete>()
   
    const id = props.params.id
    
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
            {JSON.stringify(athlete?.gender)}
        </main>
    )
}