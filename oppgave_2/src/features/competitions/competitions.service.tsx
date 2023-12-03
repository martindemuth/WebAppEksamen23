import { Competition, CreateCompetitionInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as competitionRepo from './competitions.repository'
import { CompetitionFormData } from "@/components/CreateCompetition"
import repositoryExceptionHandler from "../repositoryExceptionHandler"
import { Prisma } from "@prisma/client"

const MAX_ANNUAL_COMPETITIONS = 3

export const create = async (req: NextRequest, athleteId: string): Promise<NextResponse<Result<Competition>>> => {
    const body = (await req.json()) as CompetitionFormData
    const { name, dateString, location, competitionGoal, priority, comment } = body

    // Se om det er felt som mangler
    const missingField: String[] = []
    if(!name || name === "") 
        missingField.push("name")
    if(!competitionGoal || competitionGoal === "") 
        missingField.push("competition Goal")
    if(!dateString || dateString === "") 
        missingField.push("dateString")
    if(!priority || priority === "") 
        missingField.push("priority")
    if(!location || location === "") 
        missingField.push("location")
    if(missingField.length > 0) return NextResponse.json(
        { success: false, error: "Missing neccessary fields: " + missingField}, 
        { status: 400 }
    )

    const date = new Date(dateString)
    
    try {
        // Sjekker antall treningsmål for det året
        const athleteCompetitionsCount = await competitionRepo.findMany({
            select: {
                _count: true
            },
            where: {
                athleteId,
                date: {
                    gte: new Date(`${date.getFullYear()}-01-01`),
                    lt: new Date(`${date.getFullYear()+1}-01-01`)
                },
            },
        })
        if(athleteCompetitionsCount.length >= MAX_ANNUAL_COMPETITIONS) return NextResponse.json(
            {success: false, error: `Athlete already has ${MAX_ANNUAL_COMPETITIONS} or more competitions that year`}, { status: 409 }
        )
        console.log(athleteCompetitionsCount.length)
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while checking for existing competitions during create process (statusCode:${statusCode})`)
        return NextResponse.json(
            { success: false, error: JSON.stringify(exception)}, { status: statusCode }
        )
    }

    try {   
        const result = await competitionRepo.create({
            name,
            date,
            location,
            competitionGoal,
            priority,
            comment,
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


export async function GetCompetitions(
    athleteId?: string, 
    year?: number
    ): Promise<NextResponse<Result<Competition[]>>>{

    if(year && year < 1900 || year && year > 2500) 
        return NextResponse.json(
            {success: false, error: "Invalid year range" }, { status: 400 }
        )
    
    const query: Prisma.CompetitionFindManyArgs = {
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
        const result = await competitionRepo.findMany(query)
        return NextResponse.json({ success: true, data: result }, { status: 200 })
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while checking for existing competitions (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}
