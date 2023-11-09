import { Task } from "@/types";
import { useState } from "react";

export default function useTask(tasks: Task[]){
    const [taskIndex, setTaskIndex] = useState(0)
    const currentTask = tasks[taskIndex]
    const isFinalTask = taskIndex >= (tasks.length - 1)
    const isFirstTask = taskIndex === 0

    function handleStep(action: "prev" | "next") {
        if(action === "next") setTaskIndex((prevIndex) => (prevIndex + 1))
        else if(action === "prev") setTaskIndex((prevIndex) => (prevIndex - 1))
        else console.error("Error occurred during navigation")
    }

    return {
        handleStep,
        currentTask,
        isFirstTask,
        isFinalTask
    }
}