import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"
import { prisma } from "@/lib/prisma"
import { createTasks } from "@/features/createTasks"

const tasks: Task[] = [
  {
    id: "124",
    tries: 3,
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "9|4",
  },
]

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
const answers = new Map<Task["id"], { attempts: number }>()

export function PUT(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count")
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: tasks }, { status: 207 })
}

export async function GET(request: NextRequest) : Promise<NextResponse<Task[]>> {
  const countParam = request.nextUrl.searchParams.get("count")
  const count = Number(countParam)
  if (!count || count < 1 || count > 10 || isNaN(count))
    return NextResponse.json({ success: false, error: "Invalid count" })
  
  const taskList = createTasks(count);
  const result =  await prisma.task.create({
    taskList.map((task) => ({
      task
    }))
  )
  return NextResponse.json({ success: true, data: result }, { status: 200 })
}
