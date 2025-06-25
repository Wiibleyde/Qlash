import React from 'react';

const SliderForm = () => {
  return (
    <div className="space-y-3">
      <input type="text" placeholder="Énoncé de la question" className="w-full px-4 py-2 border rounded-lg" />
      <input type="number" placeholder="Valeur minimale" className="w-full px-4 py-2 border rounded-lg" />
      <input type="number" placeholder="Valeur maximale" className="w-full px-4 py-2 border rounded-lg" />
      <input type="number" placeholder="Bonne réponse" className="w-full px-4 py-2 border rounded-lg" />
    </div>
  );
};

export default SliderForm;