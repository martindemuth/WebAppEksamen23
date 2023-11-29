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
      <CreateAthlete />
    </main>
  )
}
