import React from 'react';

const QuizAudioForm = () => {
  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="audio/*"
        className="w-full px-4 py-2 border rounded-lg"
        title="Upload audio file"
        aria-label="Upload audio file"
      />
      {[...Array(4)].map((_, idx) => (
        <input key={idx} type="text" placeholder={`Option ${idx + 1}`} className="w-full px-4 py-2 border rounded-lg" />
      ))}
    </div>
  );
};

export default QuizAudioForm;