import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { type TaskAnswer } from "@/types"

let taskAnswers: TaskAnswer[] = []

export async function POST(request: NextRequest) {
  const { id, isCorrect, attempts, taskId } = await request.json()

  const taskAnswer: TaskAnswer = {
    id,
    isCorrect,
    attempts,
    taskId,
  }

  taskAnswers.push(taskAnswer)

  return NextResponse.json({ success: true, data: taskAnswer }, { status: 201 })
}

export async function GET(request: NextRequest) {
  const taskAnswersArray = Array.from(taskAnswers.values())
  console.log(taskAnswers)
  return NextResponse.json(
    { success: true, data: taskAnswersArray },
    { status: 200 },
  )
}
