import { useEffect } from "react"

import Answer from "@/components/Answer"
import Header from "@/components/Header"
import Progress from "@/components/Progress"
import Tasks from "@/components/Tasks"
import TaskText from "@/components/Text"

export default async function Home() {
  const count = 10
  const response = await fetch(
    `http://localhost:3000/api/restapi?count=${count}`,
    {
      method: "get",
    },
  )
  const result = await response.json()


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
