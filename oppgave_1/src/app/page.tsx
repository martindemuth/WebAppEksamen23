"use client"
import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
//import Task from "@/components/Task"
import { type Task } from "@/types"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import {TaskProvider} from "@/features/TaskContext"
import { useEffect } from "react"
import useTasks from "@/hooks/useTasks"


export default function Home() {
  const url = `http://localhost:${process.env.NEXT_PUBLIC_PORT ?? 3000}/api/tasks`

  return (
    <main>
      <Header />
      <TaskProvider url={url} count={10}>
        <Tasks>
          <Answer />
        </Tasks>
        <Progress/>
      </TaskProvider>
    </main>
  )
}
