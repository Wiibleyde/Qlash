import React, { useState } from 'react';

type Props = {
  onSubmit: (data: {
    type: string;
    question: string;
    correctAnswer: string;
  }) => void;
};

const BuzzerForm: React.FC<Props> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSubmit = () => {
    if (!question.trim()) return;
    if (!correctAnswer.trim()) return;
    onSubmit({
      type: 'Buzzer',
      question,
      correctAnswer,
    });
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Énoncé de la question Buzzer"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Réponse correcte"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-xl font-bold"
      >
        🚨 Ajouter la question Buzzer
      </button>
    </div>
  );
};

export default BuzzerForm;