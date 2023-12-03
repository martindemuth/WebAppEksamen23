import { Prisma } from "@prisma/client"
import internal from "stream"


export type SportType = "running" | "cycling" | "skiing" | "triathlon" | "swimming" | "strength" | "other"
export type Gender = "male" | "female"


export type Athlete = {
    id?: string
    userId: string
    gender: Gender
    sport: SportType
    meta?: AthleteData
}

export type AthleteData = {
    heartrate: number
    watt: number
    speed: number
    updatedAt: Date
    // Calculate intensity
}

export type Competition = {
    athleteId: string
    name: string
    year?: number
    date: Date
    location: string
    competitionGoal: string
    priority: "A" | "B" | "C"
    comment: string
}

export type TrainingGoal = {
    athleteId: string
    name: string
    year?: number
    date: Date
    goalTarget: number
    comment: string
}

export type Activity = {
    date: Date
    name: string
    tags: string[]
    questions: Question[]
    sport: SportType 
    intervals: Intervals[]
    trainingGoalId: string
    parameter: Parameter[]
    competitionId?: string
    templateId?: string
}

export type Template = {
    id: string
    athleteId: string
    name: string
    tags: string[]
    questions: Question[]
    sport: SportType
    parameter: Parameter[]
    intervals: Intervals[]
}

export type Parameter = "intensity" | "speed" | "heartrate" | "watt"

export type Question = {
    id: string
    question: string
    type: QuestionType
}


export type QuestionType = "text" | "radio:range" | "radio:mood"
export type Intervals = {
    id: string
    duration: number
    intensity: number
}

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#create-a-single-record-using-generated-types
export type CreateAthleteInput = Prisma.AthleteCreateInput
export type CreateCompetitionInput = Prisma.CompetitionCreateInput
export type CreateGoal = Prisma.TrainingGoalCreateInput

export type CreateActivity = Prisma.ActivityCreateInput


export type Data<T> = {
    success: true
    data: T | null
}

export type ResultError = {
    success: false
    type?: string
    error: string
}

export type Result<T> = Data<T> | ResultError