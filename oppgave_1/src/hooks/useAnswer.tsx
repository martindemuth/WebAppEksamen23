import { count } from "console"


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

    // const checkTypes = (answers: []) => {
    //     const countAdd = 0
    //     const countSubstract = 0
    //     const countDivide = 0
    //     const countMultiply = 0

    //     answers.map((answer) => {
    //         switch (answer.type) {
    //             case "add":
    //                 return countAdd + 1
    //             case "subtract":
    //                 return countSubstract +1
    //             case "divide":
    //                 return countDivide + 1
    //             case "multiply":  
    //                 return countMultiply + 1
    //         }
    //     })

    //     return answers
    // }
}