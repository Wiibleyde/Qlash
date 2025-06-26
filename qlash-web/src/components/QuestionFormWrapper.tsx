import QuizForm from "./forms/QuizForm";
import React from 'react';
import TrueOrFalseForm from "./forms/TrueFalseForm";
import PuzzleForm from "./forms/PuzzleForm";

const QuestionFormWrapper: React.FC<Props> = ({ type, onBack, onConfirm }) => {
  const handleFormSubmit = (formData: any) => {
    onConfirm(formData);
  };

  const renderForm = () => {
    switch (type) {
      case 'Question à choix multiple':
        return <QuizForm onSubmit={handleFormSubmit} />;
      case 'Vrai/Faux':
        return <TrueOrFalseForm onSubmit={handleFormSubmit} />;
      case 'Puzzle':
        return <PuzzleForm onSubmit={handleFormSubmit} />;
      default:
        return <p className="text-red-500">Type de question inconnu: {type}</p>;
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-purple-600">Ajouter: {type}</h3>
      {renderForm()}
      <div className="mt-4 flex justify-between">
        <button onClick={onBack} className="text-sm text-gray-500 underline">
          ⬅ Retour
        </button>
      </div>
    </div>
  );
};

export default QuestionFormWrapper;