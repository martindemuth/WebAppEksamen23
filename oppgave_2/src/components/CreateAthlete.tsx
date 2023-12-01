
import { ChangeEvent, FormEvent, useState } from "react"
import { Athlete } from "@/types";
import { useRouter } from 'next/navigation'

const newAthlete: Athlete = {
    userId: "",
    gender: "male",
    sport: "running"
}

export default function CreateAthlete(){
    const [formData, setFormData] = useState<Athlete>(newAthlete)
    const router = useRouter()
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }
      
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const response = await fetch("/api/athlete", {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json"
            }
          })
        router.push("/")
    }
      
    const inputFieldStyle = "mt-1 p-2 w-half rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
    const labelStyle = "block text-sm font-medium text-gray-700"

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <h1 className="mb-4">
                        Utøver ID
                    </h1>
                    <input
                        required
                        type="text"
                        id="userId"
                        name="userId"
                        placeholder="Skriv inn unik id"
                        value={formData.userId}
                        onChange={handleChange}
                        className={inputFieldStyle}
                    />
                </div>
                <div className="mb-4">   
                    <h1 className="mb-4">
                        Kjønn
                    </h1>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />
                        <label htmlFor="gender" className={labelStyle}>
                            Mann
                        </label>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                    <input
                        required
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                    />
                    <label htmlFor="gender" className={labelStyle}>
                        Kvinne
                    </label>
                    </div>
                    <h1 className="mb-4">
                        Sport
                    </h1>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="running"
                            name="sport"
                            value="running"
                            checked={formData.sport === 'running'}
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
                            id="cycling"
                            name="sport"
                            value="cycling"
                            checked={formData.sport === 'cycling'}
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
                            id="skiing"
                            name="sport"
                            value="skiing"
                            checked={formData.sport === 'skiing'}
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
                            value="triathlon"
                            checked={formData.sport === 'triathlon'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sport" className={labelStyle}>
                            Triatlon
                        </label>
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                        <input
                            required
                            type="radio"
                            id="swimming"
                            name="sport"
                            value="swimming"
                            checked={formData.sport === 'swimming'}
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
                            id="strength"
                            name="sport"
                            value="strength"
                            checked={formData.sport === 'strength'}
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
                            id="other"
                            name="sport"
                            value="other"
                            checked={formData.sport === 'other'}
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
                        Lagre
                    </button>
                </div>
            </form>
        </div>   
    )
}