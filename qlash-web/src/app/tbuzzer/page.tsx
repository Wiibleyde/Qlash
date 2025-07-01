"use client";
import BuzzerAnswerGrid from "@/components/grid/BuzzerAnswerGrid";
import React from "react";

const players = [
  { name: "Alice", score: 2 },
  { name: "Bob", score: 3 },
  { name: "Carol", score: 5 },
  { name: "Dave", score: 1 },
];

const Tbuzzer = () => {

  return (
        <div className="min-h-screen flex flex-col items-center justify-around bg-white text-black px-4 py-6 relative">
      <div className="absolute top-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        30s
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 mt-8">
        Question ?
      </h1>

      <div className="flex flex-col items-center justify-end h-full w-full">
        <BuzzerAnswerGrid
          players={players}
          onSubmitPlayerAnswer={(index: number, answer: string) => {
            // Handle the submitted answer here
            const playerName = players[index]?.name;
            console.log(`${playerName} answered: ${answer}`);
          }}
        />
      </div>

      <div className="absolute bottom-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        1/2
      </div>
    </div>
)};

export default Tbuzzer;
