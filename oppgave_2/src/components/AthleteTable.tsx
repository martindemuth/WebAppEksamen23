"use client"
import { Athlete } from "@prisma/client"
import React, { useEffect, useState } from "react"
export default function AthleteTable () {
    const [athletes, setAthletes] = useState<Athlete[]>([])

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

    return (

        <p>
            Table kommer her
        </p>

    )
}