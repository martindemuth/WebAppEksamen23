import { NextRequest } from "next/server";
import * as competitionController from "@/features/competitions/competitions.controller"

export async function GET(
    request: NextRequest
){
    const yearString = request.nextUrl.searchParams.get("year")
    const year = yearString ? parseInt(yearString) : undefined
    return await competitionController.getCompetitions(undefined, year)
}