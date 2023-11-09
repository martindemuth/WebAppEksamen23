import { useState } from "react"

import { type Task } from "@/types"

export default function useProgress(tasks: Task[]) {
  const [taskIndex, setTaskIndex] = useState(0)
    const currentTask = tasks[taskIndex]
    const isFinalTask = taskIndex >= (tasks.length - 1)
    const isFirstTask = taskIndex === 0

  // TODO: Try/catch - Håndter index utenfor array
  const next = () => {
    setTaskIndex((prevIndex) => prevIndex + 1)
  }
  const prev = () => {
    setTaskIndex((prevIndex) => prevIndex - 1)
  }

  return { taskIndex, currentTask, next, prev, isFirstTask, isFinalTask }
}
