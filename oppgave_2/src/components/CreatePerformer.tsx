'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
// import { Navigation } from "../../components/Navigation";
import { useRouter } from "next/navigation";
import { Competition, Performer } from "@/types";
import { useFormState } from "react-dom";


const newPerformer: Performer = {
    id: "",
    gender: "Male",
    sport: "Løp"
}

export default function CreatePerformer(){
    const [formData, setFormData] = useState<Performer>(newPerformer)
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
                <label htmlFor="gender" className={labelStyle}>
                    Gender
                </label>
                <input
                required
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputFieldStyle}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="sport" className={labelStyle}>
                    Sport
                </label>
                <input
                type="text"
                id="sport"
                name="sport"
                value={formData.sport}
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