import prisma from "@/lib/prisma"
import { Athlete, Competition, CreateCompetitionInput, Result, TrainingGoal } from "@/types"
import { Prisma, Athlete as PrismaAthlete, Competition as PrismaCompetition } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"


const competitionMapper = <T extends Competition>(props: PrismaCompetition): T => {
    const {id, ...rest} = props
    const competition = {
        ...rest,
        year: new Date(rest.date).getFullYear()
    }
    return competition as T
}

export const create = async (competitionData: CreateCompetitionInput): Promise<Competition> => {
    const result = await prisma.competition.create({
        data: competitionData,
        include: {
            athlete: true
        }
    })
    return competitionMapper(result)
}

export const findOne = async (query: Prisma.CompetitionFindUniqueArgs): Promise<Competition | undefined> => {
    const result = await prisma.competition.findUnique(query)
    return result ? competitionMapper(result) : undefined
}

export const findMany = async (query: Prisma.CompetitionFindManyArgs): Promise<Competition[]> => {
    console.log(query)
    const result = await prisma.competition.findMany(query)
    if(result.length <= 0) {
        console.warn("No competitions were found within the given query")
        return []
      }
    return result.map((competition) => competitionMapper(competition))
}
