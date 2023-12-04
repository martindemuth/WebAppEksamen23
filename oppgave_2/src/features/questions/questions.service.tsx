import { Question, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as questionsRepo from "./questions.repository"
import { QuestionFormData } from "@/components/createQuestions"
import repositoryExceptionHandler from "../repositoryExceptionHandler"


export const createQuestion = async (req: NextRequest): Promise<NextResponse<Result<Question>>> => {
    const body = (await req.json()) as QuestionFormData
    const {question, type} = body

    // Se om det er felt som mangler
    const missingField: String[] = []
    if(!question || question === "") missingField.push("question")
    if(!type) missingField.push("type")
    if(missingField.length > 0) return NextResponse.json(
        { success: false, error: "Missing neccessary fields: " + missingField}, 
        { status: 400 }
    )

    try {
        const result = await questionsRepo.create({
            question,
            type
        })
        console.log(`Added question "${result.question}" to database`)
        return NextResponse.json(
            { success: true, data: result }, { status: 201 }
        )
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while creating Question (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}

export const getQuestion = async (id: string): Promise<NextResponse<Result<Question>>> => {
    try {
        const result = await questionsRepo.findOne({ id })
        
        return result ? 
            NextResponse.json(
                {success: true, data: result}, { status: 200 }
            )
            : NextResponse.json(
                {success: false, error: `Could not find the queried question with id ${id}`}, { status: 404 }
            )
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while fetching Questions (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}

export const getQuestions = async (): Promise<NextResponse<Result<Question[]>>> => {
    try {
        const result = await questionsRepo.findMany({})
        
        return result.length > 0 ? 
            NextResponse.json(
                {success: true, data: result}, { status: 200 }
            )
            : NextResponse.json(
                {success: false, data: result, error: `Could not find any questions`}, { status: 404 }
            )
    } catch (error) {
        const {exception, statusCode} = repositoryExceptionHandler(error)
        console.error(`Error occurred while fetching Questions (statusCode:${statusCode})`)
        return NextResponse.json({ success: false, error: JSON.stringify(exception)}, { status: statusCode })
    }
}