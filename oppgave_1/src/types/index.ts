export type Task = {
  id: string
  text: string
  tries: number
  type: Type
  operand1: number
  operand2: number
}

export type Type = "add" | "subtract" | "multiply" | "divide"

export type FakerTask = {
  id: () => string
  text: string
  tries: number
  type: () => Type
  operand1: () => number
  operand2: () => number
}

export type TaskAnswer = {
  id: string
  isCorrect: boolean
  attempts: number
  taskId: string
}