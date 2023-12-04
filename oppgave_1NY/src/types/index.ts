import { Prisma } from "@prisma/client"

export type Task = {
  id: string
  text: string
  type: "add" | "divide" | "multiply" | "subtract"
  data: `${number}|${number}`
}

export type Type = "add" | "subtract" | "multiply" | "divide"

export type FakerTask = {
  id: () => string
  type: () => Type
  data: () => `${number}|${number}`
}

export type Answer = {
  answer: number
  attempts: number,
  taskId: string
}

export type CreateTaskInput = Prisma.TaskCreateInput
export type CreateAnswerInput = Prisma.AnswerCreateInput
