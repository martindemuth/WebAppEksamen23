import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"

// Statuskodene basert delvis på følgende https://socket.dev/npm/package/prisma-better-errors
const prismaCodeToStatusCodeMap: Map<string, number> = new Map([
    ["P2000", 400],
    ["P2001", 404],
    ["P2007", 400],
    ["P2011", 500],
    ["P2012", 400],
    ["P2013", 400],
    ["P2014", 400],
    ["P2015", 404],
    ["P2016", 400],
    ["P2017", 400],
    ["P2018", 404],
    ["P2019", 400],
    ["P2021", 500],
    ["P2022", 500],
    ["P2021", 500],
])

export default function repositoryExceptionHandler(e: unknown) {
    let exceptionInstance = e
    let defaultStatusCode = 500

    
    if(exceptionInstance instanceof PrismaClientKnownRequestError) {
        console.log(exceptionInstance)
        return {
            exception: e,
            statusCode: prismaCodeToStatusCodeMap.get(
                exceptionInstance.code
            ) ?? 500
        } 
    }
    else if(exceptionInstance instanceof PrismaClientUnknownRequestError) {
        console.log(exceptionInstance)
        return {
            exception: e,
            statusCode: defaultStatusCode
        } 
    }
    else if(exceptionInstance instanceof PrismaClientValidationError) {
        console.log(exceptionInstance)
        return {
            exception: e,
            statusCode: defaultStatusCode
        } 
    }
    else {
        console.log(exceptionInstance)
        return {
            exception: e,
            statusCode: defaultStatusCode
        }  
    } 
}