"use client";
import React, { useState, useEffect } from "react";

const GameQuestion = () => {
  const [timer, setTimer] = useState(30);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const question = "Quelle est la capitale de la France ?";
  const answers = [
    { text: "Paris", color: "bg-red-500" },
    { text: "Lyon", color: "bg-blue-500" },
    { text: "Marseille", color: "bg-yellow-400" },
    { text: "Nice", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-white text-black px-4 py-6 relative">
      <div className="absolute top-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        {timer}s
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 mt-8">
        {question}
      </h1>

      <div className="flex flex-col items-center justify-end h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full w-full max-w-4xl">
          {answers.map((ans, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`text-2xl font-bold ${ans.color} text-white rounded-lg py-6 px-4 shadow-xl hover:scale-105 transition-transform duration-300
                ${selectedIdx === idx ? "ring-4 ring-white scale-105" : ""}
              `}
            >
              {ans.text}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        1/10
      </div>
    </div>
  );
};

export default GameQuestion;
