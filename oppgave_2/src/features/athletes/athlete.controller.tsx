import { Athlete, CreateAthleteInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as athleteService from './athlete.service'
import { error } from "console"



export const createAthlete = async (req: NextRequest): Promise<NextResponse<Result<Athlete>>> => {
    if(!req.body) return NextResponse.json(
        {success: false, error: "No body included in request"},
        { status: 400 }
    )
    try {
        const athleteData = (await req.json()) as CreateAthleteInput
        return await athleteService.create(athleteData)
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
    
    