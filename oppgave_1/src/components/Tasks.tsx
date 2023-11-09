import { type ReactNode } from "react"
import { type Task } from "@/types"
import { useTaskContext } from "@/features/TaskContext"
import { getServerSideProps } from "next/dist/build/templates/pages"

export default function Tasks({ children }: { children: ReactNode}) {
  const { tasks, currentTask } = useTaskContext()
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
