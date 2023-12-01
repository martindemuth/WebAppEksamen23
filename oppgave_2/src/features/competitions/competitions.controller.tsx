import { Competition, Result } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as competitionService from './competitions.service'

export const createCompetition = async (req: NextRequest, id: string): Promise<NextResponse<Result<Competition>>> => {
    if(!req.body) return NextResponse.json(
        { success: false, error: "Request has no body"}, 
        { status: 400 }
    )
    if(id === "") return NextResponse.json(
        { success: false, error: "athlete/[id] has no value"}, 
        { status: 400 }
    )

    return await competitionService.create(req, id)
}