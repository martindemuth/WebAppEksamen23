import { Task, TaskAnswer } from "@/types"

export const calculateScore = (answers: Map<Task, TaskAnswer>) => {
    let score = 0

    answers.forEach((answer) => {
        if(answer.isCorrect) {
            score++
        } 
    })
    return score
}