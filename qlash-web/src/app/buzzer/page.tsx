"use client";
import React, { useState } from "react";

const players = [
  { name: "Alice", score: 2 },
  { name: "Bob", score: 3 },
  { name: "Carol", score: 5 },
  { name: "Dave", score: 1 },
];

const Buzzer = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-10 px-4 relative">
      <div className="w-full max-w-5xl flex justify-between mb-16 px-8">
        {players.map((player, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-white ${
              index === 0 || index === 3 ? "mt-6" : ""
            }`}
          >
            <p className="text-lg font-bold mb-1">{player.name}</p>
            <div
              className="bg-[#c3b6fe] text-black text-center w-24 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
              style={{
                clipPath:
                  index < 2
                    ? "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)"
                    : "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
            <div className="bg-[#876dff] text-center w-24 h-32 flex items-center justify-center font-bold text-4xl shadow-lg">
              {player.score}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-lg font-bold mb-1">You</p>
        <div
          className="bg-[#c3b6fe] text-black text-center w-46 h-8 flex items-center justify-center font-bold text-lg shadow-lg"
          style={{
            clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
          }}
        ></div>
        <div
          onClick={() => setIsSelected(!isSelected)}
          className="bg-gradient-to-t from-[#a490ff] to-[#876dff] text-center w-46 h-50 flex items-center justify-center font-bold text-5xl shadow-xl cursor-pointer"
          style={{
            boxShadow: isSelected
              ? "0 0 15px 5px white" 
              : "0 4px 6px rgba(0,0,0,0.3)",
          }}
        >
          0
        </div>
      </div>
    </div>
  );
};

export default Buzzer;
