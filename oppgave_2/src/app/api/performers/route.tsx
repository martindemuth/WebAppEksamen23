import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest){
    return NextResponse.json({success: true}, {status: 200})
}

export function POST(request: NextRequest){
    return NextResponse.json({success: true}, {status: 200})
}