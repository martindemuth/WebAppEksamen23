"use client"

import { useEffect, useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import Button from "./Button"
import { useTaskContext } from "@/features/TaskContext"
import useAnswer from "@/hooks/useAnswer"


export default function Answer() {
  const [answer, setAnswer] = useState(0)
  const [isSolved, setSolved] = useState(false)
  
  const { prev, next, currentTask } = useTaskContext()

  const correctAnswer = currentTask
  ? useAnswer().calculateExpression(currentTask.type, currentTask.operand1, currentTask.operand2)
  : 0;

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log("Dette er det du svarte: ",answer)
    console.log("Dette er riktig svar: ",correctAnswer);

    if (correctAnswer === answer) {
      setSolved (true)
      console.log(isSolved)
    }

  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
    setSolved(false)
    console.log("Answer", answer);
  }

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onChange= {update}/>
      <button onClick={send} className="border-black">Send</button>
      <div className="flex flex-row mt-3">
      <button onClick={prev} className="bg-purple-700 text-white flex flew-col"> Forrige</button>
        {
          isSolved ? 
            <>
              <button onClick={next} className="bg-teal-700 text-white mx-3"> Neste</button>
              {/* <Button classNames="" children="Vis neste oppgave"/> */}
              <span>Bra jobbet!</span>
            </>
          : 
          null
        }
      </div>

    </div>
  )
}
