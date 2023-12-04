import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"
import { createTasks } from "@/features/createTasks"
import { prisma } from "@/lib/prisma"

const tasks: Task[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "add",
    data: "9|4",
  },
]

// TODO: Denne skal brukes til å "samle" svarene (om du ikke bruker database)
const answers = new Map<Task["id"], { attempts: number }>()

export async function PUT(request: NextRequest) {
  const countParam = request.nextUrl.searchParams.get("count")
  const count = Number(countParam)
  if (!count || count < 0 || count > 10 || isNaN(count))
    return NextResponse.json({ success: false, error: "Invalid count" })
  
  tasks = createTasks(count)
  return NextResponse.json({ success: true, data: tasks }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const countParam = request.nextUrl.searchParams.get("count")
  const count = Number(countParam)
  if (!count || count < 0 || count > 10 || isNaN(count))
    return NextResponse.json({ success: false, error: "Invalid count" })
  
  const taskList : Task[] = [];
  try {

    await prisma.task.deleteMany();

    for (const task of createTasks(count)) {

      taskList.push((await prisma.task.create({
        data: {
          text: task.text,
          type: task.type,
          data: task.data,
        },
      })) as Task)
    }

    console.log("Tasks added to the database successfully")
    return NextResponse.json({ success: true, data: taskList }, { status: 200 })
  } catch (error) {
    console.error("Error adding tasks to the database:", error)
    return NextResponse.json({ success: false, error: JSON.stringify(error) }, { status: 500 })
  }
}
