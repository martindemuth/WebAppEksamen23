"use client"

import { Activity, CreateActivity, QuestionType } from "@/types";
import router from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";


export type QuestionFormData = {
    question: string,
    type: QuestionType
}

const questionTypeMap = [
    {text: "Tekst", type: "text"},
    {text: "Rangering mellom 1-10", type: "radio:range"},
    {text: "Humør / Emojier", type: "radio:mood"}
]



export default function CreateQuestion ({id}: {id: string} ) {
    const [formData, setFormData] = useState<QuestionFormData>({
        question: "",
        type: "text"
    })

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>, selectType: string) => {
        const { name, value } = e.target

        if (selectType === "sport") {
            setFormData({ ...formData, [name]: parseInt(value, 10)})
        } else {
            setFormData({ ...formData, [name]: value})
        }
    }
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        setFormData({ ...formData, [name]: value})
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log("Submitted form: " + JSON.stringify(formData))

        const response = await fetch(`/api/athlete/${id}/activities`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = (await response.json()) as {success: boolean, data: Activity}
        console.log(result)
        router.push("/")
    }
    
    // Tailwind-variables
    const inputFieldStyle = "mb-2 mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
    const labelStyle = "mb-2 block text-sm font-medium text-gray-700"                                   
    const clickAbleStyle = "mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div>
            <form onSubmit={handleSubmit} className=" my-20 max-w-lg mx-28">

                {/* ---- Spørsmål/Question ---- */}
                <label htmlFor="Question" className={labelStyle}>
                    Spørsmålstekst
                </label>
                <input
                required
                type="text"
                placeholder="Skriv inn spørsmål"
                id="Question"
                name="Question"
                value={formData.question}
                onChange={handleChange}
                className={inputFieldStyle}
                />
                
                {/* ------ Spørsmålstype / Question Type ----- */}
                <div className="mb-4">
                    <label htmlFor="type" className={labelStyle}>
                        Definer ønsket svartype for spørsmål
                    </label>
                    {questionTypeMap.map((questionType) => 
                        <div className="mb-2 flex items-center gap-2">
                            <input
                                required
                                type="radio"
                                id={questionType.type}
                                name="type"
                                value={questionType.type}
                                checked={formData.type === questionType.type}
                                onChange={handleChange}
                            />
                            <label htmlFor="type" className={labelStyle}>
                                {questionType.text}
                            </label>
                        </div>
                    )}
                </div>
            <input
            type="submit"
            value={"Lagre"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-yellow-300" />                
            </form>
        </div>
    ) 
}