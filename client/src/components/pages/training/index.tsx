import React, { useState } from 'react';
import { PageKey, PAGES } from './../../../App';

export const group: 'groupA' | 'groupB' = 'groupA';

const trainingQuestions = {
  groupA: [
    { id: 1, string: '\\nHello\\tWorld' },
    { id: 2, string: 'Name:\\tJohn\\nAge:\\t25' },
    { id: 3, string: '\\\\Server\\Path\\to\\file.txt' },
    { id: 4, string: 'She said: \\"Hi!\\"' },
    { id: 5, string: "It\\'s a test" },
  ],
  groupB: [
    { id: 1, string: '[NEWLINE] Hello [TAB] World' },
    { id: 2, string: 'Name:[TAB]Jane[NEWLINE]Age:[TAB]30' },
    { id: 3, string: 'Path://some/complex\\[path]' },
    { id: 4, string: 'Alert: *DANGER*' },
    { id: 5, string: 'File: <<config>>' },
  ],
} as const;

interface TrainingPageProps {
  setPage: (page: PageKey) => void;
}

const TrainingPage: React.FC<TrainingPageProps> = ({ setPage }) => {
  const questions = trainingQuestions[group];
  const totalQuestions = questions.length;

  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState<string[]>(Array(totalQuestions).fill(''));
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const currentQuestion = questions[current];

  const handleNext = () => {
    if (input.trim() === '') {
      setAttemptedSubmit(true);
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[current] = input;
    setAnswers(updatedAnswers);

    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
      setInput(updatedAnswers[current + 1] || '');
      setAttemptedSubmit(false);
    } else {
      setPage(PAGES.experiment);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setInput(answers[prevIndex] || '');
      setAttemptedSubmit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {/* Back Arrow to Survey */}
      <div className="w-full flex justify-start mb-4">
        <button
          className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 hover:text-white transition-colors border border-white/20 shadow-sm"
          onClick={() => setPage(PAGES.survey)}
        >
          ←
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Training
      </h1>

      {/* Question Counter */}
      <p className="text-white mb-6">
        Question {current + 1}/{totalQuestions}
      </p>

      {/* Question String */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left">
        <code>{currentQuestion.string}</code>
      </div>

      {/* Input Field */}
      <textarea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.currentTarget;
            const newValue =
              input.substring(0, selectionStart) + '\t' + input.substring(selectionEnd);
            setInput(newValue);
            setTimeout(() => {
              const el = e.currentTarget;
              el.selectionStart = el.selectionEnd = selectionStart + 1;
            }, 0);
          }
        }}
        className="w-full max-w-xl px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your translation here..."
      />

      {/* 🔴 Error message if input is empty and attempted */}
      {attemptedSubmit && input.trim() === '' && (
        <p className="text-red-500 mt-2 text-sm">
          Please enter a response before continuing.
        </p>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {current > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
          >
            Back
          </button>
        )}
        <button
        onClick={handleNext}
        className={`py-2 px-6 font-semibold rounded shadow-md transition-all ${
            input.trim()
            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-700 text-gray-400 cursor-default'
        }`}
        >
        Next
        </button>
      </div>
    </div>
  );
};

export default TrainingPage;
