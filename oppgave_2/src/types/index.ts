export type Performer = {
    id: string
    gender: "Male" | "Female"
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

