import prisma from "@/lib/prisma"
import { Athlete, TrainingGoal, Result } from "@/types"
import { Prisma, Athlete as PrismaAthlete, TrainingGoal as PrismaGoal } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

const trainingGoalMapper = <T extends TrainingGoal>(props: PrismaGoal): T => {
    const {...rest} = props
    const trainingGoal = {
        ...rest,
        year: new Date(rest.date).getFullYear()
    }
    return trainingGoal as T
}

export const addGoalToAthlete = async (goalData: Prisma.TrainingGoalCreateInput): Promise<TrainingGoal> => {
    const result = await prisma.trainingGoal.create({
        data: goalData,
        include: {
            athlete: true
        }
    })

    return trainingGoalMapper(result)
}

export const findOne = async (query: Prisma.TrainingGoalFindUniqueArgs): Promise<TrainingGoal | undefined> => {
    const result = await prisma.trainingGoal.findUnique(query)
    return result ? trainingGoalMapper(result) : undefined
}

export const findMany = async (query: Prisma.TrainingGoalFindManyArgs): Promise<TrainingGoal[]> => {
    const result = await prisma.trainingGoal.findMany(query)
    if(result.length <= 0) {
        console.warn("No training goals were found within the given query")
        return []
      }
    
    return result.map((trainingGoal) => trainingGoalMapper(trainingGoal))
}

// fungerte ikke. Måtte bruke FindMany for å gjøre jobben
export const count = async (query: Prisma.TrainingGoalCountArgs): Promise<number> => {
    const result = await prisma.trainingGoal.count(query)
    if(!result) throw new Error("Error occurred while counting goals. Result is empty.")
    else {
        console.debug(result)
        return result
    }
}