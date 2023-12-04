"use client"
import { useEffect, useState } from "react"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import useTasks from "@/hooks/useTasks"
import { prisma } from "@/lib/prisma"
import useProgress from "@/hooks/useProgress"
import { Answer as TaskAnswer, Task } from "@/types"

export default function Home() {
  const count = 10
  
  const [tasks, setTasks] = useState<Task[]>([])
  const [answers, setAnswers ] = useState<TaskAnswer[]>([])
  const { count: taskIndex, current: currentTask, next, prev} = useProgress({tasks: tasks})
  const [currentAnswer, setCurrentAnswer] = useState(answers[taskIndex])

  useEffect(() => {
    const fetchFromApi = async () => {
      const response = await fetch(`http://localhost:3000/api/restapi?count=${count}`,{
            method: "GET",
          },
        )
      const result = (await response.json()) as {success: boolean, data: Task[]}
      setTasks(result.data)
      const answerList: TaskAnswer[] = []
      tasks.map((task) => 
        answerList.push({
          taskId: task.id,
          attempts: 0,
          answer: 0
        })
      )
      setAnswers(answerList)
    }
    fetchFromApi()
  }, [])

  useEffect(() => {
    setCurrentAnswer(answers[taskIndex])
  }, [taskIndex])
  


  return (
    <main>
      <Header />
        {/* <TaskText text={"Hva blir resultatet av regneoperasjonen?"} /> */}
        <Tasks tasks={tasks} currenttask={currentTask}>
          <Answer currentAnswer={currentAnswer} currentTask={currentTask}/>
        </Tasks>
        <Progress current={currentTask} count={taskIndex} next={next} prev={prev}   />
    </main>
  )
}
