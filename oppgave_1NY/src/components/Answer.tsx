'use client';

import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";

import useAnswer from "@/hooks/useAnswer";
import { Answer, Task } from "@/types";
import useProgress from "@/hooks/useProgress";

const MAX_ATTEMPTS = 3

export default function Answer({ currentAnswer, currentTask }: { currentAnswer: Answer, currentTask: Task }) {
  const [currentAnswerInput, setCurrentAnswerInput] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [showViewButton, setShowViewButton] = useState<boolean>(false)
  const { calculateExpression } = useAnswer();

  const send = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (currentAnswerInput !== null) {
      const result = calculateExpression(
        currentTask.type,
        currentTask.data
      );
      const isCorrect = result !== null && result === currentAnswerInput;
      setCorrectAnswer(result !== null && result === currentAnswerInput);

      if (attempts < 3) {
        setAttempts((prev) => prev++)
      } else {
        setShowViewButton(true)
      }
    } else {
      console.error("Feil svar");
      setCorrectAnswer(false);
    }

    if(attempts > 3 || correctAnswer) {
      const response = await fetch("/api/restapi", {
            method: "post",
            body: JSON.stringify(currentAnswer),
            headers: {
              "Content-Type": "application/json"
            }
          })
      const result = (await response.json()) as {success: boolean, data: Answer}
      result ? console.log("Answer sent") : console.error("Failed to send answer")
    }
  };

  const update = (event: FormEvent<HTMLInputElement>) => {
    setCurrentAnswerInput(event.currentTarget.valueAsNumber);
  };

  const showAnswer = () => {
    if (currentAnswer && attempts === 3) {
      setShowCorrectAnswer(true);
    }
  };

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="number"
        placeholder="Sett svar her"
        onInput={update}
      />
      {correctAnswer !== null && correctAnswer ? "Bra jobbet!" : null}
      {showCorrectAnswer &&  (
        <div>
          <p>Riktig svar er: {calculateExpression(currentTask.type, currentTask.data)}</p>
        </div>
      )}
      {showViewButton ? 
        <button
          className="m-3 bg-black text-white"
          onClick={showAnswer}
          disabled={showCorrectAnswer}
        >
          Se svar
        </button>
       : ""}
      <button className="m-3 bg-black text-white" onClick={send} disabled={showCorrectAnswer}>
        Send
      </button>
      <p>Forsøk: {attempts} av 3</p>
    </div>
  );
}


