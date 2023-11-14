import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"


import { type TaskAnswer } from "@/types"
import { type Task } from "@/types"

const answers = new Map<Task, TaskAnswer>()

// export async function POST(request: NextRequest) {
//   const { id, isCorrect, attempts, task: currentTask } = await request.json();

//   if (!currentTask) {
//     return NextResponse.json({ success: false, error: "Current task data is missing" }, { status: 400 });
//   }

//   const { id: taskId } = currentTask;

//   const taskAnswer: TaskAnswer = {
//     id,
//     isCorrect,
//     attempts,
//     taskId,
//   };

//   answers.set(currentTask, taskAnswer);

//   return NextResponse.json({ success: true, data: { task: currentTask, taskAnswer } }, { status: 201 });
// }

export async function PUT(request: NextRequest) {
  const { id, isCorrect, attempts, task: currentTask } = await request.json();

  if (!currentTask) {
    return NextResponse.json({ success: false, error: "Current task data is missing" }, { status: 400 });
  }

  const { id: taskId } = currentTask;

  let existingTaskAnswer = answers.get(taskId);

  if (!existingTaskAnswer) {
    existingTaskAnswer = {
      id,
      isCorrect,
      attempts,
      taskId,
      task: currentTask, 
    };

    answers.set(taskId, existingTaskAnswer);

    return NextResponse.json({ success: true, data: { task: currentTask, taskAnswer: existingTaskAnswer } }, { status: 201 });
  }

  existingTaskAnswer.isCorrect = isCorrect;
  existingTaskAnswer.attempts = attempts;
  existingTaskAnswer.task = currentTask; 

  return NextResponse.json({ success: true, data: { task: currentTask, taskAnswer: existingTaskAnswer } }, { status: 200 });
}


export async function GET(request: NextRequest) {
  const taskAnswersArray = Array.from(answers.entries()).map(([task, taskAnswer]) => ({
    task,
    taskAnswer,
  }));

  return NextResponse.json(
    { success: true, data: taskAnswersArray },
    { status: 200 },
  );
}
