import { NextRequest, NextResponse } from 'next/server'
import * as athleteRepo from './athlete.repository'
import { Athlete, CreateAthleteInput, Result } from '@/types'

export const create = async (athleteData: CreateAthleteInput): Promise<NextResponse<Result<Athlete>>> => {
  const {userId, gender, sport} = athleteData

  if (!userId || !gender || !sport)
    return NextResponse.json({success: false, error: `
        ${ userId ? "" : "Missing required field: userId\n"}
        ${ gender ? "" : "Missing required field: gender\n"}
        ${ sport  ? "" : "Missing required field: sport"}` 
    }, {status: 400})

  const searchResponse = (await athleteRepo.getById(userId)) as NextResponse<Result<Athlete>>

  // feil med hentingen av data fra databasen via ORM
  if (searchResponse.status == 500) return searchResponse

  // bruker finnes hvis respons er 200 OK
  if (searchResponse.status == 200) return NextResponse.json(
    { success: false, error: 'Athlete already exist' },
    { status: 409 })

  const createdResponse = await athleteRepo.create(
    { userId, 
      gender, 
      sport 
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
