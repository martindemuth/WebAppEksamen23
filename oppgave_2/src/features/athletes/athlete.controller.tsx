import { Athlete, CreateAthleteInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as athleteService from './athlete.service'
import { error } from "console"
import { at } from "vitest/dist/reporters-5f784f42"

export const createAthlete = async (req: NextRequest): Promise<NextResponse<Result<Athlete>>> => {
    if(!req.body) return NextResponse.json(
        {success: false, error: "No body included in request"},
        { status: 400 }
    )
    return await athleteService.create(req)
}

export const listAllAthletes = async (): Promise<NextResponse<Result<Athlete[]>>> => {
    try {
        return await athleteService.getAll()
    } catch (error) {
        console.error("Error occurred while creating athlete", error)
        return NextResponse.json(
            { 
            success: false, 
            error: JSON.stringify(error) 
            },
            { status: 500 }
        )
    }
}

export const getAthleteById = async (req: NextRequest, id: string): Promise<NextResponse<Result<Athlete>>> => {
    if (!id) return NextResponse.json(
      {
        success: false,
        error: "Missing id",
      },
      { status: 400 },
    )

    try {
        return await athleteService.getById({id})
    } catch (error) {
        console.error("Error occurred while fetching athlete", error)
        return NextResponse.json(
            { 
            success: false, 
            error: JSON.stringify(error) 
            },
            { status: 500 }
        )
    }
}

