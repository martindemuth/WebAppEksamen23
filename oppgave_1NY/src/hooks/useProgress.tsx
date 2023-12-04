// useProgress.js
import { useState, useEffect, useLayoutEffect } from "react";
import { Task } from "@/types";

export default function useProgress({ tasks }: { tasks: Task[] }) {
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState<Task | null>(null);

  useEffect(() => {
    const newCount = Math.max(0, Math.min(count, tasks.length - 1));
    setCount(newCount);
    setCurrent(tasks[newCount]);
  }, [count, tasks]);

  const next = () => {
    setCount((prevCount) => Math.min(prevCount + 1, tasks.length - 1));
  };

  const prev = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  };

  return { count, current, next, prev };
}
