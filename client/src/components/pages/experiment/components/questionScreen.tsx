// src/components/questionScreen.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { KeyboardDisplay } from './../../../ultilities/keyboard'
import { newlineTemplate, applyRandomSyntax } from './../../../ultilities/questionsTemplates'

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

  // Generate rendered string and question text
  const renderedTemplates = useMemo(() => applyRandomSyntax(newlineTemplate, "\n"), [])
  const raw = newlineTemplate[current]
  const rendered = renderedTemplates[current]

  useEffect(() => {
    setTypedTokens([])
    startTime.current = performance.now()
  }, [question])

  const displayValue = useMemo(() => typedTokens.join(''), [typedTokens])

  useEffect(() => {
    onChange(displayValue)
  }, [displayValue])

  const handleKey = (token: string) => {
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
      if (["1", "2", "3", "4"].includes(token) && prev.length === 0) {
        return [token]
      }
      return prev
    })
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Experiment
      </h1>
      <p className="text-white mb-6">
        Question {current + 1}/{total}
      </p>

      <p className="text-white text-sm mb-4 italic">How many lines would be printed with the string below?</p>

      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left">
        <code>{raw}</code>
      </div>

      <div className="mb-4 p-2 border border-gray-600 rounded min-h-[4rem] font-mono whitespace-pre-wrap bg-gray-800 text-white max-w-xl w-full">
        {displayValue || <span className="text-gray-500">Type your answer...</span>}
        <span className="inline-block w-1 h-6 bg-white animate-pulse align-bottom ml-1" />
      </div>

      <KeyboardDisplay onKey={handleKey} />

      {attemptedSubmit && input.trim() === '' && (
        <p className="text-red-500 mt-2">Please enter a response.</p>
      )}
    </div>
  )
}
