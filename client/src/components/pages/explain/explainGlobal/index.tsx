// src/components/pages/ExplainPage.tsx
import React from 'react'
import { PageKey, PAGES } from '../../../../App'
import im1 from "/images/training_01.png"

interface ExplainPageProps {
  setPage: (page: PageKey) => void
}

const examples = [
  { src: im1, alt: 'Example of a training question' },
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
        Overview of the Experiment
      </h1>

      {/* Instructional Content */}
      <div className="max-w-2xl text-lg leading-relaxed space-y-6 mb-8 text-center">
        <p>
          In this study, we are exploring how people interpret special formatting symbols 
          that appear in programming environments. You will interact with short code snippets 
          that include subtle variations in how special characters are represented.
        </p>

        <p>
          Your task is to analyze these snippets and respond with how many formatting effects 
          (such as lines or tabs) you believe will be produced. This helps us better understand 
          how syntax affects comprehension.
        </p>

        <p>
          The experiment includes a brief training session followed by a timed evaluation. 
          During training, you'll get immediate feedback. In the final section, we’ll measure 
          both your accuracy and speed.
        </p>

        <p>
          No prior programming experience is required — just do your best!
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
      </div>

      {/* Continue Button */}
      <button
        onClick={() => setPage(PAGES.survey)}
        className="mt-6 py-2 px-6 font-semibold rounded shadow-md bg-blue-600 hover:bg-blue-700 transition-all text-white"
      >
        Begin Survey
      </button>
    </div>
  )
}

export default ExplainPage
