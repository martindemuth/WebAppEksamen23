"use client"
import Navigation from "@/components/Navigation"
import TrainingGoalTable from "@/components/TrainingGoalTable"
import { useRouter, useSearchParams } from "next/navigation"

export default function AthleteTrainingGoalsPage(props: {
    params: { id: string }
}){
    const id = props.params.id
    const router = useRouter()
    const searchParams = useSearchParams()
    const year = searchParams.get("year")
    const apiUrlQuery = `/api/athlete/${id}/training-goals${year ? `?year=${year}` : ``}` 
  
    return(
    <div>
      <Navigation />
      <div className="mt-20 mx-28">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <button 
            type="button" 
            onClick={() => router.push(`/athletes/${id}/training-goals/create`)}
            className="mb-4 mt-1 ml-1 inline-flex items-center text-white bg-blue-500 focus:outline-none hover:bg-blue-700 hover:text-yellow-300 font-medium rounded-lg text-base px-4 py-1.5">
                Opprett ny treningsmål
            </button>
          <TrainingGoalTable url={apiUrlQuery} />
        </div>
      </div>  
    </div>
    )
}