// Question screen
export interface QuestionProps {
    question: string;
    current: number;
    total: number;
    input: string;
    onBack: () => void;
    onNext: () => void;
    onChange: (val: string) => void;
    attemptedSubmit: boolean;
}

export const QuestionScreen: React.FC<QuestionProps> = ({
    question,
    current,
    total,
    input,
    onBack,
    onNext,
    onChange,
    attemptedSubmit,
    }) => (
    <>
        <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Experiment
        </h1>
        <p className="text-white mb-6">
        Question {current + 1}/{total}
        </p>
        <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left">
        <code>{question}</code>
        </div>
        <textarea
        rows={4}
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.currentTarget;
            const newVal =
                value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
            onChange(newVal);
            setTimeout(() => {
                const el = e.currentTarget;
                el.selectionStart = el.selectionEnd = selectionStart + 1;
            }, 0);
            }
        }}
        className="w-full max-w-xl bg-gray-800 text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your translation here..."
        />
        {attemptedSubmit && input.trim() === '' && (
        <p className="text-red-500 mt-2">Please enter a response.</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {current > 0 && (
            <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
            >
            Back
            </button>
        )}
        <button
            onClick={onNext}
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
);