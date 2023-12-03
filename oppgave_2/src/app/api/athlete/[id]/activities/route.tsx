import { NextRequest } from "next/server";
import * as activityController from "@/features/activities/activity.controller"

export async function POST(
    request: NextRequest,
    { params }: { params: {id: string} }){
    return activityController.createActivity(request, params.id)
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
){
    return await activityController.getAthleteActivities(params.id)
}