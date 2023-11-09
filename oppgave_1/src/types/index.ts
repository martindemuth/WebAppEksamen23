export type Task = {
  id: string
  text: string
  tries: number
  type: Type
  operand1: number
  operand2: number
}

export type Type = "+" | "-" | "*" | "/"

export type FakerTask = {
  id: () => string
  text: string
  tries: number
  type: () => Type
  operand1: () => number
  operand2: () => number
}