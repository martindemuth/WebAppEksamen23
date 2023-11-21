import * as athleteRepo from './athlete.repository'

export const create = async ({ id, gender, sport }) => {
    //const athlete = await athleteRepo.exist({ id })
  
    // feil med hentingen av data fra databasen via ORM
    //if (athlete?.error) return { success: false, error: athlete.error }
  
    // bruker finnes hvis data har verdi
    //if (athlete.data) return { success: false, error: 'Athlete already exist' }
  
    const createdAthlete = await athleteRepo.create({ id, gender, sport })
  
    // feil ved lagring av bruker via ORM
    if (!createdAthlete.success) return { success: false, error: createdAthlete.error }
  
    return { success: true, data: createdAthlete.data }
  }