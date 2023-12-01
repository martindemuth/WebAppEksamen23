import { NextRequest } from "next/server";
import * as competitionController from "@/features/competitions/competitions.controller"

// TODO: THIS IS WRONG 
export async function POST(
    request: NextRequest,
    { params }: { params: {id: string} }){
    return competitionController.createCompetition(request, params.id)
}