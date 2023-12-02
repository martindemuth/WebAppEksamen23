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
    try {
        const goalDate = new Date(dateString)
        // Sjekker om det finnes 3 treningsmål for det året
        const athleteGoalCount = await trainingGoalRepo.getGoals({
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
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}

export async function getTrainingGoalsOfAthlete(
    req: NextRequest, 
    athleteId: string, 
    year?: number
    ): Promise<NextResponse<Result<TrainingGoal[]>>>{
    let query: Prisma.TrainingGoalFindManyArgs

    // Om Year er definert, ta bare med treningsmål innenfor det året, ellers ta med alle
    if(year) {
        if(year < 1900 || year > 2500) return NextResponse.json(
            {success: false, error: "Invalid year range" }, { status: 400 }
            )
        query = {
            where: {
                athleteId,
                date: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year+1}-01-01`)
                }
            },
            include: {
                athlete: true
            }
        }
    }
    else 
        query = {
            where: {
                athleteId
            },
            include: {
                athlete: true
            }
        }
    try {
        const result = await trainingGoalRepo.getGoals(query)
        return NextResponse.json({ success: true, data: result }, { status: 200 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}

export async function getAllTrainingGoals(
    req: NextRequest, 
    year?: number
    ): Promise<NextResponse<Result<TrainingGoal[]>>>{
    let query: Prisma.TrainingGoalFindManyArgs

    // Om Year er definert, ta bare med treningsmål innenfor det året, ellers ta med alle
    if(year) { 
        if(year < 1900 || year > 2500) 
            return NextResponse.json({success: false, error: "Invalid year range" }, { status: 400 })
        query = {
            where: {
                date: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year+1}-01-01`)
                }
            },
            include: {
                athlete: true
            }
        }
    }
    else query = {
        include: {
            athlete: true
        }
    }
    
    try {
        const result = await trainingGoalRepo.getGoals(query)
        return NextResponse.json({ success: true, data: result }, { status: 200 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}