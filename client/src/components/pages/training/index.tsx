// src/components/pages/TrainingPage.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { PageKey, PAGES } from '../../../App'
import {
  trainingGroups,
  TrainingGroupKey,
} from '../../ultilities/questionsTemplates'
import { KeyboardDisplay } from '../../ultilities/keyboard'
import { AssignmentScreen } from './components/AssigmentScreen'

interface TrainingPageProps {
  setPage: (page: PageKey) => void
}

const TrainingPage: React.FC<TrainingPageProps> = ({ setPage }) => {
  const groupKeys = useMemo(
    () => Object.keys(trainingGroups) as TrainingGroupKey[],
    []
  )

  const [groupIndex, setGroupIndex] = useState(0)
  const currentGroupKey = groupKeys[groupIndex]
  const { placeholder, templates, syntaxes } = trainingGroups[currentGroupKey]

  const chosenSyntaxes = useMemo(
    () =>
      templates.map(() =>
        syntaxes[Math.floor(Math.random() * syntaxes.length)]
      ),
    [templates, syntaxes]
  )

  const [started, setStarted] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [typedTokens, setTypedTokens] = useState<string[]>([])
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    setQuestionIndex(0)
    setTypedTokens([])
    setAttemptedSubmit(false)
    setShowFeedback(false)
    setStarted(false)
  }, [currentGroupKey])

  const codeQuestions = useMemo(
    () =>
      templates.map((tpl, i) =>
        tpl.replace(
          new RegExp(`\\{${placeholder}\\}`, 'g'),
          chosenSyntaxes[i]
        )
      ),
    [templates, placeholder, chosenSyntaxes]
  )

  const renderedQuestions = useMemo(() => {
    const actualChar =
      placeholder === 'n' ? '\n' :
      placeholder === 't' ? '\t' :
      ''
    return templates.map((tpl) =>
      tpl.replace(
        new RegExp(`\\{${placeholder}\\}`, 'g'),
        actualChar
      )
    )
  }, [templates, placeholder])

  const total = codeQuestions.length
  const applied = codeQuestions[questionIndex]
  const appliedRendered = renderedQuestions[questionIndex]

  // Only for newlines do we add +1; tabs just count occurrences
  const correctAnswer = useMemo(() => {
    const rx = new RegExp(`\\{${placeholder}\\}`, 'g')
    const count = (templates[questionIndex].match(rx) || []).length
    return placeholder === 'n' ? count + 1 : count
  }, [templates, questionIndex, placeholder])

  const displayValue = typedTokens.join('')
  const userAnswer = parseInt(displayValue, 10)
  const isCorrect = userAnswer === correctAnswer

  const handleKey = useCallback((token: string) => {
    if (token === 'DELETE') {
      setTypedTokens((p) => p.slice(0, -1))
    } else if (token === 'ENTER') {
      if (!showFeedback) {
        if (typedTokens.length === 0) {
          setAttemptedSubmit(true)
          return
        }
        setShowFeedback(true)
      } else {
        if (questionIndex < total - 1) {
          setQuestionIndex((i) => i + 1)
          setTypedTokens([])
          setAttemptedSubmit(false)
          setShowFeedback(false)
        } else if (groupIndex < groupKeys.length - 1) {
          setGroupIndex((g) => g + 1)
        } else {
          setPage(PAGES.experiment)
        }
      }
    } else {
      setTypedTokens((p) =>
        p.length === 0 && ['1', '2', '3', '4'].includes(token)
          ? [token]
          : p
      )
    }
  }, [
    showFeedback,
    typedTokens,
    questionIndex,
    total,
    groupIndex,
    groupKeys.length,
    setPage
  ])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('DELETE')
      else if (['1', '2', '3', '4'].includes(e.key))
        handleKey(e.key)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-6 py-10">
        <AssignmentScreen
          groupKey={currentGroupKey}
          onStart={() => setStarted(true)}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Training: {placeholder === 'n' ? 'Newline' : 'Tab'}
      </h1>

      {!showFeedback && (
        <p className="text-white mb-2">
          Question {questionIndex + 1}/{total}
        </p>
      )}

      {!showFeedback && (
        <>
          <p className="text-white text-sm mb-1 italic">
            How many {placeholder === 'n' ? 'lines' : 'tabs'}?
          </p>
          <p className="text-gray-300 text-xs mb-4">
            Treat <code>{chosenSyntaxes[questionIndex]}</code> as a{' '}
            <strong>{placeholder === 'n' ? 'newline' : 'tab'}</strong>.
          </p>
        </>
      )}

      {!showFeedback && (
        <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 whitespace-pre-wrap">
          <code>{applied}</code>
        </div>
      )}

      {!showFeedback ? (
        <>
          <div className="mb-4 p-2 border border-gray-600 rounded min-h-[4rem] font-mono whitespace-pre-wrap bg-gray-800 text-white w-full max-w-xl">
            {displayValue || (
              <span className="text-gray-500">Type your answer…</span>
            )}
            <span className="inline-block w-1 h-6 bg-white animate-pulse ml-1 align-bottom" />
          </div>
          {attemptedSubmit && (
            <p className="text-red-500 mb-2">Please enter a response.</p>
          )}
          <KeyboardDisplay onKey={handleKey} />
        </>
      ) : (
        <div className="bg-gray-800 text-white p-4 rounded max-w-xl w-full space-y-4">
          <div>
            <p className="text-sm text-gray-400">Original string:</p>
            <pre className="bg-gray-700 p-2 rounded whitespace-pre-wrap">
              {applied}
            </pre>
          </div>
          <div>
            <p className="text-sm text-gray-400">Rendered output:</p>
            <pre className="bg-gray-700 p-2 rounded whitespace-pre-wrap">
              {appliedRendered}
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
                {isNaN(userAnswer) ? 'Invalid' : userAnswer}
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
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default TrainingPage
