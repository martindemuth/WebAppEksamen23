"use client"

import { useState } from "react"
import type { MouseEvent } from "react"

import { type Task } from "@/types"
import useProgress from "@/hooks/useProgress"

export default function Progress(props: { tasks: Task[] }) {
  
  const {count, current, next, prev} = useProgress ({tasks: props.tasks})
  

  return (
    <footer className="mt-4 border-t-slate-300">
      <p>{current.id}</p>
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    </footer>
  )
}
