"use client"
import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
//import Task from "@/components/Task"
import { type Task } from "@/types"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import {TaskProvider} from "@/features/TaskContext"


export default function Home() {
  // TODO: Flytt til egen custom hook
  // TODO: Try/catch
  const url = `http://localhost:3002/api/tasks`
  

  return (
    <main>
      <Header />
      <TaskProvider url={url}>
        {/* den viser bare første i task, så går ikke bla, venter på currentTask */}
        {/* <TaskText text={"Hva blir resultatet av regneoperasjonen?"} /> */}
        <Tasks>
          <Answer />
        </Tasks>
        <Progress/>
      </TaskProvider>
    </main>
  )
}
