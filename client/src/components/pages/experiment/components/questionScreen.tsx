// src/components/questionScreen.tsx
import React from 'react'
import { KeyboardDisplay } from './../../../ultilities/keyboard'

export interface QuestionProps {
  question: string
  current: number
  total: number
  input: string
  onBack: () => void
  onNext: () => void
  onChange: (val: string) => void
  attemptedSubmit: boolean
}

export const QuestionScreen: React.FC<QuestionProps> = ({
  question,
  current,
  total,
  input,
  onChange,
  onBack,
  onNext,
  attemptedSubmit,
}) => {
  // keep track of the tokens the user has typed
  const [typedTokens, setTypedTokens] = React.useState<string[]>([])

  // clear tokens when the question changes
  React.useEffect(() => {
    setTypedTokens([])
  }, [question])

  // build the display value whenever tokens change
  const displayValue = React.useMemo(() => {
    return typedTokens
      .map((tok) => {
        switch (tok) {
          case 'TAB':
            return '\t'
          case 'SPACE':
            return ' '
          case 'NEWLINE':
            return '\n'
          case 'nullCharacter':
            return '\0'
          default:
            return tok
        }
      })
      .join('')
  }, [typedTokens])

  // push the joined string back up
  React.useEffect(() => {
    onChange(displayValue)
  }, [displayValue])

  const handleKey = (token: string) => {
    setTypedTokens((prev) => {
      if (token === 'DELETE') return prev.slice(0, -1)
      return [...prev, token]
    })
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Experiment
      </h1>
      <p className="text-white mb-6">
        Question {current + 1}/{total}
      </p>
      {/* question prompt */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 text-left">
        <code>{question}</code>
      </div>

      {/* “Screen” area with matching width */}
      <div
        className="
          mb-4 p-2 border border-gray-600 rounded
          min-h-[4rem] font-mono whitespace-pre-wrap
          bg-gray-800 text-white
          max-w-xl w-full
        "
      >
        {displayValue.split('').map((ch, i) =>
          ch === '\n' ? (
            <br key={i} />
          ) : ch === '\t' ? (
            <span key={i} className="inline-block w-8" />
          ) : (
            <span key={i}>{ch}</span>
          )
        )}
        {/* tight cursor */}
        <span className="inline-block w-1 h-6 bg-white animate-pulse align-bottom" />
      </div>

      {/* on-screen keyboard */}
          <KeyboardDisplay index={current} onKey={handleKey} training={false} />

      {attemptedSubmit && input.trim() === '' && (
        <p className="text-red-500 mt-2">Please enter a response.</p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {current > 0 && (
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          className={`py-2 px-6 font-semibold rounded shadow-md transition-all ${
            input.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              : 'bg-gray-700 text-white cursor-default'
          }`}
        >
          Next
        </button>
      </div>
    </>
  )
}
