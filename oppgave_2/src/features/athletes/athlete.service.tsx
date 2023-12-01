import { NextRequest, NextResponse } from 'next/server'
import * as athleteRepo from './athlete.repository'
import { Athlete, CreateAthleteInput, CreateCompetitionInput, Result } from '@/types'

export const create = async (req: NextRequest): Promise<NextResponse<Result<Athlete>>> => {
  const athleteData = (await req.json()) as Athlete

  if (!athleteData.userId || !athleteData.gender || !athleteData.sport)
    return NextResponse.json({success: false, error: `
        ${ athleteData.userId ? "" : "Missing required field: userId\n"}
        ${ athleteData.gender ? "" : "Missing required field: gender\n"}
        ${ athleteData.sport  ? "" : "Missing required field: sport"}` 
    }, {status: 400})

  const searchResponse = (await athleteRepo.getByUserId(athleteData.userId)) as NextResponse<Result<Athlete>>

  // feil med hentingen av data fra databasen via ORM
  if (searchResponse.status == 500) return searchResponse

  // bruker finnes hvis respons er 200 OK
  if (searchResponse.status == 200) return NextResponse.json(
    { success: false, error: 'Athlete already exist' },
    { status: 409 })

  // Lager og returner utøver
  const createdResponse = await athleteRepo.create(athleteData)

  // feil ved lagring av bruker via ORM
  if (!createdResponse.ok) return createdResponse

  return createdResponse
}

export const getAll = async (): Promise<NextResponse<Result<Athlete[]>>> => {
  return await athleteRepo.getAll()
}

export const getById = async ({id}: {id: string}): Promise<NextResponse<Result<Athlete>>> => {
  return await (athleteRepo.getByUserId(id))
    
}


