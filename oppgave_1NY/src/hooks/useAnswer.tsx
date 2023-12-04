export default function useAnswer() {
  const calculateExpression = (type: string, data: string) => {
    let operation: string = ""

    switch (type) {
      case "add":
        operation = "+"
        break
      case "subtract":
        operation = "-"
        break
      case "multiply":
        operation = "*"
        break
      case "divide":
        operation = "/"
        break
      default:
        operation = ""
    }

    const [number1String, number2String] = data?.split("|") ?? ["0", "0"]
    const number1 = parseInt(number1String, 10)
    const number2 = parseInt(number2String, 10)

    if (!isNaN(number1) && !isNaN(number2) && operation !== "") {
      try {
        const result = eval(`${number1} ${operation} ${number2}`)

        if (!isNaN(result)) {
          return result
        } else {
          console.error("Evaluation result is not a valid number")
          return null
        }
      } catch (error) {
        console.error("Error during evaluation:", error)
        return null
      }
    } else {
      console.error("Invalid operation type or operands")
      return null
    }
  }

  return { calculateExpression }
}
