import prisma from "@/lib/prisma"
import { Athlete, Competition, CreateCompetitionInput, Result } from "@/types"
import { Prisma, Athlete as PrismaAthlete, Competition as PrismaCompetition } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

const competitionMapper = <T extends Competition>(props: PrismaCompetition): T => {
    const {athleteId, id, ...rest} = props
    console.log(props)
    console.log(rest)
    return rest as T
}

export const create = async (competitionData: CreateCompetitionInput): Promise<NextResponse<Result<Competition>>> => {
    // bruker try/catch for å håndtere feil gitt av Prisma
    try {
        // TODO: Restrict to three per year for each individual
        const result = await prisma.competition.create({
            data: competitionData,
            include: {
                athlete: true
            }
        })
        console.log(result)
        return NextResponse.json(
            { success: true, data: competitionMapper(result) },
            { status: 201 }
            )
        } catch (error) {
            console.error(`Error occurred while trying to create competiton: ${JSON.stringify(error)}`)
            const prismaError = error as PrismaClientKnownRequestError
            console.log(prismaError)
            return NextResponse.json(
                { success: false, error: JSON.stringify(error)  },
                { status: 500 }
            )
    }
}