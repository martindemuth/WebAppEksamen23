import { Task } from "@/types";
import { useEffect, useState } from "react";


export default function useTasks(url: string, count: number){
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        async function getTasks(count: number) {
            const response = await fetch(url + `/tasks?count=${count}`, {
                method: "GET"
            })
            const result = (await response.json()) as { data: Task[], success: boolean, error: string}
            if(result.success) setTasks(result.data)
            else console.error(result.error)
        }
        getTasks(count)
    }, [])

    
    
    return {
        tasks,
        setTasks
    }
}