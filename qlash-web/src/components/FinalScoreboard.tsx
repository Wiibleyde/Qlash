"use client";
import React, { useEffect, useState } from "react";

interface FinalScoreboardProps {
  game: string;
}

interface Player {
  username: string;
  score: number;
}

const FinalScoreboard = ({
  game
}: FinalScoreboardProps) => {

  const [scoreboardPlayers, setScoreboardPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/game/${game}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setScoreboardPlayers(data.leaderboard.players);
    };

    fetchData();
  }, [game]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8">Final Scoreboard</h1>
      <button
        className="mb-8 px-6 py-2 bg-white text-purple-700 font-bold rounded-lg shadow hover:bg-gray-100 transition-colors"
        onClick={() => window.location.href = '/'}
      >
        Retour à l'accueil
      </button>

      {/* Podium dynamique */}
      <div className="flex justify-center items-end w-full max-w-4xl mb-10">
        {scoreboardPlayers.length >= 2 && (
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold mb-2">{scoreboardPlayers[1]?.username}</p>
            <div
              className="bg-[#c3b6fe] text-black text-center w-24 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
              style={{
                clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
            <div className="bg-[#876dff] text-center w-24 h-32 flex items-center justify-center font-bold text-4xl shadow-lg">
              2
            </div>
            <div className="bg-white rounded-xl px-2 mt-5">
              <span className="font-bold text-[#876dff]">{scoreboardPlayers[1]?.score} Pt</span>
            </div>
          </div>
        )}

        {scoreboardPlayers.length >= 1 && (
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold mb-2">{scoreboardPlayers[0]?.username}</p>
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
              <span className="font-bold text-[#876dff]">{scoreboardPlayers[0]?.score} Pt</span>
            </div>
          </div>
        )}

        {scoreboardPlayers.length >= 3 && (
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold mb-2">{scoreboardPlayers[2]?.username}</p>
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
              <span className="font-bold text-[#876dff]">{scoreboardPlayers[2]?.score} Pt</span>
            </div>
          </div>
        )}
      </div>

      {/* Liste dynamique de tous les joueurs avec leur place */}
      <div className="w-full max-w-4xl">
        {scoreboardPlayers.slice(3).map((player, idx) => (
          <div
            key={player.username}
            className="flex justify-between items-center py-3 border-b last:border-none bg-white px-4 shadow-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-purple-600">
                {idx + 1}
              </div>
              <span className="font-semibold text-black">{player.username}</span>
            </div>
            <div className="font-bold text-black">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalScoreboard;
