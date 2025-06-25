import React from 'react';

const DropPinForm = () => {
  return (
    <div className="space-y-3">
      <input type="text" placeholder="Énoncé de la question" className="w-full px-4 py-2 border rounded-lg" />
      <label className="block">
        <span className="sr-only">Image</span>
        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border rounded-lg"
          title="Ajouter une image"
        />
      </label>
      <input type="text" placeholder="Coordonnées ou description de l'emplacement" className="w-full px-4 py-2 border rounded-lg" />
    </div>
  );
};

export default DropPinForm;