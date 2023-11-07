"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { type Task } from "@/types"

export default function Progress(props: { tasks: Task[] }) {
  const [taskIndex, setTaskIndex] = useState(0)
  // const [currentTask, setCurrentTask] = useState(props.tasks[taskIndex])
  const currentTask = props.tasks[taskIndex]
  

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setTaskIndex((prevIndex) => prevIndex + 1)
    // setCurrentTask(props.tasks[taskIndex])

    
  }

  const prev = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event)
    setTaskIndex(taskIndex - 1)
  }

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{currentTask.id}</p>
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
