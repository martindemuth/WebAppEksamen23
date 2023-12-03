import { Athlete, CreateAthleteInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as athleteService from './athlete.service'
import { error } from "console"
import { at } from "vitest/dist/reporters-5f784f42"

/**
 * 
 * @param {NextRequest} req The NextRequest. Must include AthleteFormData
 * @returns {Promise<NextResponse<Result<Athlete>>>} The created Athlete object
 */
export const createAthlete = async (req: NextRequest): Promise<NextResponse<Result<Athlete>>> => {
    if(!req.body) return NextResponse.json(
        {success: false, error: "No body included in request"},
        { status: 400 }
    )
    return await athleteService.createAthlete(req)
}

/**
 * 
 * @returns List of all athletes
 */
export const listAllAthletes = async (): Promise<NextResponse<Result<Athlete[]>>> => {
    return await athleteService.getAllAthletes()
}

/**
 * 
 * @param {string} id The Id of the requested Athlete
 * @returns The requested Athlete
 */
export const getAthleteById = async (id: string): Promise<NextResponse<Result<Athlete>>> => {
    if (!id) return NextResponse.json(
      { success: false, error: "Missing id"}, { status: 400 }
    )

    return await athleteService.getAthleteById(id)
}

