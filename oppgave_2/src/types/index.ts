import { Prisma } from "@prisma/client"

export type Athlete = {
    userId: string
    gender: "Mann" | "Kvinne"
    sport: "Løp" | "Sykkel" | "Ski" | "Triathlon" | "Svømming" | "Styrke" | "Annet"
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