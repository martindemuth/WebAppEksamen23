import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type Task } from "@/types"
import { createTasks } from "@/features/createTasks"
import { useParams, useSearchParams } from "next/navigation"

const tasks: Task[] = [
  {
    id: "124",
    text: "Skriv resultatet av regneoperasjonen",
    type: "*",
    operand1: 2,
    operand2: 3,
    tries: 3,
  },
  {
    id: "123",
    text: "Skriv resultatet av regneoperasjonen",
    type: "+",
    operand1: 2,
    operand2: 3,
    tries: 3,
  },
  {
    id: "234",
    text: "Skriv resultatet av regneoperasjonen",
    type: "+",
    operand1: 2,
    operand2: 3,
    tries: 3,
  },
  {
    id: "356",
    text: "Skriv resultatet av regneoperasjonen",
    type: "+",
    operand1: 2,
    operand2: 3,
    tries: 3,
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

export function GET(request: NextRequest, {params}: {params: {count: number}}) {
  const count = 3
  const taskList = tasks
  
  if (!count)
    return NextResponse.json({ success: false, error: "Invalid count" })
  return NextResponse.json({ success: true, data: taskList }, { status: 200 })
}
