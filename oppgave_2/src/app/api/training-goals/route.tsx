import { NextRequest } from "next/server"
import * as trainingGoalController from "@/features/trainingGoals/trainingGoals.controller"
import { useSearchParams } from "next/navigation";

export async function GET(
    request: NextRequest
){
    const yearString = request.nextUrl.searchParams.get("year")
    const year = yearString ? parseInt(yearString) : undefined
    return await trainingGoalController.getTrainingGoals(undefined, year)
}