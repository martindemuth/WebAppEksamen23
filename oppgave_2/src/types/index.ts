import { Prisma } from "@prisma/client"


export type SportType = "running" | "cycling" | "skiing" | "triathlon" | "swimming" | "strength" | "other"


export type Athlete = {
    id?: string
    userId: string
    gender: "male" | "female"
    sport: SportType
    meta?: AthleteData
}

export type AthleteData = {
    maxPulse: number
    maxWatt: number
    maxSpeed: number
    date?: Date
    // Calculate intensity
}


export type Competition = {
    name: string
    date: Date
    location: string
    competitionGoal: string
    priority: string
    comment: string
}

export type Goal = {
    name: string
    date: Date
    goalTarget: number
    comment: string
}


export type Activity = {
    date: Date
    name?: string
    tags?: string[]
    questions?: Question[]
    sport?: SportType 
    intervals?: Intervals
    goalId?: string
    competitionId?: string
}


export type Question = {
    id: string
    question: string
    type: QuestionType
}

export type QuestionType = "text" | "radio:range" | "radio:mood"

export type Intervals = {

}


export type CreateAthleteInput = Prisma.AthleteCreateInput
export type CreateCompetitionInput = Prisma.CompetitionCreateInput
export type CreateGoal = Prisma.GoalCreateInput


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