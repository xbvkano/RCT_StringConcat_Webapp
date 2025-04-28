// src/components/pages/ExplainPage.tsx
import React from 'react'
import { PageKey, PAGES } from './../../../App'
import im1 from "/images/training_01.png"

interface ExplainPageProps {
  setPage: (page: PageKey) => void
}

const examples = [
  { src: im1, alt: 'question template' },
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
        How to Interact with the Experiment
      </h1>

      {/* Instructions */}
      <div className="max-w-2xl text-lg leading-relaxed space-y-6 mb-8 text-center">
        <p>
          During the experiment, you will see small code snippets that contain special characters disguised in different syntaxes.
          Your task is to figure out how many <strong>lines</strong> or <strong>tabs</strong> are created based on what you see.
        </p>

        <p>
          To keep the experience fast and smooth, we recommend placing one hand over the number keys
          <code className="bg-gray-800 px-2 py-1 mx-1 rounded">1</code> through 
          <code className="bg-gray-800 px-2 py-1 mx-1 rounded">4</code>,
          and the other hand over the 
          <code className="bg-gray-800 px-2 py-1 mx-1 rounded">Enter</code> key.
        </p>

        <p>
          Think carefully about your answer, then type the number that matches your count and press <strong>Enter</strong> to submit.
        </p>

        <p>
          If you accidentally press the wrong number, you can press
          <code className="bg-gray-800 px-2 py-1 mx-1 rounded">Backspace</code> to erase your input before submitting.
        </p>

        <p>
          Here's an example of how it looks during training:
        </p>

        {/* Example Image */}
        <div>
          {examples.map((ex, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={ex.src} alt={ex.alt} className="rounded shadow-md mb-2 max-h-96" />
              <p className="text-sm text-gray-300 text-center">{ex.alt}</p>
            </div>
          ))}
        </div>

        <p>
          Once you're comfortable, you'll move on to the main experiment where your accuracy and speed will be measured.
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
