import React from 'react'
import { PageKey, PAGES } from './../../../App'
import { trainingGroups } from '../../ultilities/questionsTemplates'

interface InfoPageProps {
  setPage: (page: PageKey) => void
}

const InfoPage: React.FC<InfoPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-6">
      {/* Back button */}
      <div className="w-full flex justify-start mb-4">
        <button
          className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 hover:text-white transition-colors border border-white/20 shadow-sm"
          onClick={() => setPage(PAGES.landing)}
        >
          ←
        </button>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-white tracking-tight text-center mt-8 mb-4 border-b border-gray-700 pb-2">
        How the Training Works
      </h1>

      {/* Introduction */}
      <div className="max-w-2xl text-white text-md text-center leading-relaxed mb-8">
        <p className="mb-4">
          In this experiment, you will practice recognizing special characters like
          <strong className="font-bold mx-1">newline</strong> and
          <strong className="font-bold mx-1">tab</strong>.
        </p>
        <p className="mb-4">
          To make it more realistic, the newline and tab characters will not always appear directly.
          Instead, they will be disguised using different syntaxes — similar to how special characters
          appear in real programming code.
        </p>
        <p className="mb-4">
          Your task is to interpret these different forms correctly, and count how many 
          <strong className="font-bold mx-1">lines</strong> (for newline) or 
          <strong className="font-bold mx-1">tabs</strong> are created.
        </p>
      </div>

      {/* Syntaxes List */}
      <div className="text-white text-lg max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Newline syntaxes */}
        <div className="text-left">
          <p className="mb-3 font-semibold underline underline-offset-4">Newline Syntaxes:</p>
          <ul className="space-y-2">
            {trainingGroups.newline.syntaxes.map((s) => (
              <li key={s.id} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">🔹</span>
                <span>
                  <code>{s.text}</code>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Tab syntaxes */}
        <div className="text-left md:text-right">
          <p className="mb-3 font-semibold underline underline-offset-4">Tab Syntaxes:</p>
          <ul className="space-y-2">
            {trainingGroups.tab.syntaxes.map((s) => (
              <li key={s.id} className="flex items-start justify-end gap-2">
                <span>
                  <code>{s.text}</code>
                </span>
                <span className="text-blue-400 mt-1">🔹</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Continue button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mt-10 mb-6 shadow-lg transition-all"
        onClick={() => setPage(PAGES.explain)}
      >
        Start Training
      </button>
    </div>
  )
}

export default InfoPage
