"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import PresetSelector from '@/components/PresetSelector';
import { socket } from '@/utils/socket';
import { SimplePlayer } from '../../../../qlash-shared/types/user';

const Lobby = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get('game');

  const [players, setPlayers] = useState<SimplePlayer[]>([]);
  const [code, setCode] = useState<string | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);

  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [selectingPreset, setSelectingPreset] = useState(false);

  const [quizPresets, setQuizPresets] = useState<{ id: string; name: string }[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  const handleCopyLink = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Code de la session copié dans le presse-papiers !");
    }).catch(() => {
      toast.error("Erreur lors de la copie du code de la session.");
    });
  };

  const handleStartGame = () => {
    socket.emit("startgame", { gameUuid: game, selectedQuiz: quizPresets[0] });
  }

  useEffect(() => {
    socket.on("synclobby", (data) => {
      if (!data) return;
      const { success, players: playersInLobby, gameCode } = data;
      if (success) {
        setIsHost(playersInLobby.some((player: SimplePlayer) => player.socketId === socket.id && player.isHost));
        setPlayers(playersInLobby);
        setCode(gameCode);
      } else {
        toast.error("Erreur lors de la synchronisation des joueurs dans la salle.");
      }
    });

    socket.on("startgame", (data) => {
      const { success, message, gameId } = data;
      if (success) {
        toast.success(message);
        router.push(`/game?game=${gameId}`);
      } else {
        toast.error(message);
      }
    });

    socket.emit("synclobby", { gameUuid: game });

    return () => {
      socket.off("synclobby");
    };
  }, [game]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/quizzes/latest`);
        const data = await res.json();
        setQuizPresets(data.map((quiz: any) => ({
          id: quiz.id,
          name: quiz.name,
        })));
      } catch (error) {
        console.error('Erreur lors du fetch des quizzes:', error);
      } finally {
        setLoadingQuizzes(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleAddPreset = (preset: string) => {
    if (!selectedPresets.includes(preset)) {
      setSelectedPresets(prev => [...prev, preset]);
    }
    setSelectingPreset(false);
  };

  const handleRemovePreset = (preset: string) => {
    setSelectedPresets(prev => prev.filter(p => p !== preset));
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Navbar />

      {isHost ? (
        <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
          {/* Left Panel: Quiz Selection */}
          <div className="flex-1 bg-white text-black rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            {!selectingPreset ? (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Quiz sélectionnés</h2>
                  {selectedPresets.length === 0 ? (
                    <p className="text-gray-400 italic">Aucun quiz sélectionné</p>
                  ) : (
                    <ul className="space-y-2 mb-6">
                      {selectedPresets.map((preset, idx) => (
                        <li
                          key={idx}
                          className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow flex justify-between items-center"
                        >
                          <span>{preset}</span>
                          <button onClick={() => handleRemovePreset(preset)} className="text-red-500 text-sm font-bold">
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex justify-end">
                  <div className="w-1/3">
                    <Button onClick={() => setSelectingPreset(true)}>➕ Choisir un quiz</Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Choisissez un quiz</h2>
                  {loadingQuizzes ? (
                    <p className="text-gray-400 italic">Chargement des quizz...</p>
                  ) : (
                    <PresetSelector
                      presets={quizPresets.map(q => q.name)}
                      onSelect={handleAddPreset}
                    />
                  )}
                </div>
                <div className="flex justify-end">
                  <div className="w-1/3">
                    <Button onClick={() => setSelectingPreset(false)}>❌ Annuler</Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-80 flex flex-col justify-between bg-white text-black rounded-3xl p-6 shadow-2xl">
            <div>
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-purple-600 mb-2">Code de session</h3>
                <div className="bg-yellow-300 text-purple-800 text-3xl font-extrabold px-6 py-4 rounded-2xl shadow-md tracking-widest cursor-pointer select-all" onClick={handleCopyLink}>
                  {code}
                </div>
              </div>

              <h3 className="text-xl font-bold text-purple-600 mb-3">Joueurs</h3>
              <div className="max-h-48 overflow-y-auto pr-2">
                <ul className="space-y-2">
                  {players.map((player) => (
                    <li
                      key={player.socketId}
                      className="bg-blue-100 text-blue-800 font-semibold text-center py-2 rounded-xl shadow"
                    >
                      {player.username}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button onClick={handleStartGame}>
              🚀 Démarrer la partie
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
          <div className="w-full flex justify-between bg-white text-black rounded-3xl p-6 shadow-2xl">
            <div className="w-full flex flex-col justify-between px-6 h-full">
              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-purple-600 mb-2">Code de session</h3>
                <div
                  className="bg-yellow-300 text-purple-800 text-3xl font-extrabold px-6 py-4 rounded-2xl shadow-md tracking-widest cursor-pointer select-all"
                  onClick={handleCopyLink}
                  title="Cliquez pour copier le lien de la session"
                >
                  {code}
                </div>
              </div>
            </div>

            {/* Liste des Joueurs */}
            <div className="w-full flex flex-col px-6">
              <h3 className="text-xl font-bold text-purple-600 mb-3">Joueurs</h3>
              <ul className="space-y-2">
                {players.map((player) => (
                  <li
                    key={player.socketId}
                    className="bg-blue-100 text-blue-800 font-semibold text-center py-2 rounded-xl shadow"
                  >
                    {player.username}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
