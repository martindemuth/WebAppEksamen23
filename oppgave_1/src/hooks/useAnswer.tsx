

export default function useAnswer () {
    const calculateExpression = (type: string, operand1: number, operand2: number) => {
        switch (type) {
            case "add":
                return operand1 + operand2
            case "subtract":
                return operand1 - operand2
            case "divide":
                return operand1 / operand2
            case "multiply": 
                return operand1 * operand2
        }
    }
    return {calculateExpression}
}