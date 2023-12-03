"use client"

import { Activity, CreateActivity } from "@/types";
import router from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

// Types
export type ActivityFormData = {
    athleteId: string,
    dateString: string,
    name: string,
    tags: string[],
    questions: QuestionFormData[],
    intervals: IntervalFormData[],
    sportId: number,
    goalId: string
    competitionId: string,
    templateId: string
}

export type QuestionFormData = {
    id: string,
    question: string,
    type: string
}

export type IntervalFormData = {
    duration: number,
    intensity: number
}

export type SportList = {
    id: number,
    value: string
}

export type IntervalList = {
    duration: number,
    intensity: number
}

export type CompetitionList = {
    id: string,
    name: string
}

export type GoalList = {
    id: string,
    name: string
}

// Dummy competitions
const competitionsList: CompetitionList[] = [
    {
        id: "abc123",
        name: "Glommaløpet"
    },
    {
        id: "xzy678",
        name: "Barsking 2.0"
    }
]

// Dummy goals
const goalList: GoalList[] = [
    {
        id: "qwe142",
        name: "10k på 45min"
    },
    {
        id: "096wwt",
        name: "Trondheim - Oslo på sykkel"
    }
]


// Menu-values for sport types - Easy fix for translation and getting sportId
const sportList: SportList[] = [
    {
        id: 1,
        value: "Løp"
    },
    {
        id: 2,
        value: "Sykling"
    },
    {
        id: 3,
        value: "Ski"
    },
    {
        id: 4,
        value: "Triatlon"
    },
    {
        id: 5,
        value: "Svømming"
    },
    {
        id: 6,
        value: "Styrke"
    },
    {
        id: 7,
        value: "Annet"
    }
]

// Values for questions
const questionList: QuestionFormData[] = [
    {
      id: "q1",
      question: "Hvor krevende var økten?",
      type: "radio:range",
    },
    {
      id: "q2",
      question: "Hvordan var kvaliteten og varigheten på søvnen før dagens økt?",
      type: "text",
    },
    {
      id: "q3",
      question: "Hvor godt restituert var du før økten?",
      type: "radio:mood",
    },
    {
      id: "q4",
      question: "Grad av muskelsårhet?",
      type: "radio:range",
    },
    {
      id: "q5",
      question: "Hvordan påvirket omgivelsene/terrenget gjennomføring av økten?",
      type: "text",
    },
    {
      id: "q6",
      question: "Hvordan var stressnivået før dagens økt?",
      type: "radio:mood",
    },
    {
      id: "q7",
      question: "Hvordan var treningsfølelsen?",
      type: "radio:mood",
    },
]

