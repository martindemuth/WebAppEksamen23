import prisma from "@/lib/prisma"
import { Athlete, Competition, CreateCompetitionInput, Result } from "@/types"
import { Prisma, Athlete as PrismaAthlete, Competition as PrismaCompetition } from "@prisma/client"
import { NextResponse } from "next/server"

const competitionMapper = <T extends Competition>(props: PrismaCompetition): T => {
    const {athleteId, id, ...rest} = props
    console.log(props)
    console.log(rest)
    return rest as T
}

export const create = async (data: CreateCompetitionInput): Promise<NextResponse<Result<Competition>>> => {
    // bruker try/catch for å håndtere feil gitt av Prisma
    try {
        const prismaCompetition = Prisma.validator<CreateCompetitionInput>()(data) 
        console.log(prismaCompetition)
        // TODO: Restrict to three per year for each individual
        const competition = await prisma.competition.create({
            data: prismaCompetition
        })
    
        return NextResponse.json(
            { success: true, data: competitionMapper(competition) },
            { status: 201 }
            )
        } catch (error) {
        return NextResponse.json(
            { success: false, error: JSON.stringify(error) },
            { status: 500 }
        )
    }
}