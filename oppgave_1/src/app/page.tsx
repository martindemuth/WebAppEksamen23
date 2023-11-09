import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
//import Task from "@/components/Task"
import { type Task } from "@/types"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import TaskProvider from "@/features/TaskContext"


export default async function Home() {
  // TODO: Flytt til egen custom hook
  // TODO: Try/catch
  const response = await fetch(`http://localhost:3000/api?count=10`, {
    method: "GET",
    cache: "no-store"
  })
  const result = (await response.json()) as {success: boolean, data: Task[]}
  const url = `http://localhost:3000/api`
  console.log(result)

  return (
    <main>
      <Header />
      <TaskProvider url={url}>
        <Tasks tasks={result.data}>
          <Answer />
        </Tasks>
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        <Progress tasks={result.data}/>
      </TaskProvider>
    </main>
  )
}
