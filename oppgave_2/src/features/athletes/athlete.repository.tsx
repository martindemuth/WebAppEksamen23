import prisma from '@/lib/prisma'
import { Athlete, AthleteData, CreateAthleteInput, CreateCompetitionInput, Gender, Result, SportType } from '@/types'
import { Meta as PrismaMeta, Athlete as PrismaAthlete, Sport as PrismaSport } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// Solution based on following code https://stackoverflow.com/a/72222929
type AthleteMapperProps<T> = T & {
  sport: PrismaSport,
  meta?: PrismaMeta[],
}

// Maps the Prisma Athlete model to the Athlete type by removing/adding appropriate fields
const athleteMapper = <T extends Athlete>(props: AthleteMapperProps<PrismaAthlete>): T => {
    const {sportId, metaId, ...rest} = props
    const athlete = {
      ...rest,
      sport: rest.sport.name as SportType,
      meta: rest.meta?.find((meta) => meta.id === metaId) as AthleteData
    }
    return athlete as T
}



export const create = async (athleteData: Athlete): Promise<NextResponse<Result<Athlete>>> => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    const {sport, meta, ...prismaAthleteInput} = athleteData
    const prismaAthlete = await prisma.athlete.create({
      data: {
        ...prismaAthleteInput,
        sport: {
          connect: {
            name: sport
          }
        },
        meta: {
          create: {
            heartrate: meta?.heartrate ?? 0,
            watt: meta?.watt ?? 0,
            speed: meta?.speed ?? 0
          }
        }
      }, 
      include: {
        sport: true,
        meta: true
      }
    })
    console.log(prismaAthlete)
    console.log(athleteData)

    return NextResponse.json(
        { success: true, data: athleteMapper(prismaAthlete) },
        { status: 201 }
      )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 }
    )
  }
}

export const addCompetition = async (id: string, competitionData: CreateCompetitionInput): Promise<NextResponse<Result<Athlete>>> => {
  try {
    const result = await prisma.athlete.update({
      where: { 
        id: id 
      },
      data: {
        competition: {
          create: competitionData 
        }
      },
      include: {
        sport: true,
        competition: true
      }
    })
    

    return NextResponse.json(
        { success: true, data: athleteMapper(result) },
        { status: 201 }
      )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500 }
    )
  }
}


export const getByUserId = async (id: string): Promise<NextResponse<Result<Athlete>>> => {
  try {
    const athlete = await prisma.athlete.findUnique({
      where: {

        // userId - changed to use the prisma id
        id,
      },
      include: {
        sport: true,
        meta: true
      }
    })

    if(!athlete) {
      return NextResponse.json({success: true, data: null}, { status: 404 })
    }

    return NextResponse.json(
      { success: true, data: athleteMapper(athlete) },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500}
      ) 
  }
}

export const getAll = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  try {
    const athletes = await prisma.athlete.findMany({
      include: {
        sport: true,
        meta: true
      }
    })

    if(!athletes) {
      return NextResponse.json({success: true, data: null}, { status: 404 })
    }

    const athletesMapped = athletes.map((athlete) => athleteMapper(athlete))

    return NextResponse.json(
      { success: true, data: athletesMapped },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: JSON.stringify(error) },
      { status: 500}
      ) 
  }
}

const getSportById = async (sportId: number) => await prisma.sport.findUniqueOrThrow({
  where: {
    id: sportId
  }
})

const getMetaById = async (metaId: string | null) => metaId ? await prisma.meta.findUnique({
  select: {
    heartrate: true,
    watt: true,
    speed: true,
    date: true
  },
  where: {
    id: metaId
  } 
}): null