import { analyzePerformance } from "@/features/analyzePerformance"
import { calculateScore } from "@/features/calculateScore"
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
        isCorrect: false,
        attempts: 3,
        taskId: taskList[2].id
    }

    const answerList: TaskAnswer[] = []
    answerList.push(answer1)
    answerList.push(answer2)
    answerList.push(answer3)

    console.log(answerList)

    // Denne kommer med som parameter, men hardkodes her
    const answers = new Map<Task, TaskAnswer>()

    // Populere answers map
    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i]
        const answer = answerList.find(answer => answer.taskId === task.id)
        if(answer) answers.set(task, answer)
    }
    console.log(answers)

    

    // ================================================== //

    const score = calculateScore(answers)
    const totalTasks = answers.size
    console.log(score)
    const mostFailedType = analyzePerformance(answers)
    console.log(mostFailedType)

    const handleClick = () => {
        window.location.href="http://localhost:3000/"
    }

    return (
        <section>
            <article>
                <p>
                    {"Du fikk " + score + " riktige svar av " + totalTasks + " mulige"}
                </p>
                <p>
                    {"Du fikk flest feil på oppgaver av typen :" + " " + mostFailedType}
                </p>
                
                <button onClick={handleClick} className="mx-3 bg-teal-700 text-white" >
                    Start på nytt
                </button>
            
                
            </article>
        </section>
    )
}