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
  const url = `http://localhost:3000/api/tasks`
  

  return (
    <main>
      <Header />
      <TaskProvider url={url}>
        <Tasks>
          <Answer />
        </Tasks>
        <Progress/>
      </TaskProvider>
    </main>
  )
}
