import { useState } from "react"

import { type Task } from "@/types"

export default function useProgress({ tasks }: { tasks: Task[] }) {
  const [count, setCount] = useState(0)
  const current = tasks[count]

  // TODO: Try/catch - Håndter index utenfor array
  const next = () => {
    setCount((prevCount) => prevCount + 1)
  }
  const prev = () => {
    setCount((prevCount) => prevCount - 1)
  }

  return { count, current, next, prev }
}
