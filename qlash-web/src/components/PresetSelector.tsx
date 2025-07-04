import React from 'react';

type Props = {
  presets: {id: string; name: string}[];
  onSelect: (presetId: string) => void;
};

const PresetSelector: React.FC<Props> = ({ presets, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {presets.map((preset, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(preset.id)}
          className="bg-purple-100 text-purple-800 font-semibold p-3 rounded-xl shadow hover:bg-purple-200 transition"
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
};

export default PresetSelector;
