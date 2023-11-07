import { type ReactNode } from "react"

import { type Task } from "@/types"

export default function Tasks({ children, tasks }: { children: ReactNode, tasks: Task[] }) {
  
  return (
    <section>
      {tasks.map((task) => (
        <article key={task.id}>
          <p>{task.type}</p>
          <h3>{task.text}</h3>
          <p>{`${task.operand1} ${task.type} ${task.operand2}`}</p>
        </article>
      ))}
      {children}
    </section>
  )
}
