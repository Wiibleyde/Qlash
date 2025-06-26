import React, { useState } from 'react';

type Props = {
  onSubmit: (data: {
    type: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }) => void;
};

const TrueOrFalseForm: React.FC<Props> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'true' | 'false'>('true');

  const handleSubmit = () => {
    onSubmit({
      type: 'Vrai/Faux',
      question,
      options: ['true', 'false'],
      correctAnswer,
    });
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Énoncé de la question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="answer"
            value="true"
            checked={correctAnswer === 'true'}
            onChange={() => setCorrectAnswer('true')}
          />
          Vrai
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="answer"
            value="false"
            checked={correctAnswer === 'false'}
            onChange={() => setCorrectAnswer('false')}
          />
          Faux
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
      >
        ✅ Ajouter
      </button>
    </div>
  );
};

export default TrueOrFalseForm;
