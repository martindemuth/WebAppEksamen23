import { Competition, Result } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as competitionService from './competitions.service'

/**
 * 
 * @param {NextRequest} req The NextRequest. Must include CompetitionFormData
 * @param {string} id The Id of Athlete to associate the Competition with
 * @returns {Promise<NextResponse<Result<Competition>>>} The created Competition object
 */
export const createCompetition = async (
    req: NextRequest, 
    id: string
    ): Promise<NextResponse<Result<Competition>>> => {
    if(!req.body) return NextResponse.json(
        { success: false, error: "Request has no body"}, 
        { status: 400 }
    )
    if(!id || id === "") return NextResponse.json(
        { success: false, error: "athlete/[id] has no value"}, 
        { status: 400 }
    )

    return await competitionService.create(req, id)
}


/**
 * 
 * @param {string} athleteId Which Competitions associated with Athlete to query for. If not defined, search for every Athlete
 * @param {number} year Which year to query for. If not defined, search for every year
 * @returns {Promise<NextResponse<Result<Competition[]>>>} List of Competitions, based on given parameters
 */
export const getCompetitions = async (
    athleteId?: string, 
    year?: number
    ): Promise<NextResponse<Result<Competition[]>>> =>{
    return await competitionService.GetCompetitions(athleteId, year)
}