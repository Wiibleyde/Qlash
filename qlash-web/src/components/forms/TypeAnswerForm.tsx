import React from 'react';

const TypeAnswerForm = () => {
  return (
    <div className="space-y-3">
      <input type="text" placeholder="Énoncé de la question" className="w-full px-4 py-2 border rounded-lg" />
      <input type="text" placeholder="Bonne réponse attendue" className="w-full px-4 py-2 border rounded-lg" />
    </div>
  );
};

export default TypeAnswerForm;