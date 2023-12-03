"use client"
import CompetitionTable from "@/components/CompetitionTable"
import Navigation from "@/components/Navigation"
import TrainingGoalTable from "@/components/TrainingGoalTable"
import { useRouter, useSearchParams } from "next/navigation"

export default function CompetitionsPage(){
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const apiUrlQuery = `api/competitions${year ? `?year=${year}` : ``}` 

  return(
  <div>
    <Navigation />
    <div className="mt-20 mx-28">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <CompetitionTable url={apiUrlQuery} />
      </div>
    </div>  
  </div>
  )
}