import { NextRequest, NextResponse } from 'next/server'
import * as athleteRepo from './athlete.repository'
import { Athlete, CreateAthleteInput, CreateCompetitionInput, Result } from '@/types'
import { AthleteFormData } from '@/components/CreateAthlete'
import repositoryExceptionHandler from '../repositoryExceptionHandler'

export const createAthlete = async (req: NextRequest): Promise<NextResponse<Result<Athlete>>> => {
  const body = (await req.json()) as AthleteFormData
  const { userId, gender, sport } = body

  // Se om det er felt som mangler
  const missingField: String[] = []
  if(!userId || userId === "") missingField.push("userId")
  if(!gender) missingField.push("gender")
  if(!sport || sport === "") missingField.push("sport")
  if(missingField.length > 0) return NextResponse.json(
      { success: false, error: "Missing neccessary fields: " + missingField}, 
      { status: 400 }
  )

  // Sjekker om utøver eksisterer fra før. Undefined om ikke.
  try {
    const exists = await athleteRepo.findOne({ userId })

    if (exists) return NextResponse.json(
      { success: false, error: 'Athlete already exist' },
      { status: 409 })
  } catch (error) {
    const {exception, statusCode} = repositoryExceptionHandler(error)
    console.error(`Error occurred while checking for existing athlete during create process (statusCode:${statusCode})`)
    return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
  }

  // Lager og returner utøver
  try {
    
    const result = await athleteRepo.create({
      userId,
      gender,
      sport: {
        connect: {
          name: sport
        }
      },
      meta: {
        create: {
          heartrate: 0,
          watt: 0,
          speed: 0
        }
      }
    })

    return NextResponse.json(
      {success: true, data: result}, { status: 201 }
    )
  } catch (error) {
    const {exception, statusCode} = repositoryExceptionHandler(error)
    console.error(`Error occurred while creating athlete (statusCode:${statusCode})`)
    return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
  }
}

export const getAllAthletes = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  try {
    const result = await athleteRepo.findMany()
    const statusCode = result.length > 0 ? 200 : 404
    return NextResponse.json(
      {success: true, data: result}, 
      { status: statusCode, statusText: `Found ${result.length} athletes`}
    )
  } catch (error) {
    const {exception, statusCode} = repositoryExceptionHandler(error)
    console.error(`Error occurred while searching for athletes (statusCode:${statusCode})`)
    return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
  }
}

export const getAthleteById = async (id: string): Promise<NextResponse<Result<Athlete>>> => {
  try {
    const result = await athleteRepo.findOne({ id })
    if(result) {
      return NextResponse.json(
        {success: true, data: result}, { status: 200, statusText: `Athlete found`}
      )
    } else return NextResponse.json(
      {success: false, error: `Athlete not found`}, { status: 404}
    )
    
  } catch (error) {
    const {exception, statusCode} = repositoryExceptionHandler(error)
    console.error(`Error occurred while searching for athlete (statusCode:${statusCode})`)
    return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
  }
}


