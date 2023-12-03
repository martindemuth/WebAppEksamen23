import { NextRequest, NextResponse } from "next/server";
import * as athleteController from '@/features/athletes/athlete.controller'

export function GET(request: NextRequest, { params }: { params: { id: string } }){
    return athleteController.getAthleteById(params.id)
}