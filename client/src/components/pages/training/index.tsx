// src/components/pages/TrainingPage.tsx
import React, { useState, useEffect } from 'react'
import { PageKey, PAGES } from './../../../App'
import { getExpectedTokens, tokenizeInputString } from '../../ultilities/tokenizer'
import { trainingTemplate } from '../../ultilities/questionsTemplates'
import { applyDet, detMap, DetGroup } from '../../ultilities/questionsTemplates'
import { KeyboardDisplay } from '../../ultilities/keyboard'
import { AssignmentScreen } from './components/AssigmentScreen'

interface TrainingPageProps {
  setPage: (page: PageKey) => void
  selectedGroup: DetGroup
}

const TrainingPage: React.FC<TrainingPageProps> = ({ setPage, selectedGroup }) => {
  const [current, setCurrent] = useState(0)
  const [typedTokens, setTypedTokens] = useState<string[]>([])
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState<{ expected: string[]; actual: string[] }>({ expected: [], actual: [] })
  const [started, setStarted] = useState(false)

  const handleStart = () => {
    setStarted(true)
  }

  const total = trainingTemplate.length
  const raw = trainingTemplate[current]
  const appliedList = applyDet(detMap[selectedGroup], trainingTemplate)
  const applied = appliedList[current]

  useEffect(() => {
    setTypedTokens([])
    setShowFeedback(false)
    setAttemptedSubmit(false)
  }, [current])

  const displayValue = React.useMemo(
    () =>
      typedTokens
        .map((tok) => {
          switch (tok) {
            case 'TAB': return '\t'
            case 'SPACE': return ' '
            case 'NEWLINE': return '\n'
            case 'nullCharacter': return '\0'
            default: return tok
          }
        })
        .join(''),
    [typedTokens]
  )

  const handleKey = (token: string) => {
    setTypedTokens((prev) => token === 'DELETE' ? prev.slice(0, -1) : [...prev, token])
  }

  const handleNext = () => {
    if (typedTokens.length === 0) {
      setAttemptedSubmit(true)
      return
    }
    const expected = getExpectedTokens(raw)
    const actual = typedTokens
    setFeedbackData({ expected, actual })
    setShowFeedback(true)
  }

  const handleContinue = () => {
    if (current < total - 1) setCurrent(current + 1)
    else setPage(PAGES.experiment)
  }

  const { expected, actual } = feedbackData
  const allCorrect = expected.length === actual.length && expected.every((t, i) => t === actual[i])

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
    {!started ? (
      <AssignmentScreen
        det={detMap[selectedGroup]}
        onStart={handleStart}
      />
    ) :
      <div className="flex flex-col items-center justify-center w-full px-6 py-10">
        <h1 className="text-4xl font-extrabold text-white text-center mb-4">Training</h1>
        <p className="text-white mb-6">Question {current + 1}/{total}</p>

        <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left">
          <code>{applied}</code>
        </div>

        {!showFeedback ? (
          <>
            <div className="mb-4 p-2 border border-gray-600 rounded min-h-[4rem] font-mono whitespace-pre-wrap bg-gray-800 text-white max-w-xl w-full">
              {displayValue.split('').map((ch, i) =>
                ch === '\n' ? <br key={i} /> : ch === '\t' ? <span key={i} className="inline-block w-8" /> : <span key={i}>{ch}</span>
              )}
              <span className="inline-block w-1 h-6 bg-white animate-pulse align-bottom" />
            </div>
            {attemptedSubmit && <p className="text-red-500 mb-2">Type at least one token.</p>}
            <KeyboardDisplay index={current} training onKey={handleKey} />
            <button onClick={handleNext} className="mt-6 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
              Submit
            </button>
          </>
        ) : (
          <div className="bg-gray-800 text-white p-4 rounded max-w-xl w-full">
            <h2 className="text-xl mb-2">Feedback</h2>
            {allCorrect && <p className="text-green-400 font-semibold mb-2">All tokens correct!</p>}
            <div className="mb-4">
              <p className="font-semibold">Expected tokens:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {expected.map((tok, i) => (
                  <span key={i} className={`px-2 py-1 rounded text-sm ${tok === actual[i] ? 'bg-green-600' : 'bg-red-600'}`}>
                    {tok}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Your tokens:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {actual.map((tok, i) => (
                  <span key={i} className={`px-2 py-1 rounded text-sm ${tok === expected[i] ? 'bg-green-600' : 'bg-red-600'}`}>
                    {tok}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={handleContinue} className="mt-2 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded shadow">
              Continue
            </button>
          </div>
        )}
      </div>
    }
    </div>
  )
}

export default TrainingPage
