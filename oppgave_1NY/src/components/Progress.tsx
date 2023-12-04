"use client"

import React, { useEffect, useState } from "react"
import type { MouseEvent, ReactNode } from "react"

import useProgress from "@/hooks/useProgress"
import { type Task } from "@/types"

export default function Progress(props: {
  children: ReactNode
  tasks: Task[]
}) {
  const { count, current, next, prev } = useProgress({ tasks: props.tasks })

  useEffect(() => {}, [count, current, next, prev])

  return (
    <>
      <section>
      {React.Children.map(props.children, (child) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              tasks: props.tasks,
              currenttask: current,
            })
          : child,
      )}
      </section> 
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
