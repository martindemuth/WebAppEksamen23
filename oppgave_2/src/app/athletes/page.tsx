'use client'
import CreateAthlete from "@/components/CreateAthlete";
import Navigation from "@/components/Navigation";
import { useImport } from "@/features/useImport";

export default function CreateAthletePage() {
  
  const {athletes, fetchFromApi} = useImport()
  fetchFromApi()

  return (
    <main>
      <Navigation />
        <button 
        type="button" 
        onClick={fetchFromApi}
        className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
            Importer utøvere
        </button>
      <CreateAthlete />
    </main>
  )
}
