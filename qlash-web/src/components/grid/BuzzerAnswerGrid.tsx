import { useState } from "react";

interface Player {
  name: string;
  score: number;
}

interface BuzzerProps {
  players: Player[];
  yourScore: number;
  onBuzz: () => void;
  isBuzzed: boolean;
  buzzerAnswer: string;
  onAnswerChange: (val: string) => void;
  onSubmitAnswer: () => void;
}

const BuzzerAnswerGrid: React.FC<BuzzerProps> = ({
  players,
  yourScore,
  onBuzz,
  isBuzzed,
  buzzerAnswer,
  onAnswerChange,
  onSubmitAnswer,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!isBuzzed) {
      setIsSelected(true);
      onBuzz();
    }
  };

  const displayedPlayers = players.length >= 5 ? players : [
    ...players,
    ...Array(5 - players.length).fill({ name: "Player", score: 0 }),
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-10 px-4 relative">
      <div className="w-full max-w-5xl flex justify-between mb-16 px-8">
        {displayedPlayers.map((player, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-white ${
              index === 0 || index === 3 ? "mt-6" : ""
            }`}
          >
            <p className="text-lg font-bold mb-1 truncate max-w-[96px] text-center">
              {player.name}
            </p>
            <div
              className="bg-[#c3b6fe] text-black text-center w-24 h-4 flex items-center justify-center font-bold text-lg shadow-lg"
              style={{
                clipPath:
                  index < 2
                    ? "polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%)"
                    : "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
            <div className="bg-[#876dff] text-center w-24 h-32 flex items-center justify-center font-bold text-4xl shadow-lg mt-2">
              {player.score}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center pb-6">
        <p className="text-lg font-bold mb-1">You</p>
        <div
          className="bg-[#c3b6fe] text-black text-center w-46 h-8 flex items-center justify-center font-bold text-lg shadow-lg"
          style={{
            clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
          }}
        ></div>

        {!isBuzzed ? (
          <div
            onClick={handleClick}
            className="bg-gradient-to-t from-[#a490ff] to-[#876dff] text-center w-46 h-50 flex items-center justify-center font-bold text-5xl shadow-xl cursor-pointer mt-2"
            style={{
              boxShadow: isSelected
                ? "0 0 15px 5px white"
                : "0 4px 6px rgba(0,0,0,0.3)",
            }}
          >
            {yourScore}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 w-46 mt-2">
            <input
              type="text"
              value={buzzerAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="w-full px-4 py-2 rounded text-black font-bold text-lg"
              placeholder="Votre réponse..."
            />
            <button
              onClick={onSubmitAnswer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
            >
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuzzerAnswerGrid;
