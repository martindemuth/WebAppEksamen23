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

  const { prev, next, currentTask } = useTaskContext()

  const correctAnswer = currentTask
    ? useAnswer().calculateExpression(
        currentTask.type,
        currentTask.operand1,
        currentTask.operand2,
      )
    : 0

  const fetchAnswers = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/taskAnswers")
      const result = await response.json()

      if (result.success) {
        setTaskAnswers(result.data)
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

    let attemptsValue = 1
    taskAnswers.forEach((taskAnswer) => {
      if (taskAnswer.taskId === currentTask.id) {
        attemptsValue = taskAnswer.attempts + 1
      }
    })
    let failedAttempt = false
    if (attemptsValue >= 3) {
      failedAttempt = true
      setSolved(false)
    }

    try {
      setSolved(solvedValue)
      setCountAttempts(attemptsValue)
      setAttemptFail(failedAttempt)

      const response = await fetch("http://localhost:3002/api/taskAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentTask.id,
          isCorrect: solvedValue,
          attempts: attemptsValue,
          taskId: currentTask.id,
        }),
      })

      const result = await response.json()

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

        <span>
          Din poengsum: {score}
        </span>
    </div>
  )
}
