import prisma from '@/lib/prisma'
import { Athlete as PrismaAthlete } from '@prisma/client'

export const create = async (data) => {
    // bruker try/catch for å håndtere feil gitt av Prisma
    try {
      // bruker prisma clienten til å lage bruker
      // .create er metoden vi bruker for å lage noe
      const athlete = await prisma.user.create({ data })
  
      return { success: true, data: athlete }
    } catch (error) {
      return { success: false, error: 'Failed creating athlete' }
    }
  }
  
  export const exist = async ({ id }) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })
  
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: 'Failed finding user' }
    }
  }