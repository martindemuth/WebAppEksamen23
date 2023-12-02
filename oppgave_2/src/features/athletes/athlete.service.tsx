import { NextRequest, NextResponse } from 'next/server'
import * as athleteRepo from './athlete.repository'
import { Athlete, CreateAthleteInput, CreateCompetitionInput, Result } from '@/types'
import { AthleteFormData } from '@/components/CreateAthlete'

export const create = async (req: NextRequest): Promise<NextResponse<Result<Athlete>>> => {
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

  const searchResponse = (await athleteRepo.getById(userId)) as NextResponse<Result<Athlete>>

  // feil med hentingen av data fra databasen via ORM
  if (searchResponse.status == 500) return searchResponse

  // bruker finnes hvis respons er 200 OK
  if (searchResponse.status == 200) return NextResponse.json(
    { success: false, error: 'Athlete already exist' },
    { status: 409 })

  // Lager og returner utøver
  const createdResponse = await athleteRepo.create({
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

  // feil ved lagring av bruker via ORM
  if (!createdResponse.ok) return createdResponse

  return createdResponse
}

export const getAll = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  return await athleteRepo.getAll()
}

export const getById = async ({id}: {id: string}): Promise<NextResponse<Result<Athlete>>> => {
  return await (athleteRepo.getById(id))
    
}


