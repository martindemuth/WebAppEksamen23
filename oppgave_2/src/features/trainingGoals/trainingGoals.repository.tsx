import prisma from "@/lib/prisma"
import { Athlete, TrainingGoal, Result } from "@/types"
import { Prisma, Athlete as PrismaAthlete, TrainingGoal as PrismaGoal } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

export const addGoalToAthlete = async (goalData: Prisma.TrainingGoalCreateInput): Promise<TrainingGoal> => {
    const result = await prisma.trainingGoal.create({
        data: goalData,
        include: {
            athlete: true
        }
    })

    if(!result) throw new Error("Error occurred while creating goal. Result is empty.")
    else {
        console.log(result)
        return result as TrainingGoal
    }
}

export const getGoals= async (query: Prisma.TrainingGoalFindManyArgs): Promise<TrainingGoal[]> => {
    
    const result = await prisma.trainingGoal.findMany(query)
    if(!result) throw new Error("Error occurred while getting goals. Result is empty.")
    else {
        return result as TrainingGoal[]
    }
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