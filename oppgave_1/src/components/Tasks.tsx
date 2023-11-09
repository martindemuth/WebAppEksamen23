'use client'
import { type ReactNode } from "react"
import { type Task } from "@/types"
import { useTaskContext } from "@/features/TaskContext";

export default function Tasks({ children, tasks, currentId }: { children: ReactNode, tasks: Task[], currentId: string }) {
  
// TODO: Fikse currentTask, så den bruker den Id istede for current
  const {currentTask} = useTaskContext()

  console.log(currentTask);

  return (
<section>
  {tasks.map((task) => {
    if (task.id === currentId) {
      return (
        <article key={task.id}>
          <p>{task.type}</p>
          <h3>{task.text}</h3>
          <p>{`${task.operand1} ${task.type} ${task.operand2}`}</p>
        </article>
      );
    }
    return null;
  })}
  {children}
</section>
  )
}
