import { Result, TrainingGoal } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as trainingGoalService from "./trainingGoals.service"

export async function createTrainingGoal(req: NextRequest, id: string): Promise<NextResponse<Result<TrainingGoal>>>{
    if(!req.body) return NextResponse.json(
        { success: false, error: "Request has no body"}, 
        { status: 400 }
    )
    if(!id || id === "" || id === undefined) return NextResponse.json(
        { success: false, error: "athlete/[id] has no value"}, 
        { status: 400 }
    )

    return await trainingGoalService.createTrainingGoal(req, id)
}

export async function getTrainingGoals(req: NextRequest, athleteId?: string, year?: number): Promise<NextResponse<Result<TrainingGoal[]>>>{
    // Om athleteId er definert, hent bare fra den utøveren, ellers fra alle utøvere
    if(athleteId) return await trainingGoalService.getTrainingGoalsOfAthlete(req, athleteId, year)
    else return await trainingGoalService.getAllTrainingGoals(req, year)
}