"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import QuestionSelector from '@/components/QuestionSelector';
import QuestionFormWrapper from '@/components/QuestionFormWrapper';

const allQuestionTypes = [
  'Quiz',
  'Checkbox',
  'True or False',
  'Puzzle',
  'Type Answer',
  'Quiz + Audio',
  'Slider',
  'Say the Word',
  'Poll',
  'Drop Pin',
];

const LobbyCreate = () => {
  const [players] = useState(['Alice', 'Bob', 'Charlie']);
  const [addedQuestions, setAddedQuestions] = useState<any[]>([]);
  const [step, setStep] = useState<'list' | 'choose' | 'form'>('list');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const availableTypes = allQuestionTypes;

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setStep('form');
  };

  const handleConfirmAdd = (formData: any) => {
    setAddedQuestions([...addedQuestions, formData]);
    setStep('list');
    setSelectedType(null);
    console.log('Question ajoutée:', addedQuestions);
  };

  const handleCancel = () => {
    setStep('list');
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 p-6 md:p-10 gap-8 mt-20">
        <div className="flex-1 bg-white text-black rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative">
          {step === 'list' && (
            <>
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Questions</h2>
                {addedQuestions.length === 0 ? (
                  <p className="text-gray-400 italic">Aucune question ajoutée</p>
                ) : (
                  <ul className="space-y-2 mb-6">
                    {addedQuestions.map((q, idx) => (
                      <li key={idx} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl shadow space-y-1">
                        <div><strong>Type:</strong> {q.type}</div>
                        <div><strong>Question:</strong> {q.question}</div>
                        {q.options && (
                          <ul className="pl-4 list-disc">
                            {q.options.map((opt, i) => (
                              <li key={i} className={opt === q.correctAnswer ? 'font-bold underline' : ''}>
                                {opt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end">
                <div className="w-1/3">
                  <Button onClick={() => setStep('choose')}>➕ Ajouter une question</Button>
                </div>
              </div>
            </>
          )}

          {step === 'choose' && (
            <>
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Choisissez un type de question</h2>
                <QuestionSelector types={availableTypes} onSelect={handleSelectType} />
              </div>

              <div className="flex justify-end">
                <div className="w-1/3">
                  <Button onClick={handleCancel}>❌ Annuler</Button>
                </div>
              </div>
            </>
          )}

          {step === 'form' && selectedType && (
            <>
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-700">Créer une question : {selectedType}</h2>
                <QuestionFormWrapper
                  type={selectedType}
                  onBack={() => setStep('choose')}
                  onConfirm={handleConfirmAdd}
                />
              </div>

              <div className="flex justify-end">
                <div className="w-1/3">
                  <Button onClick={handleCancel}>❌ Annuler</Button>
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

export default LobbyCreate;
