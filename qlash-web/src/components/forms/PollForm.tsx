import React from 'react';

const PollForm = () => {
  return (
    <div className="space-y-3">
      <input type="text" placeholder="Question du sondage" className="w-full px-4 py-2 border rounded-lg" />
      {[...Array(4)].map((_, idx) => (
        <input key={idx} type="text" placeholder={`Option ${idx + 1}`} className="w-full px-4 py-2 border rounded-lg" />
      ))}
    </div>
  );
};

export default PollForm;