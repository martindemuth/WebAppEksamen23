"use client"

import React from "react"

import useProgress from "@/hooks/useProgress"
import { type Task } from "@/types"

export default function Progress({ current, next, prev, count }: { current: Task, next: () => void , prev: () => void, count: number }) {

  return (
    <>
      <footer className="mt-4 border-t-slate-300">
        {current ? (
          <p>{current.id}</p>
        ) : null }
        <button
          onClick={prev}
          className="bg-purple-700 text-white"
          disabled={count === 0}
        >
          Forrige
        </button>
        <button onClick={next} className="bg-teal-700 text-white">
          Neste
        </button>
      </footer>
    </>
  )
}
