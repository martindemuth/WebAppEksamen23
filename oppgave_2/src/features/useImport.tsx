import { Athlete, AthleteData, Activity } from "@/types"
import { useEffect, useState } from "react"

type AthleteImportProps = {
    id: string
    userId: string
    gender: string
    sport: string
    meta: AthleteData
    activities: Activity[]
}

export function useImport() {
    const [athletes, setAthletes] = useState<Athlete[]>([])
    
    useEffect(() => {
        //fetchFromApi()
        console.log(athletes)
    }, [])


    const fetchFromApi = async () => {
        try {
            const response = await fetch("https://webapp-api.vercel.app/api/users", {
            method: "GET",
            cache: "no-cache"
        })
        const result = (await response.json()) as { data: Athlete[] }
        console.log(result.data) 
        setAthletes(result.data as Athlete[])
        } catch (error) {
            console.log("Restricted access due to CORS Policy")
        }
    }

    return ({
        athletes,
        fetchFromApi
    })
}



export const convertToType = async ({athlete}: {athlete: AthleteImportProps}) => {
    
}