// src/components/pages/TrainingPage.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { KeyboardDisplay } from '../../ultilities/keyboard'
import { AssignmentScreen } from './components/AssigmentScreen'
import { trainingGroups } from '../../ultilities/questionsTemplates'
import type { QuestionItem } from '../../ultilities/questionsTemplates'

interface TrainingPageProps {
  setPage: () => void
  trainingQuestions: QuestionItem[]
}

const TrainingPage: React.FC<TrainingPageProps> = ({
  setPage,
  trainingQuestions,
}) => {
  const questions = trainingQuestions

  const [started, setStarted] = useState(false)
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleKey = useCallback(
    (token: string) => {
      if (token === 'DELETE') {
        setTyped(t => t.slice(0, -1))
      } else if (token === 'ENTER') {
        if (!showFeedback) {
          if (typed === '') {
            setAttempted(true)
            return
          }
          setShowFeedback(true)
        } else {
          if (idx < questions.length - 1) {
            setIdx(i => i + 1)
            setTyped('')
            setAttempted(false)
            setShowFeedback(false)
          } else {
            setPage()
          }
        }
      } else if (['1','2','3','4'].includes(token)) {
        if (typed === '') setTyped(token)
      }
    },
    [idx, questions.length, typed, showFeedback, setPage]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1','2','3','4'].includes(e.key)) handleKey(e.key)
      else if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('DELETE')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  if (questions.length === 0) {
    return <div className="text-center p-8 text-white">Loading…</div>
  }

  const total = questions.length
  const current = questions[idx]

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-6 py-10">
        <AssignmentScreen onStart={() => setStarted(true)} />
      </div>
    )
  }

  const prefix = current.id.slice(0, 2)
  const groupKey: 'newline' | 'tab' =
    prefix === trainingGroups.newline.groupId ? 'newline' : 'tab'
  const groupConfig = trainingGroups[groupKey]

  const syntaxUsed = groupConfig.syntaxes.find(s =>
    current.text.includes(s.text)
  )!.text

  const escaped = syntaxUsed.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const count = (current.text.match(new RegExp(escaped, 'g')) || []).length
  const correctAnswer = groupKey === 'newline' ? count + 1 : count

  const actualChar = groupKey === 'newline' ? '\n' : '\t'
  const rendered = current.text.replace(
    new RegExp(escaped, 'g'),
    actualChar
  )

  const userAns = parseInt(typed, 10)
  const isCorrect = userAns === correctAnswer

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-4">Training</h1>

      {!showFeedback ? (
        <>
          <p className="mb-1">
            Question {idx + 1}/{total} — ID <code>{current.id}</code>
          </p>

          <h2 className="text-2xl text-white font-bold mb-2 mt-4 text-center">
            {groupKey === 'newline' ? 'Newline syntax is:' : 'Tab syntax is:'}
          </h2>
          <div className="text-center text-white mb-4">
            <code className="text-xl bg-gray-800 px-3 py-2 rounded inline-block">
              {groupKey === 'newline' && syntaxUsed === '\n'
                ? '↵ (newline)'
                : groupKey === 'tab' && syntaxUsed === '\t'
                ? '→ (tab)'
                : syntaxUsed}
            </code>
          </div>


          <div className="bg-gray-800 p-4 rounded mb-4 max-w-xl w-full whitespace-pre-wrap">
            <code>{current.text}</code>
          </div>

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
