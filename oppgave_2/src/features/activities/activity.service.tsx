import { Activity, Competition, CreateCompetitionInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as activityRepo from './activitiy.repository'

import repositoryExceptionHandler from "../repositoryExceptionHandler"
import { Prisma } from "@prisma/client"
import { ActivityFormData } from "@/components/CreateActivity"

export const create = async (req: NextRequest, athleteId: string): Promise<NextResponse<Result<Activity>>> => {
    const body = (await req.json()) as ActivityFormData
    const { name, dateString, tags, questions, intervals, sportId, goalId, competitionId, templateId } = body

    // TODO: Se om det er felt som mangler
    
    const date = new Date(dateString)

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

                // Loop - for hver
                connect: {

                }
            },
            intervals: {
                // Loop og create
                create:
            },
            sport: {
                connect: {
                    id: sportId
                }
            },
            goalId,
            competitionId,
            templateId,

            athlete: {
                connect: {
                    id: athleteId
                }
            }
        })

        return NextResponse.json({ success: true, data: result }, { status: 201 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while creating competition (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}
