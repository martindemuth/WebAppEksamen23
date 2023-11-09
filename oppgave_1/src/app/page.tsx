import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
//import Task from "@/components/Task"
import { type Task } from "@/types"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"


export default async function Home() {
  // TODO: Flytt til egen custom hook
  // TODO: Try/catch
  const response = await fetch(`http://localhost:3000/api/`, {
    method: "GET"
  })
  const result = (await response.json()) as {success: boolean, data: Task[]}
  


  return (
    <main>
      <Header />
      <Tasks tasks={result.data}>
        <Answer />
      </Tasks>
      <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
      <Progress tasks={result.data}/>
    </main>
  )
}
