import React from 'react';

const CheckboxForm = () => {
  return (
    <div className="space-y-3">
      <input type="text" placeholder="Énoncé de la question" className="w-full px-4 py-2 border rounded-lg" />
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input type="checkbox" title={`Sélectionner l'option ${idx + 1}`} />
          <input type="text" placeholder={`Option ${idx + 1}`} className="w-full px-4 py-2 border rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default CheckboxForm;