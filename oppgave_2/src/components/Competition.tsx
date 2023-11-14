
'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
// import { Navigation } from "../../components/Navigation";
import { useRouter } from "next/navigation";
import { Competition } from "@/types";


const newCompetition: Competition = {
    name: "",
    date: new Date(),
    location: "",
    goal: "",
    priority: "",
    comment: "",

}

export default function CreateCompetitions(){
    const [formData, setFormData] = useState<Competition>(newCompetition)
    // const {postCompetition, competition} = useCharacter()
    // const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
      
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // postCharacter(formData)
        // router.push("/characters")
    }
      
    const inputFieldStyle = "mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
    const labelStyle = "block text-sm font-medium text-gray-700"

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-10">
            <div className="mb-4">
                <label htmlFor="name" className={labelStyle}>
                    Name
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
                <label htmlFor="date" className={labelStyle}>
                    Date
                </label>
                <input
                type="date"
                id="date"
                name="date"
                value={formData.date.toDateString()}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="location" className={labelStyle}>
                    Locatiom
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
                <label htmlFor="goal" className={labelStyle}>
                    Goal
                </label>
                <input
                type="text"
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="priority" className={labelStyle}>
                    Priority
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
                    Comment
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
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-yellow-300">
                    Save
                </button>
            </div>
        </form>
        </div>
        
    )
}