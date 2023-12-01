import { Athlete, Result } from "@/types";
import { useEffect, useState } from "react";

export default function useAthletes() {
    const [athletes, setAthletes] = useState<Athlete[]>([])

    useEffect(() => {
        if(athletes.length === 0) {
            fetchAll()
        }
        athletes.forEach((athlete) => console.log(athlete))
    }, [])

    const fetchAll = async () => {
        try {
            const response = await fetch("/api/athlete", {
                method: "GET"
            })
            const result = (await response.json()) as {success: boolean, data: Athlete[]}
            setAthletes(result.data)
            console.log("Loaded in athletes from Prisma, \n" + athletes)
        } catch (error) {
            console.error(JSON.stringify(error))
        }
    }

    async function postToAthlete<T>() {
        throw new Error("Not yet implemented")
    }

    return ({
        athletes
    })
}