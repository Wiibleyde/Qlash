import React, { useState } from 'react';

type Props = {
  onSubmit: (data: {
    type: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }) => void;
};

const QuizForm: React.FC<Props> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleChangeOption = (value: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    onSubmit({
      type: 'Question à choix multiple',
      question,
      options,
      correctAnswer: options[correctAnswerIndex],
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
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="radio"
            checked={correctAnswerIndex === idx}
            onChange={() => setCorrectAnswerIndex(idx)}
            title={`Sélectionner comme bonne réponse pour l'option ${idx + 1}`}
          />
          <input
            type="text"
            value={opt}
            placeholder={`Option ${idx + 1}`}
            onChange={(e) => handleChangeOption(e.target.value, idx)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
      >
        ✅ Ajouter
      </button>
    </div>
  );
};

export default QuizForm;
