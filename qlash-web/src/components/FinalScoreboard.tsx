"use client";
import React from "react";

type Player = {
  name: string;
  score: number;
};

const players: Player[] = [
  { name: "Pedro", score: 3645 },
  { name: "Andrew", score: 3496 },
  { name: "Freida", score: 3178 },
  { name: "Clinton", score: 2846 },
  { name: "Theresa", score: 2472 },
  { name: "Jamel", score: 2186 },
  { name: "Leif", score: 1956 },
];

const FinalScoreboard = () => {
  const podium = players.slice(0, 3);
  const others = players.slice(3);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Final Scoreboard</h1>

      <div className="flex justify-center items-end  w-full max-w-4xl mb-10">
        <div className="flex flex-col items-center">
            <p className="text-lg font-bold mb-2">
                {podium[1].name}
            </p>
          <div
            className="bg-[#c3b6fe] text-black text-center w-24 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
            style={{
                clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
          </div>
          <div className="bg-[#876dff] text-center w-24 h-32 flex items-center justify-center font-bold text-4xl shadow-lg">
            2
          </div>
          <div className="bg-white rounded-xl px-2 mt-5">
            <span className="font-bold text-[#876dff]">{podium[1].score} Pt</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
            <p className="text-lg font-bold mb-2">
                {podium[0].name}
            </p>
          <div
            className="bg-[#c3b6fe] text-black text-center w-28 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
            style={{
                clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
            <div className="bg-gradient-to-t from-[#a490ff] to-[#876dff] text-center w-28 h-40 flex items-center justify-center font-bold text-5xl shadow-xl">
                1
            </div>
          <div className="bg-white rounded-xl px-2 mt-4">
            <span className="font-bold text-[#876dff]">{podium[0].score} Pt</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
            <p className="text-lg font-bold mb-2">
                {podium[2].name}
            </p>
          <div
            className="bg-[#c3b6fe] text-black text-center w-24 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
            style={{
                clipPath: "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div className="bg-[#876dff] text-center w-24 h-28 flex items-center justify-center font-bold text-3xl shadow-lg">
            3
          </div>
          <div className="bg-white rounded-xl px-2 mt-6">
            <span className="font-bold text-[#876dff]">{podium[2].score} Pt</span>
          </div>
        </div>
      </div>

        {others.map((player, idx) => (
          <div
            key={player.name}
            className="flex justify-between items-center py-3 border-b last:border-none bg-white w-full max-w-4xl px-4 shadow-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-purple-600">
                {idx + 4}
              </div>
              <span className="font-semibold text-black">{player.name}</span>
            </div>
            <div className="font-bold text-black">{player.score}</div>
          </div>
        ))}
    </div>
  );
};

export default FinalScoreboard;
