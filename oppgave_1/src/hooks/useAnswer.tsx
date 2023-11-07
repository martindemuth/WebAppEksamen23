

export default function useAnswer () {
    const calculateExpression = (type: String, operand1: number, operand2: number) => {
        switch (type) {
            case "+":
                return operand1 + operand2
            case "-":
                return operand1 - operand2
            case "/":
                return operand1 * operand2
            case "*": 
                return operand1 / operand2
        }
    }
    return {calculateExpression}
}