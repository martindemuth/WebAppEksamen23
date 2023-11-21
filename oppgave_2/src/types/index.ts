export type Athlete = {
    id: string
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

