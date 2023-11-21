import { NextRequest, NextResponse } from "next/server";
import * as athleteController from '@/features/athletes/athlete.controller'

export function GET(request: NextRequest){
    return NextResponse.json({success: true}, {status: 200})
}

export function POST(request: NextRequest){

    return athleteController.createAthlete(request)

}

export default async function athleteHandler(req, res) {
    const { method } = req

    switch (method?.toLowerCase()) {
        case 'get':
          // kaller på kontrolleren som brukes til å hente alle brukere
          await athleteController.listAllAthletes(req, res)
          break
        case 'post':
          // kaller på kontrolleren som brukes til å lage ny bruker
          await athleteController.createAthlete(req, res)
          break
        default:
          // gir 405 Method Not Allowed hvis brukeren prøver på noe annet 
          // enn POST
          res.status(405).end()
      }
    }