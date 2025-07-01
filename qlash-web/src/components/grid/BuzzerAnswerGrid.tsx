import React from "react";

interface Player {
  username: string;
  score: number;
  socketId?: string;
}

interface BuzzerProps {
  players: Player[];
  playersBuzzed: string;
  socketId: string;
  yourScore: number;
  onBuzz: () => void;
  isBuzzed: boolean;
  buzzerAnswer: string;
  onAnswerChange: (val: string) => void;
  onSubmitAnswer: () => void;
}

const BuzzerAnswerGrid: React.FC<BuzzerProps> = ({
  players,
  playersBuzzed,
  socketId,
  yourScore,
  onBuzz,
  isBuzzed,
  buzzerAnswer,
  onAnswerChange,
  onSubmitAnswer,
}) => {
  const currentPlayer = players.find((p) => p.socketId === socketId);
  const isCurrentPlayerBuzzed =
    playersBuzzed !== "" && currentPlayer?.username === playersBuzzed;
  const someoneElseBuzzed =
    playersBuzzed !== "" && !isCurrentPlayerBuzzed;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-10 px-4 relative">
      <div className="w-full max-w-5xl flex justify-between mb-16 px-8">
        {players.map((player, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-white ${index === 0 || index === 3 ? "mt-6" : ""}`}
          >
            <p className="text-lg font-bold mb-1">{player.username}</p>
            <div
              className="bg-[#c3b6fe] text-black text-center w-24 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
              style={{
                clipPath:
                  index < 2
                    ? "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)"
                    : "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
            <div 
              className="bg-[#876dff] text-center w-24 h-40 flex items-center justify-center font-bold text-4xl shadow-lg"
              style={{
              boxShadow:
                playersBuzzed === player.username
                ? "0 4px 16px 4px white"
                : "",
              }}
            >
              {player.score}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center pb-6">
        <p className="text-lg font-bold mb-1">Toi</p>

        {isBuzzed ? (
          <div className="flex flex-col items-center space-y-2 mt-2 w-100">
            {someoneElseBuzzed && (
              <p className="text-red-300 text-sm font-semibold">
                En attente de la réponse de {playersBuzzed}...
              </p>
            )}
            <input
              type="text"
              value={buzzerAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="w-full px-4 py-2 rounded text-white font-bold text-lg bg-indigo-800 placeholder-white"
              placeholder="Votre réponse..."
              disabled={someoneElseBuzzed}
            />
            <button
              onClick={onSubmitAnswer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold disabled:opacity-50"
              disabled={someoneElseBuzzed}
            >
              Valider
            </button>
          </div>
        ) : (
          <div>
            {someoneElseBuzzed && (
              <p className="text-red-300 text-sm font-semibold mb-2 text-center">
                {playersBuzzed} a buzzé !
              </p>
            )}
            <div
              className="bg-[#c3b6fe] text-black text-center w-30 h-8 flex items-center justify-center font-bold text-lg shadow-lg"
              style={{
                clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
            <div
              onClick={!someoneElseBuzzed ? onBuzz : undefined}
              className={`bg-gradient-to-t from-[#a490ff] to-[#876dff] text-center w-30 h-50 flex items-center justify-center font-bold text-5xl shadow-xl ${
                someoneElseBuzzed ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {yourScore}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuzzerAnswerGrid;
