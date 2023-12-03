"use client"
import TrainingGoalTable from "@/components/TrainingGoalTable"
import Navigation from "@/components/Navigation"
import { useRouter, useSearchParams } from "next/navigation"

export default function TrainingGoalsPage(){
  const searchParams = useSearchParams()
  const year = searchParams.get("year")
  const apiUrlQuery = `api/training-goals${year ? `?year=${year}` : ``}` 

  return(
  <div>
    <Navigation />
    <div className="mt-20 mx-28">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <TrainingGoalTable url={apiUrlQuery} />
      </div>
    </div>  
  </div>
  )
}