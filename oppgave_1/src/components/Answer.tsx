"use client"

import { useEffect, useState } from "react"
import type { FormEvent, MouseEvent } from "react"
import Button from "./Button"

export default function Answer() {
  const [answer, setAnswer] = useState(0)
  const [isSolved, setSolved] = useState(false)
  
  const correctAnswer = 11

  // const {currentTask} = useTaskContext;
  // const {correctAnswer} = useAnswer().calculateExpression(currentTask.type, currentTask.operand1, currentTask.operand2);
  

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(answer)

    if (correctAnswer === answer) setSolved (true)

    console.log(isSolved)

  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber)
  }

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onChange= {update}/>
      <button onClick={send}>Send</button>
      {
        isSolved ? 
          <>
            <p>Bra jobbet!</p>
            <button>Knapp</button>
            {/* <Button classNames="" children="Vis neste oppgave"/> */}
          </>
         : 
        null
      }

    </div>
  )
}
