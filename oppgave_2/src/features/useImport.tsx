import { Athlete, AthleteData, Activity, Question, Intervals } from "@/types"
import { useEffect, useState } from "react"

type Pagination = {
    pages: number
    success: boolean
    hasMore: boolean
    page: number
    data: AthleteImportProps[]
}

type AthleteImportProps = {
    id: string
    userId: string
    gender: string
    sport: string
    meta: AthleteData
    activities: ActivityImportProps[]
}

type ActivityImportProps = {
    date: string
    name?: string
    tags?: string[]
    questions?: Question[]
    intervals?: Intervals[]
    goalId?: string
    competitionId?: string
}

export function useImport() {
    const [athletes, setAthletes] = useState<AthleteImportProps[]>([])

    // Får ikke brukt i scripter pga CORS.
    // Får delvis tilgang fra firefox, men ikke fra chrome... 
    const fetchFromApi = async () => {
        try {
            const response = await fetch("https://webapp-api.vercel.app/api/users?page=1", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "https://webapp-api.vercel.app",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            credentials: "include",
            cache: "no-cache",
            
        })
        const result = (await response.json()) as Pagination
        console.log(result) 
        setAthletes(result.data as AthleteImportProps[])
        } catch (error) {
            console.log("Restricted access due to CORS Policy")
            console.log(athletes)
        }
    }

    return ({
        athletes,
        fetchFromApi
    })
}



export const convertToType = async ({athlete}: {athlete: AthleteImportProps}) => {
    throw new Error("Not yet implemented")
}