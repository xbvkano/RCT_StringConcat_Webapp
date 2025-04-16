import React, { useRef, useState } from 'react';
import { PageKey, PAGES } from './../../../App';

export const group: 'groupA' | 'groupB' = 'groupA';

const experimentQuestions = {
  groupA: [
    { id: 1, string: '\\nWelcome\\tBack' },
    { id: 2, string: 'Your\\nTotal:\\t$99.99' },
  ],
  groupB: [
    { id: 1, string: '[NEWLINE] Start [TAB] Here' },
    { id: 2, string: 'Answer:[TAB]Yes[NEWLINE]Status:[TAB]Confirmed' },
  ],
} as const;

interface ExperimentPageProps {
  setPage: (page: PageKey) => void;
  experimentDataRef: React.MutableRefObject<string[]>;
}

const ExperimentPage: React.FC<ExperimentPageProps> = ({ setPage, experimentDataRef }) => {
  const questions = experimentQuestions[group];
  const totalQuestions = questions.length;

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const currentQuestion = questions[current];

  const handleNext = () => {
    if (input.trim() === '') {
      setAttemptedSubmit(true);
      return;
    }

    experimentDataRef.current[current] = input;

    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
      setInput(experimentDataRef.current[current + 1] || '');
      setAttemptedSubmit(false);
    } else {
      console.log('Experiment responses:', experimentDataRef.current);
      setPage(PAGES.thankyou);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setInput(experimentDataRef.current[prevIndex] || '');
      setAttemptedSubmit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {/* Always show back arrow to Training */}
      <div className="w-full flex justify-start mb-4">
        <button
          className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 hover:text-white transition-colors border border-white/20 shadow-sm"
          onClick={() => setPage(PAGES.training)}
        >
          ←
        </button>
      </div>

      {!started ? (
        <>
          <h1 className="text-4xl font-extrabold text-white text-center mb-4">
            Great job finishing training! 🎉
          </h1>
          <p className="text-white text-center max-w-xl mb-6">
            You're about to begin the real experiment.
            Your <strong>responses will now be recorded</strong> and both your
            <strong> accuracy and time</strong> will be used to analyze results.
            Take a deep breath and do your best!
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
          >
            Start Experiment
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold text-white text-center mb-4">Experiment</h1>
          <p className="text-white mb-6">
            Question {current + 1}/{totalQuestions}
          </p>

          <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left">
            <code>{currentQuestion.string}</code>
          </div>

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

          {attemptedSubmit && input.trim() === '' && (
            <p className="text-red-500 mt-2 text-sm">
              Please enter a response before continuing.
            </p>
          )}

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
                  : 'bg-gray-700 text-white cursor-default'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExperimentPage;
