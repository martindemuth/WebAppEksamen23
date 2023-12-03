import { NextRequest, NextResponse } from "next/server";
import * as trainingGoalRepo from "./trainingGoals.repository"
import { TrainingGoal, Result } from "@/types";
import { TrainingGoalFormData } from "@/components/CreateTrainingGoal";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import repositoryExceptionHandler from "../repositoryExceptionHandler";
import prisma from "@/lib/prisma";

const MAX_ANNUAL_GOALS = 3

export async function createTrainingGoal(
    req: NextRequest, 
    id: string
    ): Promise<NextResponse<Result<TrainingGoal>>> {
    const body = (await req.json()) 
    const {name, goalTarget, dateString, comment} = body as TrainingGoalFormData
    
    
    const goalDate = new Date(dateString)

    // Sjekker antall treningsmål for det året. Returnerer status 409 dersom det er over grensen
    try {
        
        const athleteGoalCount = await trainingGoalRepo.findMany({
            select: {
                _count: true
            },
            where: {
                athleteId: id,
                date: {
                    gte: new Date(`${goalDate.getFullYear()}-01-01`),
                    lt: new Date(`${goalDate.getFullYear()+1}-01-01`)
                },
            },
        })
        if(athleteGoalCount.length >= MAX_ANNUAL_GOALS) return NextResponse.json(
            {success: false, error: `Athlete already has ${MAX_ANNUAL_GOALS} or more training goals that year`}, { status: 409 }
        )
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while checking for existing goals during create process (statusCode:${statusCode})`)
        return NextResponse.json(
            { success: false, error: JSON.stringify(exception)}, { status: statusCode }
        )
    }

    // Lagrer TrainingGoal til databasen
    try { 
        const result = await trainingGoalRepo.addGoalToAthlete({
            name,
            date: new Date(dateString),
            goalTarget: parseInt(goalTarget),
            comment,
            athlete: {
                connect: {
                    id
                }
            }
        })
    
        return NextResponse.json({ success: true, data: result }, { status: 201 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while creating training goal (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}


export async function getTrainingGoals(
    athleteId?: string, 
    year?: number
    ): Promise<NextResponse<Result<TrainingGoal[]>>>{

    if(year && year < 1900 || year && year > 2500) 
        return NextResponse.json(
            {success: false, error: "Invalid year range" }, { status: 400 }
        )
    
    const query: Prisma.TrainingGoalFindManyArgs = {
        where: {
            athleteId,
            date: year ? {
                gte: new Date(`${year}-01-01`),
                lt: new Date(`${year+1}-01-01`)
            } : undefined
        },
        orderBy: {
            date: "desc"
        },
        include: athleteId ? {
            athlete: true
        } : undefined,
    }
    
    try {
        const result = await trainingGoalRepo.findMany(query)
        return NextResponse.json({ success: true, data: result }, { status: 200 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while checking for existing training goals(statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}