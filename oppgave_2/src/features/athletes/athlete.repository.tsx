import prisma from '@/lib/prisma'
import { Athlete, Athlete as PrismaAthlete } from '@prisma/client'

export const create = async (data: { 
  userId: string
  gender: string
  sport: string 
}) => {
    console.log(data)
    // bruker try/catch for å håndtere feil gitt av Prisma
    try {

      const athlete: PrismaAthlete = 

      // bruker prisma clienten til å lage bruker
      // .create er metoden vi bruker for å lage noe
      const result = await prisma.athlete.create(data)
      console.log(athlete)
      return { success: true, data: athlete }
    } catch (error) {
      return { success: false, error: `Failed creating athlete: \n${error}` }
    }
  }
  
  export const exist = async ({ id }: { id: string }) => {
    try {
      const user = await prisma.athlete.findUnique({
        where: {
          id,
        },
      })
  
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: 'Failed finding user' }
    }
  }