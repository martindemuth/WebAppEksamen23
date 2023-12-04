import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"
import { createTasks } from "@/features/createTasks"


let tasks: Task[] = []

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
  
  const taskList = createTasks(count)
  return NextResponse.json({ success: true, data: taskList }, { status: 200 })
}