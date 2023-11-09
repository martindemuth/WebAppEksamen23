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
  const url = `http://localhost:3000/api`
  

  return (
    <main>
      <Header />
      <TaskProvider url={url}>
        {/* den viser bare første i task, så går ikke bla, venter på currentTask */}
        <Tasks>
          <Answer />
        </Tasks>
        <TaskText text={"Hva blir resultatet av regneoperasjonen?"} />
        <Progress/>
      </TaskProvider>
    </main>
  )
}
