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
}

export default function CreateCompetitions({ id }: { id: string }){
    const [formData, setFormData] = useState<CompetitionFormData>({
        name: "",
        dateString: "",
        location: "",
        competitionGoal: "",
        priority: "",
        comment: ""
    })
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
      
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(formData)

        const response = await fetch(`/api/athlete/${id}/competitions`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = (await response.json()) as {success: boolean, data: Competition}
        console.log(result)
        //router.push(`/athletes/${id}`)
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
                <input
                id="competitionGoal"
                name="competitionGoal"
                value={formData.competitionGoal}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className={labelStyle}>
                    Prioritet
                </label>
                <div className="mb-2 flex items-center gap-2">
                    <input
                        required
                        type="radio"
                        id="A"
                        name="priority"
                        value="A"
                        checked={formData.priority === 'A'}
                        onChange={handleChange}
                    />
                    <label htmlFor="priority" className={labelStyle}>
                        A
                    </label>
                </div>
                <div className="mb-2 flex items-center gap-2">
                    <input
                        required
                        type="radio"
                        id="B"
                        name="priority"
                        value="B"
                        checked={formData.priority === 'B'}
                        onChange={handleChange}
                    />
                    <label htmlFor="priority" className={labelStyle}>
                        B
                    </label>
                </div>
                <div className="mb-4 flex items-center gap-2">
                    <input
                        required
                        type="radio"
                        id="C"
                        name="priority"
                        value="C"
                        checked={formData.priority === 'C'}
                        onChange={handleChange}
                    />
                    <label htmlFor="priority" className={labelStyle}>
                        C
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className={labelStyle}>
                    Kommentar
                </label>
                <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleTextAreaChange}
                className={inputFieldStyle}
                />
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