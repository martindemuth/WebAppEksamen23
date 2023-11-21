export type Athlete = {
    id: string
    gender: "male" | "female"
    sport: string
}

export type Competition = {
    name: string
    date: Date
    location: string
    goal: string
    priority: string
    comment: string

}
export type Goal = {
    name: string
    date: Date
    goal: number
    comment: string
}

