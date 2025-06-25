"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import PresetSelector from '@/components/PresetSelector';

const quizPresets = [
  '🇫🇷 Culture française',
  '🧪 Science',
  '🧠 Logique',
  '🎨 Art & Littérature',
  '🌍 Géographie',
  '📺 Pop Culture',
];

const LobbyHost = () => {
  const [players] = useState(['Alice', 'Bob', 'Charlie']);
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [selectingPreset, setSelectingPreset] = useState(false);

  const handleAddPreset = (preset: string) => {
    if (!selectedPresets.includes(preset)) {
      setSelectedPresets([...selectedPresets, preset]);
    }
    setSelectingPreset(false);
  };

  const handleRemovePreset = (preset: string) => {
    setSelectedPresets(selectedPresets.filter(p => p !== preset));
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
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
                <PresetSelector presets={quizPresets} onSelect={handleAddPreset} />
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
              <div className="bg-yellow-300 text-purple-800 text-3xl font-extrabold px-6 py-4 rounded-2xl shadow-md tracking-widest">
                845923
              </div>
            </div>

            <h3 className="text-xl font-bold text-purple-600 mb-3">Joueurs</h3>
            <div className="max-h-48 overflow-y-auto pr-2">
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
          </div>

          <Button>🚀 Démarrer la partie</Button>
        </div>
      </div>
    </div>
  );
};

export default LobbyHost;
