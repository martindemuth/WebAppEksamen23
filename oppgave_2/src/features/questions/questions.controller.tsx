import { Question, Result } from "@/types"
import { NextRequest, NextResponse } from "next/server"
import * as questionsService from "./questions.service"

/**
 * 
 * @param {NextRequest} req The NextRequest. Must include QuestionFormData
 * @returns {Promise<NextResponse<Result<Question>>>} The created Question object
 */
export const createQuestion = async (req: NextRequest): Promise<NextResponse<Result<Question>>> => {
    if(!req.body) return NextResponse.json(
        {success: false, error: "No body included in request"},
        { status: 400 }
    )
    return await questionsService.createQuestion(req)
}

/**
 * 
 * @param {string} id The Id of the question to query for
 * @returns {Promise<NextResponse<Result<Question>>>} The queried Question object
 */
export const getQuestion = async (id: string): Promise<NextResponse<Result<Question>>> => {
    if(!id) return NextResponse.json(
        {success: false, error: "No id included in request"},
        { status: 400 }
    )
    return await questionsService.getQuestion(id)
}


/**
 * 
 * @returns {Promise<NextResponse<Result<Question>>>} List of all questions
 */
export const getQuestions = async (): Promise<NextResponse<Result<Question[]>>> => {
    return await questionsService.getQuestions()
}