"use client";
import React, { useState, useEffect } from "react";

const GameQuestion = () => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const question = "Quelle est la capitale de la France ?";
  const answers = [
    { text: "Paris" },
    { text: "Lyon" },
    { text: "Marseille" },
    { text: "Nice" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white text-white px-4 py-6 relative">
      <div className="absolute top-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        {timer}s
      </div>

      <h1 className="text-3xl text-black md:text-4xl lg:text-5xl font-extrabold text-center mb-12 mt-8">
        {question}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {answers.map((ans, idx) => (
          <button
            key={idx}
            className={`text-2xl font-bold text-white bg-[#694aff] rounded-2xl py-6 px-4 shadow-xl hover:scale-105 transition-transform duration-300`}
          >
            {ans.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameQuestion;
