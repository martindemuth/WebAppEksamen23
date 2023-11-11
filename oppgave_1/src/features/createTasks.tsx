import { FakerTask, Task, Type } from "@/types"


const generateId =  () => {
    return Math.random().toString(9).slice(2, 6)
}

// Barneskolenivå -> Ikke noe høyere enn 10
const generateOperands = () => {
    return Math.floor((Math.random() + 0.1) * 10)
}

const operatorTypes: Type[] = ["add", "subtract", "multiply", "divide"]

const getRandomType = () => {
    return operatorTypes[Math.floor(Math.random() * operatorTypes.length)]
}

export const fakerTask: FakerTask = {
    id: () => generateId(),
    text: "Skriv resultatet av regneoperasjonen",
    tries: 3,
    type: () => getRandomType(),
    operand1: () => generateOperands(),
    operand2: () => generateOperands()
}

export const createTasks = (
    count: number,
    faker?: FakerTask
) => {
    const taskList: Task[] = []

    if (faker === undefined) faker = fakerTask

    let operatorTypeIndex = 0
    for (let index = 0; index < count; index++) {
        const generatedTask = {
            id: faker.id(),
            text: faker.text,
            tries: faker.tries,
            type: operatorTypes[operatorTypeIndex],
            operand1: faker.operand1(),
            operand2: faker.operand2()
        }

        operatorTypeIndex < (operatorTypes.length - 1) ? operatorTypeIndex++ : operatorTypeIndex = 0
        taskList.push(generatedTask)
    }
    return taskList
}