export default function CreateActivity ({id}: {id: string} ) {
    const [questionDropdownIsOpen, setQuestionDropdownIsOpen] = useState(false)
    const [tag, setTag] = useState("")
    const [intervals, setIntervals] = useState<IntervalFormData>({
        duration: 0,
        intensity: 0
    })
    const [formData, setFormData] = useState<ActivityFormData>({
        athleteId: id,
        dateString: "",
        name: "",
        tags: [],
        questions: [],
        intervals: [],
        sportId: 1,
        goalId: "",
        competitionId: "",
        templateId: ""
    })
    
    const openCloseQuestionDropdown = () => setQuestionDropdownIsOpen(!questionDropdownIsOpen)

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>, selectType: string) => {
        const { name, value } = e.target

        if (selectType === "sport") {
            setFormData({ ...formData, [name]: parseInt(value, 10)})
        } else {
            setFormData({ ...formData, [name]: value})
        }
    }
    
    const handleIntervalChange = (e: ChangeEvent<HTMLSelectElement>, property: string) => {
        const value = parseInt(e.target.value, 10)
       
        setIntervals({...intervals, [property]: value}) 
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        setFormData({ ...formData, [name]: value})
    }

    const addInterval = () => {
        if(intervals.duration !== 0 && intervals.intensity !== 0) {
            setFormData({ ...formData, intervals: [ ...formData.intervals, intervals]})
            setIntervals({duration: 0, intensity: 0})
        }

    }

    const addTag = () => {
        // Check for empty string and duplicate values
        if (tag.trim() !== "" && !formData.tags.includes(tag)) {
            setFormData({ ...formData, tags: [ ...formData.tags, tag.trim() ] })

            setTag("")
          }

    }

    const removeTag = (tagToRemove: string) => {
        const updatedTags: string[] = formData.tags.filter((tag) => tag !== tagToRemove)
        
        setFormData({ ...formData, tags: updatedTags})
    }
    
    const handleSelectedQuestions = (selectedQuestion: QuestionFormData) => {
        const questionExists = formData.questions.includes(selectedQuestion)

        // If question is in formData, remove, otherwise add
        const updatedQuestions = questionExists 
        ? formData.questions.filter((question) => question !== selectedQuestion) 
        : [...formData.questions, selectedQuestion]

        setFormData({ ...formData, questions: updatedQuestions });
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
    
    console.log(formData)
    // Tailwind-variables
    const inputFieldStyle = "mb-2 mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
    const labelStyle = "mb-2 block text-sm font-medium text-gray-700"                                   
    const clickAbleStyle = "mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return (
        <div>
            <form onSubmit={handleSubmit} className=" my-20 max-w-lg mx-28">
                {/* ------ Sport ------ */}
                <label htmlFor="sportId" className={labelStyle}>
                        Sport
                </label>
                <select 
                    name="sportId"
                    id="sportId" 
                    value={formData.sportId}
                    
                    onChange={(e) => handleSelect(e, "sport")}
                    className={clickAbleStyle}
                >
                    {sportList.map(sport => 
                        <option key={sport.id} value={sport.id}>
                            {sport.value}
                        </option>)}
                </select>

                {/* ------ Dato ------ */}
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
                
                {/* ---- Navn/Tittel ---- */}
                <label htmlFor="name" className={labelStyle}>
                    Tittel
                </label>
                <input
                required
                type="text"
                placeholder="Skriv inn tittel"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputFieldStyle}
                />
      
                {/* ------ Tags ----- */}
                <label htmlFor="tags" className={labelStyle}>
                    Tags
                </label>
                <div className="flex flex-2">
                    <input
                    placeholder="Legg til tags"
                    type="text"
                    id="tags"
                    name="tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className={`w-full ${inputFieldStyle}`}
                    />
                    <button 
                    type="button"
                    onClick={addTag}
                    className={`w-1/3 ml-2 max-w-min whitespace-nowrap ${inputFieldStyle}`}>
                        Legg til
                    </button>
                </div>
                
                {/* ------ Show/remove added tags ----- */}
                <div className={`flex flex-wrap ${formData.tags.length === 0 ? 'mb-0' : 'mb-2'}`}>
                    {formData.tags.map((tag, index) => (
                        <div  key={tag} className={`mr-2 flex items-center justify-between max-w-min whitespace-nowrap ${inputFieldStyle}`}>
                            {tag}
                            <svg 
                            onClick={() => removeTag(tag)}
                            className="mr-1 w-2.5 h-2.5 ms-2.5 hover:cursor-pointer" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 14 14">
                                <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </div>
                    ))}
                </div>
                
                {/* ------ Open/close Spørsmål ------ */}
                <label htmlFor="questions" className={labelStyle}>
                        Spørsmål
                </label>
                <button 
                onClick={openCloseQuestionDropdown}  
                type="button"
                className={`flex items-center justify-between ${clickAbleStyle}`}>
                    Trykk for å legge til spørsmål
                    <svg className=" mr-1 w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                
                {/* ------ Spørsmål Menu ------ */}
                <ul className={`mb-2 text-sm ${questionDropdownIsOpen ? "block" : 'hidden'} text-gray-700 dark:text-gray-200`}>
                    {questionList.map(question => 
                    <li 
                        key={question.id} 
                        className="w-full px-4 py-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.questions.includes(question)}
                                    onChange={() => handleSelectedQuestions(question)}
                                    className="mr-2 cursor-pointer"
                                />
                                {question.question}
                            </div>
                    </li>)}
                </ul>
                
                {/* ------ Intervaller ----- */}
                <label htmlFor="intervals" className={labelStyle}>
                        Intervaller
                </label>
                <div className="flex flex-2">
                    <div className="flex w-full">
                        <select 
                        name="intervals.duration"
                        id="intervals" 
                        value={intervals.duration}
                        onChange={(e) => handleIntervalChange(e, "duration")}
                        className={clickAbleStyle}
                        >
                            {[...Array(31).keys()].map((index) => (
                                <option key={index} value={index}>
                                    {`${index === 0 ? "Varighet" : index}`}
                                </option>))}
                        </select>
                        <select 
                            name="intervals.intensity"
                            id="intervals.intensity" 
                            value={intervals.intensity}
                            onChange={(e) => handleIntervalChange(e, "intensity")}
                            className={`ml-2 ${clickAbleStyle}`}
                        >
                            {[...Array(6).keys()].map((index) => (
                                <option key={index} value={index}>
                                    {`${index === 0 ? "Intensitet" : index}`}
                                </option>))}
                        </select>
                    </div>
                    <button 
                    type="button"
                    onClick={addInterval}
                    className={`w-1/3 ml-2 mt-0 max-w-min whitespace-nowrap ${inputFieldStyle}`}>
                        Legg til
                    </button>   
                </div>

                {/* ------ Treningsmål/Konkurranse ----- */}
                <label htmlFor="intervals" className={labelStyle}>
                        Knytt økt mot treningsmål eller konkurranse?
                </label>
                <div className=" flex flex-2">
                    <select 
                    name="competitionId" 
                    id="competitionId" 
                    value={formData.competitionId} 
                    onChange={(e) => handleSelect(e, "competition")} 
                    className={clickAbleStyle}>
                        <option value="">
                            Ingen konkurranse
                        </option>
                        {competitionsList.map(competition => 
                            <option key={competition.id} value={competition.id}>
                                {competition.name}
                            </option>)}
                    </select>
                    <select 
                    name="goalId" 
                    id="goalId" 
                    value={formData.goalId} 
                    onChange={(e) => handleSelect(e, "goal")} 
                    className={`ml-2 ${clickAbleStyle}`}>
                        <option value="">
                            Ingen mål
                        </option>
                        {goalList.map(goal => 
                            <option key={goal.id} value={goal.id}>
                                {goal.name}
                            </option>)}
                    </select>
                </div>
                    <input
                    type="submit"
                    value={"Lagre"}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:text-yellow-300" />                
            </form>
        </div>
    ) 
}