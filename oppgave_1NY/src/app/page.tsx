import { useEffect } from "react"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"
import { Task } from "@/types"

export default async function Home() {
  const count = 10
  const response = await fetch(
    `http://localhost:3000/api/restapi?count=${count}`,
    {
      method: "get",
      cache: "no-cache"
    },
  )
  const result = (await response.json()) as {success: boolean, data: Task[]}
 

  return (
    <main>
      <Header />
      <Progress tasks={result.data}>
        {/* <TaskText text={"Hva blir resultatet av regneoperasjonen?"} /> */}
        <Tasks tasks={result.data}>
          <Answer />
        </Tasks>
      </Progress>
    </main>
  )
}
