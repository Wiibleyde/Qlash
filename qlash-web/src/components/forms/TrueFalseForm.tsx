import React from 'react';

const TrueOrFalseForm = () => {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Énoncé de la question"
        className="w-full px-4 py-2 border rounded-lg"
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="answer" value="true" />
          Vrai
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="answer" value="false" />
          Faux
        </label>
      </div>
    </div>
  );
};

export default TrueOrFalseForm;
