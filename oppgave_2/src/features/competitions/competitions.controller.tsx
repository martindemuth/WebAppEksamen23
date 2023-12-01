import { Competition, Result } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as competitionService from './competitions.service'

export const createCompetition = async (req: NextRequest): Promise<NextResponse<Result<Competition>>> => {
    if(!req.body) return NextResponse.json(
        { success: false, error: "Request has no body"}, 
        { status: 400 }
    )
    console.log(req.body)
    return await competitionService.create(req)
}