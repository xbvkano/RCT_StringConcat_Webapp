// src/components/pages/explain/ExplainTab.tsx
import React from 'react'

interface ExplainTabProps {
  onNext: () => void
}

const ExplainTab: React.FC<ExplainTabProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        Tab Syntax Explanation
      </h1>

      <p className="text-white text-md text-center max-w-xl mb-6">
        In this experiment, whenever you see a tab character, it will be shown as{' '}
        <code className="px-1 bg-gray-700 rounded">
          {'\u00A0\u00A0\u00A0\u00A0'}
        </code>{' '}
        (four spaces). Treat each instance of that spacing as one tab.
      </p>

      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-8 border border-gray-700 whitespace-pre-wrap">
        <code>
          Column1{'\u00A0\u00A0\u00A0\u00A0'}Column2{'\u00A0\u00A0\u00A0\u00A0'}Column3
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

export default ExplainTab
