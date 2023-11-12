import { Task, TaskAnswer } from "@/types"

/**
 * Analyzes the user's performance based on a map of answers.
 * @param {Map<Task, TaskAnswer>} answers - The map of tasks and corresponding answers.
 * @returns {string[]} - An array of task types that the user has answered incorrectly the most.
 */

export const analyzePerformance = (answers: Map<Task, TaskAnswer>) => {
    
    const incorrectTypeFrequency = new Map<string, number>()

    // Sett inn alle typer(add, divide...) hvor bruker har svart feil som key, og
    // tell antall forekomster per type og sett som value
    answers.forEach((answer, task) => {
        if(!answer.isCorrect){
            incorrectTypeFrequency.set(task.type, (incorrectTypeFrequency.get(task.type) || 0) + 1)
        }
    })

    console.log(incorrectTypeFrequency)

    // finn den typen(add, divide...) oppgave brukeren har gjort feil flest ganger 
    // og lagre antall(value) ganger i maxIncorrectFrequency 
    const maxIncorrectFrequency = Math.max(...incorrectTypeFrequency.values());
    console.log(maxIncorrectFrequency)

    // Sjekk om det finnes flere typer oppgaver brukeren har feilet på like mange ganger
    // og returner det som en array med typene
    let mostFailedTypes = [...incorrectTypeFrequency.entries()]
        .filter(([_, value]) => value === maxIncorrectFrequency)
        .map(([type, _]) => type)
    
    return mostFailedTypes
}