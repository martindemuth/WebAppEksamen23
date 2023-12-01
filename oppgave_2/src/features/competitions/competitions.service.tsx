import { Competition, CreateCompetitionInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as competitionRepo from './competitions.repository'


export const create = async (req: NextRequest): Promise<NextResponse<Result<Competition>>> => {
    try {
        const competitionData = (await req.json()) as CreateCompetitionInput
        const missingField: String[] = []
        if(!competitionData.athlete) missingField.push("Athlete")
        if(!competitionData.competitionGoal) missingField.push("Competition Goal")
        if(!competitionData.date) missingField.push("Date")
        if(!competitionData.priority) missingField.push("Priority")
        if(!competitionData.location) missingField.push("Location")
        if(missingField.length > 0) return NextResponse.json(
            { success: false, error: "Missing neccessary fields: " + missingField}, 
            { status: 400 }
        )
        console.log(competitionData)

        return competitionRepo.create(competitionData)
    } catch (error) {
        return NextResponse.json(
        { success: false, error: JSON.stringify(error)}, 
        { status: 500 }
    )
    }
}