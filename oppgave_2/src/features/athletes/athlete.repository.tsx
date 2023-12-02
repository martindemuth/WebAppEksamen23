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



export const create = async (athleteData: CreateAthleteInput): Promise<NextResponse<Result<Athlete>>> => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    const prismaAthlete = await prisma.athlete.create({
      data: athleteData, 
      include: {
        sport: true,
        meta: true
      }
    })
    console.log(prismaAthlete)

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


export const getById = async (id: string): Promise<NextResponse<Result<Athlete>>> => {
  try {
    const athlete = await prisma.athlete.findUnique({
      where: {
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
    console.log(athlete)

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