"use client";
import React from "react";

interface QCMAnswerOption {
  text: string;
  color: string;
}

interface QCMAnswerGridProps {
  answers: QCMAnswerOption[];
  selectedIdx: number | null;
  onSelect: (idx: number) => void;
}

const QCMAnswerGrid: React.FC<QCMAnswerGridProps> = ({
  answers,
  selectedIdx,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-4xl">
      {answers.map((ans, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`text-2xl font-bold ${ans.color} text-white rounded-lg py-6 px-4 shadow-xl hover:scale-105 transition-transform duration-300
            ${selectedIdx === idx ? "ring-4 ring-white scale-105" : ""}
          `}
        >
          {ans.text}
        </button>
      ))}
    </div>
  );
};

export default QCMAnswerGrid;
