import { NextRequest } from "next/server"
import * as questionsController from "@/features/questions/questions.controller"
import { useSearchParams } from "next/navigation";

export async function GET(
    request: NextRequest
){
    return await questionsController.getQuestions()
}

export async function POST(
    request: NextRequest
){
    return await questionsController.createQuestion(request)
}