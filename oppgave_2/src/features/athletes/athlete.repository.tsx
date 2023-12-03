import prisma from '@/lib/prisma'
import { Athlete, AthleteData, CreateAthleteInput, CreateCompetitionInput, Gender, Result, SportType } from '@/types'
import { Meta as PrismaMeta, Athlete as PrismaAthlete, Sport as PrismaSport, Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// Solution based on following code https://stackoverflow.com/a/72222929
type AthleteMapperProps<T> = T & {
  sport: PrismaSport,
  meta: PrismaMeta,
}

// Maps the Prisma Athlete model to the Athlete type by removing/adding appropriate fields
const athleteMapper = <T extends Athlete>(props: AthleteMapperProps<PrismaAthlete>): T => {
    const {sportId, metaId, meta, ...rest} = props
    const athlete = {
      ...rest,
      sport: rest.sport.name as SportType,
      meta: meta as AthleteData
    }
    return athlete as T
}


export const create = async (athleteData: Prisma.AthleteCreateInput): Promise<Athlete> => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  const prismaAthlete = await prisma.athlete.create({
    data: athleteData, 
    include: {
      sport: true,
      meta: true
    }
  })
  console.log(prismaAthlete)

  return athleteMapper(prismaAthlete)
}


export const findOne = async (query: Prisma.AthleteWhereUniqueInput): Promise<Athlete | undefined> => {
  const prismaAthlete = await prisma.athlete.findUnique({
    where: query,
    include: {
      sport: true,
      meta: true
    }
  })
  return prismaAthlete ? athleteMapper(prismaAthlete) : undefined
}

export const findMany = async (query?: Prisma.AthleteWhereInput): Promise<Athlete[]> => {
  const athletes = await prisma.athlete.findMany({
    where: query,
    include: {
      sport: true,
      meta: true
    }
  })

  if(athletes.length <= 0) {
    console.warn("No athletes were found within the given query")
    return []
  }

  return athletes.map((athlete) => athleteMapper(athlete))
}