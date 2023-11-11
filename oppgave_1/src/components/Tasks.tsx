import { type ReactNode } from "react"
import { type Task } from "@/types"
import { useTaskContext } from "@/features/TaskContext"
import { getServerSideProps } from "next/dist/build/templates/pages"

export default function Tasks({ children }: { children: ReactNode}) {
  const { tasks, currentTask } = useTaskContext()
  return (
<section>
  {tasks.map((task) => {
    if (task.id === currentTask.id) {
      return (
        <article key={task.id}>
          <span>{task.text}</span>
          <p>{`${task.operand1} ${task.type} ${task.operand2}`}</p>
        </article>
      );
    }
    return null; // Return null for non-matching tasks
  })}
  {children}
</section>
  )
}
