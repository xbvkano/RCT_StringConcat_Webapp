// src/components/questionScreen.tsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { KeyboardDisplay } from '../../../ultilities/keyboard'
import { groups } from '../../../ultilities/questionsTemplates'

export interface QuestionProps {
  question: string
  current: number
  total: number
  input: string
  onChange: (val: string) => void
  onNext: () => void
  attemptedSubmit: boolean
}

export const QuestionScreen: React.FC<QuestionProps> = ({
  question,
  current,
  total,
  input,
  onChange,
  onNext,
  attemptedSubmit,
}) => {
  const [typedTokens, setTypedTokens] = useState<string[]>([])
  const timeLogs = useRef<number[]>([])
  const startTime = useRef<number>(performance.now())

  // Reset timing & tokens on question change
  useEffect(() => {
    setTypedTokens([])
    startTime.current = performance.now()
  }, [question])

  // propagate up
  const displayValue = typedTokens.join('')
  useEffect(() => {
    onChange(displayValue)
  }, [displayValue, onChange])

  // build a map syntax → groupKey
  const syntaxMap = useMemo(() => {
    const m: Record<string, 'newline' | 'tab'> = {};
    (Object.keys(groups) as Array<keyof typeof groups>).forEach((g) => {
      groups[g].syntaxes.forEach((syn) => {
        m[syn] = g as 'newline' | 'tab'
      })
    })
    return m
  }, [])

  // find which syntax appears in this question (first match)
  const [currentSyntax, currentGroup] = useMemo(() => {
    for (const [syn, grp] of Object.entries(syntaxMap)) {
      if (question.includes(syn)) {
        return [syn, grp]
      }
    }
    return [null, null] as [string | null, 'newline' | 'tab' | null]
  }, [question, syntaxMap])

  const handleKey = useCallback((token: string) => {
    setTypedTokens((prev) => {
      if (token === 'DELETE') return []
      if (token === 'ENTER') {
        const duration = performance.now() - startTime.current
        timeLogs.current.push(duration)
        if (current === total - 1) {
          console.log('Time spent per question (ms):', timeLogs.current)
        }
        onNext()
        return []
      }
      if (['1', '2', '3', '4'].includes(token) && prev.length === 0) {
        return [token]
      }
      return prev
    })
  }, [current, total, onNext])

  // bind keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) handleKey(e.key)
      else if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('DELETE')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Experiment
      </h1>
      <p className="text-white mb-6">
        Question {current + 1}/{total}
      </p>

      <p className="text-white text-sm mb-1 italic">
        How many occurrences would the string below produce?
      </p>

      {currentSyntax && currentGroup && (
        <p className="text-gray-300 text-xs mb-4">
          Treat <code>{currentSyntax}</code> as a{' '}
          <strong>{currentGroup === 'newline' ? 'newline' : 'tab'}</strong>.
        </p>
      )}

      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 whitespace-pre-wrap">
        <code>{question}</code>
      </div>

      <div className="mb-4 p-2 border border-gray-600 rounded min-h-[4rem] font-mono whitespace-pre-wrap bg-gray-800 text-white max-w-xl w-full">
        {displayValue || (
          <span className="text-gray-500">Type your answer...</span>
        )}
        <span className="inline-block w-1 h-6 bg-white animate-pulse align-bottom ml-1" />
      </div>

      <KeyboardDisplay onKey={handleKey} />

      {attemptedSubmit && input.trim() === '' && (
        <p className="text-red-500 mt-2">Please enter a response.</p>
      )}
    </div>
  )
}
