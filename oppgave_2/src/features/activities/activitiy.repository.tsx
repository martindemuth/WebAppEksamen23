import prisma from "@/lib/prisma"
import { Activity, Athlete, Competition, CreateActivity, CreateCompetitionInput, Result, TrainingGoal } from "@/types"
import { Prisma, Athlete as PrismaAthlete, Activity as PrismaActivity } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

const activityMapper = <T extends Activity>(props: PrismaActivity): T => {
    const {id, ...rest} = props
    const activity = {
        ...rest
    }
    return activity as T
}

export const create = async (activityData: CreateActivity): Promise<Activity> => {
    // TODO: Restrict to three per year for each individual
    const result = await prisma.activity.create({
        data: activityData,
        include: {
            athlete: true,
            tags: true,
            questions: true,
            intervals: true,
            competition: true,
            trainingGoal: true,
            sport: true
        }
    })
    console.log(result)
    return activityMapper(result)
}