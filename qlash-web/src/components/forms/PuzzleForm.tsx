import React from 'react';

const PuzzleForm = () => {
  return (
    <div className="space-y-3">
      <input type="text" placeholder="Ordre correct (ex: étape 1, étape 2...)" className="w-full px-4 py-2 border rounded-lg" />
      {[...Array(4)].map((_, idx) => (
        <input key={idx} type="text" placeholder={`Élément ${idx + 1}`} className="w-full px-4 py-2 border rounded-lg" />
      ))}
    </div>
  );
};

export default PuzzleForm;