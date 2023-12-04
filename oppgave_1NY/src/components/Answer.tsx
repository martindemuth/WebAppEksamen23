'use client';

import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";

import useAnswer from "@/hooks/useAnswer";
import { Task } from "@/types";
import useProgress from "@/hooks/useProgress";


export default function Answer(props: {
  tasks: { tasks: Task[] };
  currenttask: { currenttask: Task };
}) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0); // Start with 0 attempts
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const { calculateExpression } = useAnswer();

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (answer !== null) {
      const result = calculateExpression(
        props.currenttask.type,
        props.currenttask.data
      );
      const isCorrect = result !== null && result === answer;
      setCorrectAnswer(isCorrect);

      if (attempts < 2) {
        setAttempts(attempts + 1);
      } else if (attempts === 2) {
        setAttempts(attempts + 1);
      }
    } else {
      console.error("Feil svar");
      setCorrectAnswer(null);
    }
  };

  const update = (event: FormEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.valueAsNumber);
  };

  const showAnswer = () => {
    if (attempts === 3) {
      setShowCorrectAnswer(true);
    }
  };

  useEffect(() => {
    setCorrectAnswer(null);
    setAttempts(0); // Reset attempts to 0 when the task changes
    setShowCorrectAnswer(false);
  }, [props.currenttask]);

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
          <p>Riktig svar er: {calculateExpression(props.currenttask.type, props.currenttask.data)}</p>
        </div>
      )}
      {attempts === 3 && !correctAnswer && (
        <button
          className="m-3 bg-black text-white"
          onClick={showAnswer}
          disabled={showCorrectAnswer}
        >
          Se svar
        </button>
      )}
      <button className="m-3 bg-black text-white" onClick={send} disabled={showCorrectAnswer}>
        Send
      </button>
      <p>Forsøk: {attempts} av 3</p>
    </div>
  );
}


