import { useState, useRef } from 'react';
import { PageKey, PAGES } from './../../../App';

// simple Levenshtein-distance implementation
function levenshteinDistance(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, i) =>
    Array(a.length + 1).fill(0)
  );
  for (let i = 0; i <= b.length; i++) dp[i][0] = i;
  for (let j = 0; j <= a.length; j++) dp[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      dp[i][j] =
        b[i - 1] === a[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[b.length][a.length];
}

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
  setSurveyMetrics: (metrics: {
    accuracy: number;
    test_accuracy: number[];
    time: Date;
  }) => void;
}

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
  experimentDataRef,
  setSurveyMetrics,
}) => {
  const questions = experimentQuestions[group];
  const totalQuestions = questions.length;

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const startTimeRef = useRef<number | null>(null);

  const currentQuestion = questions[current];

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setStarted(true);
  };

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
      const endTime = Date.now();
      const timeTakenMs = startTimeRef.current
        ? endTime - startTimeRef.current
        : 0;
      const time = new Date(endTime);

      const accuracies = questions.map((q, idx) => {
        const expected = q.string;
        let actual = experimentDataRef.current[idx] || '';

        actual = actual
          .replace(/\r\n/g, '\n')
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t');

        if (expected === actual) {
          return 100.0;
        }

        const dist = levenshteinDistance(expected, actual);
        const maxLen = Math.max(expected.length, actual.length);
        return maxLen > 0 ? (1 - dist / maxLen) * 100 : 100.0;
      });

      const overallAccuracy =
        accuracies.reduce((sum, val) => sum + val, 0) / totalQuestions;

      setSurveyMetrics({
        accuracy: overallAccuracy,
        test_accuracy: accuracies,
        time,
      });

      console.log('⏱ Time taken (ms):', timeTakenMs);
      console.log('✅ Accuracy per question (%):', accuracies);
      console.log('🎯 Overall accuracy (%):', overallAccuracy.toFixed(1));

      setPage(PAGES.thankyou);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      const prev = current - 1;
      setCurrent(prev);
      setInput(experimentDataRef.current[prev] || '');
      setAttemptedSubmit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      <div className="w-full flex justify-start mb-4">
        <button
          className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 transition-colors border border-white/20 shadow-sm"
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
            You’re about to begin the real experiment. Your{' '}
            <strong>responses will now be recorded</strong> and both your{' '}
            <strong>accuracy and time</strong> will be used to analyze results.
            Take a deep breath and do your best!
          </p>
          <button
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
          >
            Start Experiment
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold text-white text-center mb-4">
            Experiment
          </h1>
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
                const newVal =
                  input.substring(0, selectionStart) +
                  '\t' +
                  input.substring(selectionEnd);
                setInput(newVal);
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