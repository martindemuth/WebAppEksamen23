import prisma from "@/lib/prisma"
import { Activity, Athlete, Competition, CreateActivity, CreateCompetitionInput, Intervals, Parameter, Question, Result, TrainingGoal } from "@/types"
import { Prisma, 
    Athlete as PrismaAthlete, 
    Activity as PrismaActivity, 
    Sport as PrismaSport, 
    ActivityTags as PrismaTags, 
    Question as PrismaQuestion,
    Interval as PrismaInterval,
    Competition as PrismaCompetition,
    TrainingGoal as PrismaTrainingGoal,
    Template as PrismaTemplate } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"


type ActivityMapperProps<T> = T & {
    sport: PrismaSport,
    athlete: PrismaAthlete,
    tags: PrismaTags[],
    questions: PrismaQuestion[],
    intervals: PrismaInterval[],
  }

const activityMapper = <T extends Activity>(props: ActivityMapperProps<PrismaActivity>): T => {
    const {id, tags, questions, intervals, sport, athlete, sportId, ...rest} = props
    const activity = {
        ...rest,
        sport: sport.name,
        tags: tags.map((tag) => tag.name),
        questions: questions as Question[],
        intervals: intervals as Intervals[],
        parameter: [] as Parameter[],
    }
    return activity as T
}

export const create = async (activityData: Prisma.ActivityCreateInput): Promise<Activity> => {
    // TODO: Restrict to three per year for each individual
    const result = await prisma.activity.create({
        data: activityData,
        include: {
            athlete: true,
            tags: true,
            questions: true,
            intervals: true,
            sport: true,
        }
    })
    console.log(result)
    return activityMapper(result)
}

export const findOne = async (activityData: Prisma.ActivityWhereUniqueInput): Promise<Activity | undefined> => {
    const result = await prisma.activity.findUnique({
        where: activityData,
        include: {
            athlete: true,
            tags: true,
            questions: true,
            intervals: true,
            sport: true,
        }
    })
    console.log(result)
    return result ? activityMapper(result) : undefined
}

export const findMany = async (activityData: Prisma.ActivityWhereInput): Promise<Activity[]> => {
    // TODO: Restrict to three per year for each individual
    const result = await prisma.activity.findMany({
        where: activityData,
        include: {
            athlete: true,
            tags: true,
            questions: true,
            intervals: true,
            sport: true,
        }
    })
    console.log(result)
    return result.map((activity) => activityMapper(activity) ) 
}