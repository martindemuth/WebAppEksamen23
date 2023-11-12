import useProgress from "@/hooks/useProgress";
import useTasks from "@/hooks/useTasks";
import useTask from "@/hooks/useTasks";
import { Task } from "@/types";
import { TaskAnswer } from "@/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type TaskContextType = {
    next: () => void
    prev: () => void
    currentTask: Task
    tasks: Task[]
    //taskAnswers: TaskAnswer []
    isFirstTask: boolean
    isFinalTask: boolean
    url: string
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider = (props: {
    children: ReactNode
    url: string,
    count: number
}) => {
    const {children, url, count} = props
    const {tasks, setTasks} = useTasks(url, count)
    const {currentTask, next, prev, isFirstTask, isFinalTask} = useProgress(tasks)
    

    const value = {
        next,
        prev,
        currentTask,
        tasks,
        isFirstTask,
        isFinalTask,
        url
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