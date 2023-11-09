import { FakerTask, Task, Type } from "@/types"


const generateId =  () => {
    return Math.random().toString(9).slice(2, 6)
}

// Barneskolenivå -> Ikke noe høyere enn 10
const generateOperands = () => {
    return Math.floor((Math.random() + 0.1) * 10)
}

const possibleTypes: Type[] = ["+", "-", "*", "/"]

const getRandomType = () => {
    return possibleTypes[Math.floor(Math.random() * possibleTypes.length)]
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
    // Finner den optimale oppdelingen til å få en variasjon av oppgavetyper
    // Kan kanskje forenkles
    const varietyRatio = count / possibleTypes.length
    if (faker === undefined) faker = fakerTask
    
    for (let index = 0; index < count; index++) {
        let hasVariety = false
        const generatedTask = {
            id: faker.id(),
            text: faker.text,
            tries: faker.tries,
            type: faker.type(),
            operand1: faker.operand1(),
            operand2: faker.operand2()
        }

        // Regner ut hvor stor andel av operatortypen valgt som finnes i listen allerede, og gir ny verdi dersom den er for stor
        let operatorType = generatedTask.type
        while(!hasVariety){
            let operatorCount = 0
            let operatorRatio = 0
            for (const task of taskList) {
                if (task.type === operatorType) operatorCount++
                operatorRatio = operatorCount / taskList.length
            }
            if (operatorRatio < varietyRatio) {
                hasVariety = true
            } else generatedTask.type = getRandomType()
        }
        taskList.push(generatedTask)
    }
    return taskList
}