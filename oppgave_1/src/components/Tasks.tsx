import { type ReactNode } from "react"
import { type Task } from "@/types"
import { useTaskContext } from "@/features/TaskContext"
import { getServerSideProps } from "next/dist/build/templates/pages"

export default function Tasks({ children }: { children: ReactNode}) {
  const { tasks, currentTask } = useTaskContext()
  
  const getOperation = (operationType: string) => {
    switch(operationType){
      case "add": return "+"
      case "subtract": return "-"
      case "multiply": return "*"
      case "divide": return "/" 
    }
  }

  return (
<section>
  {tasks.map((task) => {
    if (task.id === currentTask.id) {
      return (
        <article key={task.id}>
          <span>Skriv resultatet av regneoperasjonen</span>
          <p>{`${task.operand1} ${getOperation(task.type)} ${task.operand2}`}</p>
        </article>
      );
    }
    return null; // Return null for non-matching tasks
  })}
  {children}
</section>
  )
}
