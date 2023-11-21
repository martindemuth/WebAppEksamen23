'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { Performer } from "@/types";

const newPerformer: Performer = {
    id: "",
    gender: "Mann",
    sport: "Løp"
}

export default function CreatePerformer(){
    const [formData, setFormData] = useState<Performer>(newPerformer)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }
      
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }
      
    const inputFieldStyle = "mt-1 p-2 w-half rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
    const labelStyle = "block text-sm font-medium text-gray-700"

    

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-10">
                <div className="mb-4">
                    <h1 className="mb-4">
                        Gender
                    </h1>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                        />
                        <label htmlFor="gender" className={labelStyle}>
                            Male
                        </label>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                    <input
                        required
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleChange}
                    />
                    <label htmlFor="gender" className={labelStyle}>
                        Female
                    </label>
                    </div>
                    <h1 className="mb-4">
                        Sport
                    </h1>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="løp"
                            name="sport"
                            value="Løp"
                            checked={formData.sport === 'Løp'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Løp
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="sykkel"
                            name="sport"
                            value="Sykkel"
                            checked={formData.sport === 'Sykkel'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Sykkel
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="ski"
                            name="sport"
                            value="Ski"
                            checked={formData.sport === 'Ski'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Ski
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="triathlon"
                            name="sport"
                            value="Triathlon"
                            checked={formData.sport === 'Triathlon'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Triathlon
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="svømming"
                            name="sport"
                            value="Svømming"
                            checked={formData.sport === 'Svømming'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Svømming
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="styrke"
                            name="sport"
                            value="Styrke"
                            checked={formData.sport === 'Styrke'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Styrke
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="annet"
                            name="sport"
                            value="Annet"
                            checked={formData.sport === 'Annet'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Annet
                        </label>
                    </div>
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