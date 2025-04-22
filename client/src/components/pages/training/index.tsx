// src/components/pages/TrainingPage.tsx
import React, { useState, useEffect, useMemo } from 'react'
import { PageKey, PAGES } from './../../../App'
import { newlineTemplate, newLineSyntax, applyRandomSyntax } from '../../ultilities/questionsTemplates'
import { KeyboardDisplay } from '../../ultilities/keyboard'
import { AssignmentScreen } from './components/AssigmentScreen'
import { ReferenceModal } from "./../../ultilities/referenceModal"
import { DetGroup, detMap } from '../../ultilities/questionsTemplates'

interface TrainingPageProps {
  setPage: (page: PageKey) => void
  selectedGroup: DetGroup
}

const TrainingPage: React.FC<TrainingPageProps> = ({ setPage, selectedGroup }) => {
  const [current, setCurrent] = useState(0)
  const [typedTokens, setTypedTokens] = useState<string[]>([])
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [started, setStarted] = useState(false)
  const [showRef, setShowRef] = useState(false)

  const randomSyntax = useMemo(() => newLineSyntax[Math.floor(Math.random() * newLineSyntax.length)], [])
  const transformedTemplates = useMemo(() => applyRandomSyntax(newlineTemplate, randomSyntax), [randomSyntax])
  const renderedTemplates = useMemo(() => applyRandomSyntax(newlineTemplate, "\n"), [])

  const total = transformedTemplates.length
  const raw = newlineTemplate[current]
  const applied = transformedTemplates[current]
  const appliedRendered = renderedTemplates[current]

  const correctAnswer = useMemo(() => {
    const count = (raw.match(/{n}/g) || []).length
    return count + 1
  }, [raw])

  const displayValue = typedTokens.join('')

  const handleKey = (token: string) => {
    if (token === 'DELETE') {
      setTypedTokens((prev) => prev.slice(0, -1))
    } else if (token === 'ENTER') {
      if (!showFeedback) {
        if (typedTokens.length === 0) {
          setAttemptedSubmit(true)
          return
        }
        setShowFeedback(true)
      } else {
        handleContinue()
      }
    } else {
      setTypedTokens((prev) => {
        if (prev.length === 0 && ['1', '2', '3', '4'].includes(token)) {
          return [token]
        }
        return prev
      })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKey('ENTER')
      } else if (e.key === 'Backspace') {
        handleKey('DELETE')
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        handleKey(e.key)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKey])

  const handleContinue = () => {
    if (current < total - 1) setCurrent(current + 1)
    else setPage(PAGES.experiment)
    setTypedTokens([])
    setShowFeedback(false)
    setAttemptedSubmit(false)
  }

  const userAnswer = parseInt(displayValue)
  const isCorrect = userAnswer === correctAnswer

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {!started ? (
        <AssignmentScreen
          det={detMap[selectedGroup]}
          onStart={() => setStarted(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full px-6 py-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-4">Training</h1>
          {!showFeedback && <p className="text-white mb-1">Question {current + 1}/{total}</p>}
          {!showFeedback && <p className="text-white text-sm mb-4 italic">How many lines would be printed with the string below?</p>}

          {!showFeedback && (
            <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left whitespace-pre-wrap">
              <code>{applied}</code>
            </div>
          )}

          {!showFeedback ? (
            <>
              <div className="mb-4 p-2 border border-gray-600 rounded min-h-[4rem] font-mono whitespace-pre-wrap bg-gray-800 text-white max-w-xl w-full">
                {displayValue || <span className="text-gray-500">Type your answer...</span>}
                <span className="inline-block w-1 h-6 bg-white animate-pulse align-bottom ml-1" />
              </div>
              {attemptedSubmit && <p className="text-red-500 mb-2">Type at least one token.</p>}
              <KeyboardDisplay onKey={handleKey} />
              <button
                onClick={() => setShowRef(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 mt-4"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
                Reference
              </button>
              <ReferenceModal
                isOpen={showRef}
                onClose={() => setShowRef(false)}
                selectedGroup={selectedGroup}
              />
            </>
          ) : (
            <div className="bg-gray-800 text-white p-4 rounded max-w-xl w-full">
              <h2 className="text-xl mb-4">Feedback</h2>

              <div className="mb-3">
                <p className="text-sm text-gray-400">Original string:</p>
                <div className="bg-gray-700 px-3 py-2 rounded whitespace-pre-wrap">
                  {applied}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-400">Rendered output:</p>
                <div className="bg-gray-700 px-3 py-2 rounded whitespace-pre-wrap">
                  {appliedRendered}
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-400">Your answer:</p>
                <span className={`px-3 py-1 inline-block rounded font-bold text-lg ${isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>{isNaN(userAnswer) ? 'Invalid' : userAnswer}</span>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-400">Correct answer:</p>
                <span className="px-3 py-1 inline-block rounded bg-blue-600 font-bold text-lg">{correctAnswer}</span>
              </div>

              <button
                onClick={handleContinue}
                className="mt-4 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded shadow"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TrainingPage
