// src/components/pages/ExplainPage.tsx
import React from 'react'
import { PageKey, PAGES } from './../../../App'
import im1 from "/images/example_1.png"
import im2 from '/images/example_2.png'
import im3 from '/images/example_3.png'
interface ExplainPageProps {
  setPage: (page: PageKey) => void
}

const examples = [
  { src: im1, alt: 'Some tokens correct (green), some incorrect (red)' },
  { src: im2, alt: 'All tokens correct' },
  { src: im3, alt: 'Translating newline and tab correctly' },
]

export const ExplainPage: React.FC<ExplainPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10 text-white">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-4">
        <button
          className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 transition-colors border border-white/20 shadow-sm"
          onClick={() => setPage(PAGES.info)}
        >
          ←
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-8 border-b border-gray-700 pb-2">
        How the Experiment Works
      </h1>

      {/* Explanation Text */}
      <div className="max-w-2xl text-lg leading-relaxed space-y-6 mb-8">
        <p>
          You will see snippets of code with special placeholders like <code className="bg-gray-800 px-2 py-1 rounded">{`/SPECIAL`}</code>
          or <code className="bg-gray-800 px-2 py-1 rounded">{`<SPECIAL>`}</code>. Where <code className="bg-gray-800 px-2 py-1 rounded">SPECIAL</code> 
           will be one of the special characters from the previous page. In training, you'll replace these placeholders
          with actual tokens (newline, tab, backslash, quotes).
        </p>
        <p>
          The on-screen keyboard lets you type tokens one at a time. Green highlights mean you matched the expected token, red means a mistake.
        </p>
        <p>
          Below are examples of how the feedback looks during training:
        </p>

        {/* Example Images */}
        <div className="">
          {examples.map((ex, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={ex.src} alt={ex.alt} className="rounded shadow-md mb-2 max-h-96" />
              <p className="text-sm text-gray-300 text-center">{ex.alt}</p>
            </div>
          ))}
        </div>

        <p>
          Once you’re comfortable, you’ll move on to the actual experiment where we measure accuracy and speed.
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => setPage(PAGES.survey)}
        className="mt-6 py-2 px-6 font-semibold rounded shadow-md bg-blue-600 hover:bg-blue-700 transition-all text-white"
      >
        Start
      </button>
    </div>
  )
}

export default ExplainPage
