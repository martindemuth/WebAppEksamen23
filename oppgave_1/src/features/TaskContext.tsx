import useProgress from "@/hooks/useProgress";
import useTask from "@/hooks/useTask";
import { Task } from "@/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type TaskContextType = {
    getTasks: (count: number) => void
    next: () => void
    prev: () => void
    currentTask: Task
    tasks: Task[]
    isFirstTask: boolean
    isFinalTask: boolean
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = (props: {
    children: ReactNode
    url: string
}) => {
    
    useEffect(() => {
        getTasks(10)
    }, [])


    const {children, url} = props

    const [tasks, setTasks] = useState<Task[]>([])

    
    const {currentTask, next, prev, isFirstTask, isFinalTask} = useProgress(tasks)
    

    const getTasks = async (count: number) => {
        const response = await fetch(url + `?count=${count}`, {
            method: "GET"
        })
        const result = (await response.json()) as { data: Task[], success: boolean, error: string}
        result.success ? setTasks(result.data) : console.error(result.error)
    }
    
    const value = {
        getTasks,
        next,
        prev,
        currentTask,
        tasks,
        isFirstTask,
        isFinalTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if(!context) throw new Error("TaskContext is missing a TaskProvider!")
    return context
}