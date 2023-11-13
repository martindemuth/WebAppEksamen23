import { useEffect, useState } from "react"
import type { FormEvent, MouseEvent } from "react"

import { useTaskContext } from "@/features/TaskContext"
import useAnswer from "@/hooks/useAnswer"
import { TaskAnswer } from "@/types"
import Button from "./Button"

export default function Answer() {
  const [answer, setAnswer] = useState(0)
  const [isSolved, setSolved] = useState(false)
  const [attemptFail, setAttemptFail] = useState(false)
  const [score, setScore] = useState(0)
  const [countAttempts, setCountAttempts] = useState(0)
  const [taskAnswers, setTaskAnswers] = useState<TaskAnswer[]>([])

  useEffect(() => {
    fetchAnswers()
  }, [])

  const { prev, next, currentTask, url } = useTaskContext()

  const correctAnswer = currentTask
    ? useAnswer().calculateExpression(
        currentTask.type,
        currentTask.operand1,
        currentTask.operand2,
      )
    : 0

  const fetchAnswers = async () => {
    try {
      const response = await fetch(`${url}/taskAnswers`)
      const result = await response.json()

      if (result.success) {
        const data = result.data.map(({ task, taskAnswer }) => ({
          task,
          taskAnswer,
        }))
        setTaskAnswers(data)
      } else {
        console.error(`Error fetching answers: ${result.error}`)
      }
    } catch (error) {
      console.error("Error fetching answers:", error)
    }
  }

  const send = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    let solvedValue = false
    if (correctAnswer === answer) {
      solvedValue = true
      setScore(score + 1)
    }

    let failedAttempt = false
    let attemptsValue = 1

    taskAnswers.forEach((taskAnswer) => {
      if (taskAnswer.taskId === currentTask.id) {
        attemptsValue = taskAnswer.attempts + 1
      }

      if (attemptsValue >= 3 && !taskAnswer.isCorrect ) {
        failedAttempt = true
        setSolved(false)
      }

    })

    try {
      setSolved(solvedValue)
      setCountAttempts(attemptsValue)
      setAttemptFail(failedAttempt)

      const response = await fetch(`${url}/taskAnswers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentTask.id,
          isCorrect: solvedValue,
          attempts: attemptsValue,
          task: currentTask,
        }),
      })

      const result = (await response.json()) as {
        success: boolean
        error: string
      }

      if (result.success) {
        console.log("Answer submitted successfully!")

        await fetchAnswers()
        console.log(taskAnswers)
      } else {
        console.error(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error("Error sending answer:", error)
    }
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
    setSolved(false)
  }

  const showAnswer = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    console.log(correctAnswer)
    setSolved(true)
    setAttemptFail(false)
  }

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onChange={update}
      />
      <button onClick={send} className="ml-3 border-black">
        Send
      </button>
      <p className="my-3 font-bold">Forsøk: {countAttempts} av 3</p>
      <span className="te font-bold">Din poengsum: {score}</span>
      <div className="mt-3 flex flex-row">
        <button
          onClick={prev}
          className="flew-col flex bg-purple-700 text-white"
        >
          Forrige
        </button>
        {isSolved ? (
          <>
            <button onClick={next} className="mx-3 bg-teal-700 text-white">
              Neste
            </button>
            <span>Bra jobbet!</span>
          </>
        ) : null}
      </div>
      <div>
        {attemptFail ? (
          <>
            <span>Du har brukt opp forsøkene dine på denne oppgaven!</span>
            <span>Trykk på knappen for å se svar</span>
            <button
              onClick={showAnswer}
              className="mx-3 bg-teal-700 text-white"
            >
              Vis svar!
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}
