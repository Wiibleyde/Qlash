"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { socket } from '@/utils/socket';

interface SimplePlayer {
  username: string;
}

const Lobby = () => {
  const searchParams = useSearchParams();
  const game = searchParams.get('game');
  const code = searchParams.get('code');

  const [players, setPlayers] = useState<SimplePlayer[]>([]);

  const handleCopyLink = () => {
    console.log('Copier le lien de la session:', code);
  };

  useEffect(() => {
    socket.on("synclobby", (data) => {
      if (!data) return;
      console.log("Synchronisation des joueurs dans la salle:", data);
      const { success, players: playersInLobby } = data;
      if (success) {
        setPlayers(playersInLobby);
      } else {
        toast.error("Erreur lors de la synchronisation des joueurs dans la salle.");
      }
    })
    socket.emit("synclobby", { gameUuid: game });
    return () => {
      socket.off("synclobby");
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
        <div className="w-full flex justify-between bg-white text-black rounded-3xl p-6 shadow-2xl">
          <div className='w-full flex flex-col justify-between px-6 h-full'>
            <div className="mb-6 text-center h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">Code de session</h3>
                <div
                  className="bg-yellow-300 text-purple-800 text-3xl font-extrabold px-6 py-4 rounded-2xl shadow-md tracking-widest mb-4 cursor-pointer select-all"
                  onClick={handleCopyLink}
                  title="Cliquez pour copier le lien de la session"
                >
                  {code}
                </div>
              </div>
              <Button>🚀 Démarrer la partie</Button>
            </div>
          </div>
          <div className='w-full flex flex-col px-6'>
            <h3 className="text-xl font-bold text-purple-600 mb-3">Joueurs</h3>
            <ul className="space-y-2">
              {players.map((player, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 font-semibold text-center py-2 rounded-xl shadow"
                >
                  {player.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
