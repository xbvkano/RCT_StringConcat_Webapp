// src/components/pages/explain/ExplainNewline.tsx
import React from 'react'

interface ExplainNewlineProps {
  onNext: () => void
}

const ExplainNewline: React.FC<ExplainNewlineProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        Newline Syntax Explanation
      </h1>

      <p className="text-white text-md text-center max-w-xl mb-6">
        In this experiment, whenever you see a newline character, it will be shown as an actual line break.
        Treat each of those breaks as one newline.
      </p>

      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-8 border border-gray-700 whitespace-pre-wrap">
        <code>
          Line one{'\n'}
          Line two{'\n'}
          Line three
        </code>
      </div>

      <button
        onClick={onNext}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md"
      >
        Got it, let’s train!
      </button>
    </div>
  )
}

export default ExplainNewline
