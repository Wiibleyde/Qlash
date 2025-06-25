import React from 'react';

type Props = {
  types: string[];
  onSelect: (type: string) => void;
};

const QuestionSelector: React.FC<Props> = ({ types, onSelect }) => (
  <>
    <h3 className="text-xl font-bold mb-4 text-purple-600">Choisir un type</h3>
    <div className="grid grid-cols-2 gap-4">
      {types.map((type) => (
        <button
          key={type}
          className="bg-gray-100 hover:bg-purple-100 text-black px-4 py-3 rounded-xl text-sm font-semibold shadow"
          onClick={() => onSelect(type)}
        >
          {type}
        </button>
      ))}
    </div>
  </>
);

export default QuestionSelector;
