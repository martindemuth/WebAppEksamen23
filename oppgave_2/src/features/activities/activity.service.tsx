import { Activity, Competition, CreateCompetitionInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as activityRepo from './activity.repository'

import repositoryExceptionHandler from "../repositoryExceptionHandler"
import { Prisma } from "@prisma/client"
import { ActivityFormData } from "@/components/CreateActivity"

export const create = async (req: NextRequest, athleteId: string): Promise<NextResponse<Result<Activity>>> => {
    const body = (await req.json()) as ActivityFormData
    const { name, dateString, tags, questions, intervals, sportId, goalId, competitionId, templateId } = body

    // TODO: Se om det er felt som mangler
    
    const date = new Date(dateString)
    console.log(body)
    try {   
        const result = await activityRepo.create({
            name,
            date,
            tags: {
                connectOrCreate: tags.map((tag) => {
                    return {
                        where: { name: tag },
                        create: { name: tag },
                    };
                }),
            },
            questions: {
                connect: questions.map((question) => ({ id: question.id })),
            },
            intervals: {
                create: intervals.map((interval) => ({ 
                    intensity: interval.intensity,
                    duration: interval.duration 
                })),
            },
            sport: {
                connect: {
                    id: sportId
                }
            },
            trainingGoal: goalId ? {
                connect: {
                    id: goalId
                }
            } : undefined,
            competition: competitionId ? {
                connect: {
                    id: competitionId
                }
            } : undefined,
            template: templateId ? {
                connect: {
                    id: templateId
                }
            } : undefined,
            athlete: {
                connect: {
                    id: athleteId
                }
            }
        })

        return NextResponse.json({ success: true, data: result }, { status: 201 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while creating activity (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}

export async function getAthleteActivities(
    athleteId?: string
    ): Promise<NextResponse<Result<Activity[]>>>{
    const query: Prisma.ActivityWhereInput = { athleteId }
    try {
        const result = await activityRepo.findMany(query)
        return NextResponse.json({ success: true, data: result }, { status: 200 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while trying to get Athlete Activities (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}
