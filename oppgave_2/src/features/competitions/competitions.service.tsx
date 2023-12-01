import { Competition, CreateCompetitionInput, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as competitionRepo from './competitions.repository'
import { CompetitionFormData } from "@/components/Competition"


export const create = async (req: NextRequest, athleteId: string): Promise<NextResponse<Result<Competition>>> => {
    const body = (await req.json()) as CompetitionFormData
    const { name, dateString, location, competitionGoal, priority, comment } = body

    // Se om det er felt som mangler
    const missingField: String[] = []
    if(!name || name === "") missingField.push("name")
    if(!competitionGoal || competitionGoal === "") missingField.push("competition Goal")
    if(!dateString || dateString === "") missingField.push("dateString")
    if(!priority || priority === "") missingField.push("priority")
    if(!location || location === "") missingField.push("location")
    if(missingField.length > 0) return NextResponse.json(
        { success: false, error: "Missing neccessary fields: " + missingField}, 
        { status: 400 }
    )
    
    try {   
        return competitionRepo.create({
            name,
            date: new Date(dateString),
            location,
            competitionGoal,
            priority,
            comment,
            athlete: {
                connect: {
                    id: athleteId
                }
            }
        })

    } catch (error) {
        return NextResponse.json(
        { success: false, error: JSON.stringify(error)}, 
        { status: 500 }
    )
    }
}