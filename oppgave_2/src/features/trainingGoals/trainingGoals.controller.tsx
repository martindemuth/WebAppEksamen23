import { Result, TrainingGoal } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import * as trainingGoalService from "./trainingGoals.service"

/**
 * 
 * @param {NextRequest} req The NextRequest. Must include TrainingGoalFormData
 * @param {string} id The Id of Athlete to associate the TrainingGoal with
 * @returns {Promise<NextResponse<Result<TrainingGoal>>>} The created TrainingGoal object
 */
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

/**
 * 
 * @param {string} athleteId Which TrainingGoals associated with Athlete to query for. If not defined, search for every Athlete
 * @param {number} year Which year to query for. If not defined, search for every year
 * @returns {Promise<NextResponse<Result<TrainingGoal[]>>>} List of TrainingGoals, based on given parameters
 */
export async function getTrainingGoals(athleteId?: string, year?: number): Promise<NextResponse<Result<TrainingGoal[]>>>{
    return await trainingGoalService.getTrainingGoals(athleteId, year)
}