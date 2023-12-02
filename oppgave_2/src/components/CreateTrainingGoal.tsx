'use client'
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

export type TrainingGoalFormData = {
    name: string,
    dateString: string,
    goalTarget: string,
    comment: string
}

export default function CreateTrainingGoal({ id }: { id: string }){
    const [formData, setFormData] = useState<TrainingGoalFormData>({
        name: "",
        dateString: "",
        goalTarget: "0",
        comment: ""
    })
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const response = await fetch(`/api/athlete/${id}/training-goals`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = (await response.json()) as {success: boolean, data: TrainingGoalFormData}
        if(result.success) router.push(`/athletes/${id}/training-goals`)
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
                <label htmlFor="goalTarget" className={labelStyle}>
                    Mål
                </label>
                <input
                type="number"
                id="goalTarget"
                name="goalTarget"
                value={formData.goalTarget}
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