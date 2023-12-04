"use client"

import React, { ReactNode, useEffect } from "react"

import useProgress from "@/hooks/useProgress"
import { Task } from "@/types"

export default function Tasks(props: {
  children: ReactNode
  tasks: Task[]
  currenttask: Task
}) {

  return (
    <section>
      <article key={props.currenttask?.id}>
        {props.currenttask ? (
          <>
            <h3>{props.currenttask.text}</h3>
            <p>{props.currenttask.type}</p>
            <p>{props.currenttask.data}</p>
          </>
        ) : (
          <p>No task available for the current state</p>
        )}
      </article>
      {React.Children.map(props.children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              tasks: props.tasks,
              currenttask: props.currenttask,
            })
          : child,
      )}
    </section>
  )
}
