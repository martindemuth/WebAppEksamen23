import { Athlete } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as athleteService from './athlete.service'



export const createAthlete = async (req: NextRequest) => {
    const { id, gender, sport } = (await req.json()) as Athlete
    
    if (!id)
    return NextResponse.json({success: false, error: 'Missing required field: id' }, {status: 400})
      
    if (!gender)
    return  NextResponse.json({success: false, error: 'Missing required field: gender' }, {status: 400})
      
    if (!sport)
      return NextResponse.json({success: false, error: 'Missing required field: sport' }, {status: 400})

    const createdAthlete = await athleteService.create({
        id,
        gender,
        sport
    })

    if (!createdAthlete?.success) 
        return NextResponse.json({success: false, error: createdAthlete.error}, {status: 500})
      
    // 201 Created om alt går bra
    return NextResponse.json({success: true, data: createdAthlete.data}, {status: 201})    
}
    
    