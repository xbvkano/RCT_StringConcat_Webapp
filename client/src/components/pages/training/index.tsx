// src/components/pages/TrainingPage.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { PageKey, PAGES } from '../../../App'
import {
  generateMixedTrainingQuestions,
  QuestionItem,
  trainingGroups,
} from '../../ultilities/questionsTemplates'
import { KeyboardDisplay } from '../../ultilities/keyboard'
import { AssignmentScreen } from './components/AssigmentScreen'

interface TrainingPageProps {
  setPage: (page: PageKey) => void
}

// helper to escape any special RegExp characters
function escapeRegex(str: string): string {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

const TrainingPage: React.FC<TrainingPageProps> = ({ setPage }) => {
  // 1) Load our flat list of QuestionItem once
  const [questions, setQuestions] = useState<QuestionItem[]>([])
  useEffect(() => {
    setQuestions(generateMixedTrainingQuestions())
  }, [])

  // 2) Top-level UI state
  const [started, setStarted] = useState(false)
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // 3) Key handler
  const handleKey = useCallback(
    (token: string) => {
      if (token === 'DELETE') {
        setTyped((t) => t.slice(0, -1))
      } else if (token === 'ENTER') {
        if (!showFeedback) {
          if (typed === '') {
            setAttempted(true)
            return
          }
          setShowFeedback(true)
        } else {
          // move to next question or experiment
          if (idx < questions.length - 1) {
            setIdx((i) => i + 1)
            setTyped('')
            setAttempted(false)
            setShowFeedback(false)
          } else {
            setPage(PAGES.experiment)
          }
        }
      } else if (['1','2','3','4'].includes(token)) {
        if (typed === '') setTyped(token)
      }
    },
    [idx, questions.length, typed, showFeedback, setPage]
  )

  // 4) Bind keyboard events
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1','2','3','4'].includes(e.key)) handleKey(e.key)
      else if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('DELETE')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  // 5) Wait for questions to load
  if (questions.length === 0) {
    return <div className="text-center p-8 text-white">Loading…</div>
  }
  const total = questions.length
  const current = questions[idx]

  // 6) Show assignment screen until “Start”
  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-6 py-10">
        <AssignmentScreen onStart={() => setStarted(true)} />
      </div>
    )
  }

  // 7) Figure out which group this is
  const groupBoundary = trainingGroups.newline.templates.length
  const groupKey: 'newline'|'tab' = idx < groupBoundary ? 'newline' : 'tab'
  const groupConfig = trainingGroups[groupKey]

  // 8) Find which syntax was actually used
  const syntaxUsed = groupConfig.syntaxes.find((s) =>
    current.text.includes(s.text)
  )!.text

  // 9) Compute correct answer
  const rawCount =
    (current.text.match(new RegExp(escapeRegex(syntaxUsed), 'g')) || []).length
  const correctAnswer = groupKey === 'newline' ? rawCount + 1 : rawCount

  // 10) Rendered output
  const actualChar = groupKey === 'newline' ? '\n' : '\t'
  const rendered = current.text.replace(
    new RegExp(escapeRegex(syntaxUsed), 'g'),
    actualChar
  )

  const userAns = parseInt(typed, 10)
  const isCorrect = userAns === correctAnswer

  // 11) Render question or feedback
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-4">Training</h1>

      {!showFeedback ? (
        <>
          <p className="mb-1">
            Question {idx + 1}/{total} — ID <code>{current.id}</code>
          </p>

          <div className="bg-gray-800 p-4 rounded mb-4 max-w-xl w-full whitespace-pre-wrap">
            <code>{current.text}</code>
          </div>

          {/* New question prompt */}
          <p className="text-gray-300 text-sm mb-6">
            Treating{' '}
            <code className="px-1 bg-gray-700 rounded">{syntaxUsed}</code> as a{' '}
            <strong className="font-bold underline">
              {groupKey === 'newline' ? 'newline' : 'tab'}
            </strong >, how many{' '}
            <strong className="font-bold underline">
              {groupKey === 'newline' ? 'lines' : 'tabs'} 
            </strong >
            &nbsp;will be printed?
          </p>

          <div className="mb-4 w-full max-w-xl">
            <div className="p-2 bg-gray-900 border border-gray-700 rounded min-h-[3rem] font-mono">
              {typed || <span className="text-gray-500">Type your answer…</span>}
            </div>
            {attempted && (
              <p className="text-red-500 mt-2">Please enter a response.</p>
            )}
          </div>
          <KeyboardDisplay onKey={handleKey} />
        </>
      ) : (
        <div className="bg-gray-800 p-6 rounded max-w-xl w-full space-y-4">
          <h2 className="text-xl mb-2">Feedback</h2>

          <div>
            <p className="text-sm text-gray-400 mb-1">Original string:</p>
            <pre className="bg-gray-700 p-2 rounded whitespace-pre-wrap">
              {current.text}
            </pre>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Rendered output:</p>
            <pre className="bg-gray-700 p-2 rounded whitespace-pre-wrap">
              {rendered}
            </pre>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Your answer:</p>
              <span
                className={`px-3 py-1 font-bold text-lg rounded ${
                  isCorrect ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {isNaN(userAns) ? 'Invalid' : userAns}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Correct answer:</p>
              <span className="px-3 py-1 inline-block rounded bg-blue-600 font-bold text-lg">
                {correctAnswer}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleKey('ENTER')}
            className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default TrainingPage
