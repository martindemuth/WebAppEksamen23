import { NextRequest, NextResponse } from "next/server";
import * as athleteController from '@/features/athletes/athlete.controller'

export function GET(request: NextRequest){
    return athleteController.listAllAthletes()
}

export async function POST(request: NextRequest){
    return athleteController.createAthlete(request)
}