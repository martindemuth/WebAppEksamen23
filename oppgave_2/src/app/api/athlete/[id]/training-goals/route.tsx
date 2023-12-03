import { NextRequest } from "next/server";
import * as trainingGoalController from "@/features/trainingGoals/trainingGoals.controller"
import { useSearchParams } from "next/navigation";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
){
    const yearString = request.nextUrl.searchParams.get("year")
    const year = yearString ? parseInt(yearString) : undefined
    return await trainingGoalController.getTrainingGoals(params.id, year)
}

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
){
    return await trainingGoalController.createTrainingGoal(request, params.id)
}