'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
// import { Navigation } from "../../components/Navigation";
import { useRouter } from "next/navigation";
import { Competition } from "@/types";
import useAthletes from "@/features/athletes/useAthletes";
 
export type CompetitionFormData = {
    name: string,
    dateString: string,
    location: string,
    competitionGoal: string,
    priority: string,
    comment: string,
    athleteId: string,
}

export default function CreateCompetitions(){
    const [formData, setFormData] = useState<CompetitionFormData>({
        name: "",
        dateString: "",
        location: "",
        competitionGoal: "",
        priority: "",
        comment: "",
        athleteId: "",
    })
    const {athletes} = useAthletes()
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, athleteId: e.currentTarget.value })
    }
      
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(formData)

        const response = await fetch(`/api/athlete/${formData.athleteId}/competitions`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = (await response.json()) as {success: boolean, data: Competition}
        console.log(result)
        router.push("/")
    }
      
    const inputFieldStyle = "mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
    const labelStyle = "block text-sm font-medium text-gray-700"

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-10">
            <div className="mb-4">
                <label htmlFor="name" className={labelStyle}>
                    Navn
                </label>
                <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dateString" className={labelStyle}>
                    Dato
                </label>
                <input
                required
                type="date"
                id="dateString"
                name="dateString"
                value={formData.dateString}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="location" className={labelStyle}>
                    Lokasjon
                </label>
                <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="competitionGoal" className={labelStyle}>
                    Mål
                </label>
                <textarea
                id="competitionGoal"
                name="competitionGoal"
                value={formData.competitionGoal}
                onChange={handleTextAreaChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className={labelStyle}>
                    Prioritet
                </label>
                <input
                type="text"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className={labelStyle}>
                    Kommentar
                </label>
                <input
                type="text"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="athleteId" className={labelStyle}>
                    Utøver (valgfritt)
                </label>
                <select id="athleteId" name="athleteId" className={inputFieldStyle} value={formData.athleteId} onChange={handleSelect}>
                    {athletes.map((athlete) => 
                    <option value={athlete.id}>
                        {athlete.userId}
                    </option>)}
                </select>
            </div>
            <div className="flex gap-4 flex-row">
                <input
                type="submit"
                value={"Lagre"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-yellow-300" />
            </div>
        </form>
        </div>
        
    )
}