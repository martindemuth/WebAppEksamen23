import { FakerTask, Task, Type } from "@/types"


const generateId =  () => {
    return Math.random().toString(9).slice(2, 6)
}

// Barneskolenivå -> Ikke noe høyere enn 10
const generateData = () => {
    return Math.floor((Math.random() + 0.1) * 10)
}

const operatorTypes: Type[] = ["add", "subtract", "multiply", "divide"]

const getRandomType = () => {
    return operatorTypes[Math.floor(Math.random() * operatorTypes.length)]
}

export const fakerTask: FakerTask = {
    id: () => generateId(),
    type: () => getRandomType(),
    data: () => `${generateData()}|${generateData()}`
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
            text: "Skriv resultatet av regneoperasjonen",
            type: operatorTypes[operatorTypeIndex],
            data: faker.data(),
        }

        operatorTypeIndex < (operatorTypes.length - 1) ? operatorTypeIndex++ : operatorTypeIndex = 0
        taskList.push(generatedTask)
    }
    return taskList
}