"use client"

import { useEffect, useState } from "react"
import type { FormEvent, MouseEvent } from "react"

import useAnswer from "@/hooks/useAnswer"
import useProgress from "@/hooks/useProgress"
import { Task, TaskAnswer } from "@/types"

export default function Answer(props: {
  tasks: { tasks: Task[] }
  currenttask: { currenttask: Task }
}) {
  const [answer, setAnswer] = useState<number | null>(null)
  const [attempts, setAttempts] = useState<number>(0) // Start with 0 attempts
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false)
  const { calculateExpression } = useAnswer()

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (answer !== null) {
      const result = calculateExpression(
        props.currenttask.type,
        props.currenttask.data,
      )
      const isCorrect = result !== null && result === answer
      setCorrectAnswer(isCorrect)
      if(isCorrect || (attempts+1 > 3 && !isCorrect)) {
        const result = sendToApi({
          taskId: props.currenttask.id,
          isCorrect: isCorrect,
          attempts: attempts
        })
      }

      if (attempts < 2) {
        setAttempts(attempts + 1)
      } else if (attempts === 2) {
        setAttempts(attempts + 1)
      }
    } else {
      console.error("Feil svar")
      setCorrectAnswer(null)
    }
  }

  const sendToApi = async (currentAnswer: TaskAnswer) => {
    const response = await fetch("/api/restapi", {
      method: "post",
      body: JSON.stringify(currentAnswer),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = (await response.json()) as {success: boolean, data: TaskAnswer}
    result ? console.log("Answer sent") : console.error("Failed to send answer")
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
  }

  const showAnswer = () => {
    if (attempts === 3) {
      setShowCorrectAnswer(true)
    }
  }

  useEffect(() => {
    setCorrectAnswer(null)
    setAttempts(0)
    setShowCorrectAnswer(false)
  }, [props.currenttask])

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onInput={update}
      />
     <p className={correctAnswer !== null && correctAnswer ? "" : "hidden"}>
  Bra jobbet!
</p>

      {showCorrectAnswer && (
        <div>
          <p>
            Riktig svar er:{" "}
            {calculateExpression(
              props.currenttask.type,
              props.currenttask.data,
            )}
          </p>
        </div>
      )}
      {attempts === 3 && !correctAnswer && (
        <button
          className="m-3 bg-black text-white"
          onClick={showAnswer}
          disabled={showCorrectAnswer}
        >
          Se svar
        </button>
      )}
      <button
        className="m-3 bg-black text-white"
        onClick={send}
        disabled={showCorrectAnswer}
      >
        Send
      </button>
      <p>Forsøk: {attempts} av 3</p>
    </div>
  )
}
