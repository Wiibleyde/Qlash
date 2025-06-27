"use client";
import React from "react";

interface QCMAnswerOption {
  content: string;
}

interface QCMAnswerGridProps {
  answers: QCMAnswerOption[];
  selectedIdx: number | null;
  handleAnswer: (answer: number) => void;
}

const QCMAnswerGrid: React.FC<QCMAnswerGridProps> = ({
  answers,
  selectedIdx,
  handleAnswer,
}) => {

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-yellow-400",
    "bg-green-500",
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-4xl">
      {answers.map((ans, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(idx)}
          className={`text-2xl font-bold ${colors[idx]} text-black rounded-lg py-6 px-4 shadow-xl hover:scale-105 transition-transform duration-300
            ${selectedIdx === idx ? "ring-4 ring-white scale-105" : ""}
          `}
        >
          {ans.content}
        </button>
      ))}
    </div>
  );
};

export default QCMAnswerGrid;
