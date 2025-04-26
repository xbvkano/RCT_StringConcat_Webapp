// src/components/questionScreen.tsx
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react'
import { KeyboardDisplay } from '../../../ultilities/keyboard'
import { groups, GroupKey } from '../../../ultilities/questionsTemplates'

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
  // 1) Hold the single digit answer
  const [typedTokens, setTypedTokens] = useState<string[]>([])

  // 2) Reset answer when question changes
  useEffect(() => {
    setTypedTokens([])
  }, [question])

  // 3) Propagate joined input upward
  const displayValue = typedTokens.join('')
  useEffect(() => {
    onChange(displayValue)
  }, [displayValue, onChange])

  // 4) Build map: syntax string → its groupKey
  const syntaxMap = useMemo(() => {
    const m: Record<string, GroupKey> = {}
    ;(Object.keys(groups) as GroupKey[]).forEach((g) => {
      groups[g].syntaxes.forEach((syntaxCfg) => {
        m[syntaxCfg.text] = g
      })
    })
    return m
  }, [])

  // 5) Find which syntax is present in this prompt
  const [currentSyntax, currentGroup] = useMemo(() => {
    for (const [syn, grp] of Object.entries(syntaxMap)) {
      if (question.includes(syn)) {
        return [syn, grp] as [string, GroupKey]
      }
    }
    return [null, null] as [string | null, GroupKey | null]
  }, [question, syntaxMap])

  // 6) Handle on-screen and keyboard presses
  const handleKey = useCallback(
    (token: string) => {
      setTypedTokens((prev) => {
        if (token === 'DELETE') {
          // clear entry
          return []
        }
        if (token === 'ENTER') {
          // submit & move on
          onNext()
          return []
        }
        // accept only one digit
        if (['1', '2', '3', '4'].includes(token) && prev.length === 0) {
          return [token]
        }
        return prev
      })
    },
    [onNext]
  )

  // 7) Listen for physical keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) handleKey(e.key)
      else if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('DELETE')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  // ——— UI ——————————————————————————————————————————————
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Experiment
      </h1>

      <p className="text-white mb-6">
        Question {current + 1}/{total}
      </p>


      <p className="text-gray-300 text-sm mb-6">
        Treating{' '}
        <code className="px-1 bg-gray-700 rounded">{currentSyntax}</code> as a{' '}
        <strong className="font-bold underline">
          {currentGroup === 'newline' ? 'newline' : 'tab'}
        </strong >, how many{' '}
        <strong className="font-bold underline">
          {currentGroup === 'newline' ? 'lines' : 'tabs'} 
        </strong >
        &nbsp;will be printed?
      </p>

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

      {attemptedSubmit && displayValue === '' && (
        <p className="text-red-500 mt-2">Please enter a response.</p>
      )}
    </div>
  )
}
