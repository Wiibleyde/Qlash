import React from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';

const LobbyHost = () => {
  const players = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
        <div className="flex-1 bg-white text-black rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Questions</h2>
          </div>
          <Button className='w-20'>➕ Ajouter une question</Button>
        </div>

        <div className="w-80 flex flex-col justify-between bg-white text-black rounded-3xl p-6 shadow-2xl">
          <div>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold text-purple-600 mb-2">Code de session</h3>
              <div className="bg-yellow-300 text-purple-800 text-3xl font-extrabold px-6 py-4 rounded-2xl shadow-md tracking-widest">
                845923
              </div>
            </div>

            <h3 className="text-xl font-bold text-purple-600 mb-3">Joueurs</h3>
            <ul className="space-y-2">
              {players.map((player, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 font-semibold text-center py-2 rounded-xl shadow"
                >
                  {player}
                </li>
              ))}
            </ul>
          </div>

          <Button>🚀 Démarrer la partie</Button>
        </div>
      </div>
    </div>
  );
};

export default LobbyHost;
