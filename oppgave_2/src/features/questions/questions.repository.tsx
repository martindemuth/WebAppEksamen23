import prisma from "@/lib/prisma"
import { Question } from "@/types"
import { Prisma, Question as PrismaQuestion } from "@prisma/client"

export const create = async (questionData: Prisma.QuestionCreateInput): Promise<Question> => {
    const result = await prisma.question.create({
      data: questionData, 
    })
    return result as Question
}

export const findOne = async (query: Prisma.QuestionWhereUniqueInput): Promise<Question | undefined> => {
    const result = await prisma.question.findUnique({
        where: query
    })
    return result ? result as Question : undefined
}

export const findMany = async (query: Prisma.QuestionWhereInput): Promise<Question[]> => {
    const result = await prisma.question.findMany({
        where: query
    })
    return result as Question[] 
}