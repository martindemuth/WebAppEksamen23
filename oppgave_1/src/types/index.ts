export type Task = {
  id: string
  text: string
  tries: number
  type: "+" | "-" | "*" | "/"
  operand1: number
  operand2: number
}

export type Type = "+" | "-" | "*" | "/"
