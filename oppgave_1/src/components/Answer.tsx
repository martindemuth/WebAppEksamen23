import { useEffect, useState } from "react"
import type { FormEvent, MouseEvent } from "react"

import { useTaskContext } from "@/features/TaskContext"
import useAnswer from "@/hooks/useAnswer"
import { TaskAnswer } from "@/types"
import Button from "./Button"

export default function Answer() {
  const [answer, setAnswer] = useState(0)
  const [isSolved, setSolved] = useState(false)
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

    if (correctAnswer === answer) {
      setSolved(true)
      console.log(isSolved)
    }

   // Send the answer to the server
   try {
    const response = await fetch("http://localhost:3002/api/taskAnswers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentTask.id,
        isCorrect: true,
        attempts: 1,
        taskId: currentTask.id,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Answer submitted successfully!");
      await fetchAnswers(); 
      console.log(taskAnswers); 
    } else {
      console.error(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Error sending answer:", error);
  }
};


  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
    setSolved(false)
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
    </div>
  )
}
