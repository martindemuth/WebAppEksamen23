import { type Task } from "@/types"
import useProgress from "@/hooks/useProgress"
import { useTaskContext } from "@/features/TaskContext"

export default function Progress() {
  
  const {currentTask: current, prev, next} = useTaskContext()

  return (
    // <footer className="mt-4 border-t-slate-300">
    //   <button onClick={() => prev()} className="bg-purple-700 text-white">
    //     Forrige
    //   </button>
    //   {/* <button onClick={() => next()} className="bg-teal-700 text-white">
    //     Neste
    //   </button> */}
    // </footer>
    null
  )
}
