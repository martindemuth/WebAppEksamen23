import { createTasks } from "@/features/createTasks"
import { type Task, type TaskAnswer } from "@/types"

export default function Result (/*answers: Map<Task, TaskAnswer>*/) {

    // Dummy data
    const taskList = createTasks(3)

    console.log(taskList)

    const answer1: TaskAnswer = {
        id: "2",
        isCorrect: true,
        attempts: 1,
        taskId: taskList[0].id
    }

    const answer2: TaskAnswer = {
        id: "2",
        isCorrect: true,
        attempts: 2,
        taskId: taskList[1].id
    }

    const answer3: TaskAnswer = {
        id: "3",
        isCorrect: true,
        attempts: 3,
        taskId: taskList[2].id
    }

    const answerList: TaskAnswer[] = []
    answerList.push(answer1)
    answerList.push(answer2)
    answerList.push(answer3)

    console.log(answerList)

    const answers = new Map<Task, TaskAnswer>()

    

    // Populere answers map
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i]
        const answer = answerList.find(answer => answer.taskId === task.id)
        if(answer) answers.set(task, answer)
    }
    console.log(answers)

    const calculateScore = () => {
        let score = 0

        Array.from(answers).map(([,answer]) => {
            if(answer.isCorrect) {
                score++
            } 
        })
        return score
    }

    console.log(calculateScore())

    
    
    return (
        <section>
        {Array.from(answers).map(([task, answer]) => (
                <article key={task.id}>
                    <p>{"Task id: " + task.id + " - Answer taskId: " + answer.taskId}</p>
                    <p>{"Expression: " + task.operand1 + " " + task.type + " " +task.operand2}</p>
                    <h3>{"Answer isCorrect?: " + answer.isCorrect}</h3>
                </article>
            ))}
        </section>
    )
}