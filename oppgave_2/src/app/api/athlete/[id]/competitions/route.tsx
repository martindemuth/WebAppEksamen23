import { NextRequest } from "next/server";
import * as competitionController from "@/features/competitions/competitions.controller"


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
){
    const yearString = request.nextUrl.searchParams.get("year")
    const year = yearString ? parseInt(yearString) : undefined
    console.log(year)
    return await competitionController.getCompetitions(params.id, year)
}

export async function POST(
    request: NextRequest,
    { params }: { params: {id: string} }
){
    return await competitionController.createCompetition(request, params.id)
}