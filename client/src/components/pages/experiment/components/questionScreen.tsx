// src/components/questionScreen.tsx
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react'
import { KeyboardDisplay } from '../../../ultilities/keyboard'
import { groups, GroupKey, QuestionItem } from '../../../ultilities/questionsTemplates'

export interface QuestionProps {
  question: QuestionItem
  current: number
  total: number
  input: string
  onChange: (val: string) => void
  onNext: () => void
  attemptedSubmit: boolean
  submitted: boolean
}

export const QuestionScreen: React.FC<QuestionProps> = ({
  question,
  current,
  total,
  onChange,
  onNext,
  attemptedSubmit,
  submitted,
}) => {
  const [typedTokens, setTypedTokens] = useState<string[]>([])

  useEffect(() => {
    setTypedTokens([])
  }, [question.text])

  const displayValue = typedTokens.join('')
  useEffect(() => {
    onChange(displayValue)
  }, [displayValue, onChange])

  const [currentGroup, currentSyntax] = useMemo(() => {
    const groupId = question.id.slice(0, 2)
    const syntaxId = question.id.slice(4, 6)

    let foundGroup: GroupKey | null = null
    for (const key of Object.keys(groups) as GroupKey[]) {
      if (groups[key].groupId === groupId) {
        foundGroup = key
        break
      }
    }

    if (!foundGroup) {
      return [null, null] as [GroupKey | null, string | null]
    }

    if (syntaxId === '01') {
      if (groupId === '01') {
        return [foundGroup, '\n'] as [GroupKey, string]
      }
      if (groupId === '02') {
        return [foundGroup, '\t'] as [GroupKey, string]
      }
    }

    const groupConfig = groups[foundGroup]
    const syntax = groupConfig.syntaxes.find((s) => s.id === syntaxId)

    return [foundGroup, syntax?.text || null] as [GroupKey, string | null]
  }, [question.id])

  const handleKey = useCallback(
    (token: string) => {
      if (submitted) return

      setTypedTokens((prev) => {
        if (token === 'DELETE') {
          return []
        }
        if (token === 'ENTER') {
          onNext()
          return []
        }
        if (['1', '2', '3', '4'].includes(token) && prev.length === 0) {
          return [token]
        }
        return prev
      })
    },
    [onNext, submitted]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) handleKey(e.key)
      else if (e.key === 'Enter') handleKey('ENTER')
      else if (e.key === 'Backspace') handleKey('DELETE')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  const renderedQuestion = useMemo(() => {
    if (currentSyntax === '\n') {
      return question.text.split('\n').map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          <br />
        </React.Fragment>
      ))
    } else if (currentSyntax === '\t') {
      return question.text.split('\t').map((part, idx) => (
        <React.Fragment key={idx}>
          {part}
          {'\u00A0\u00A0\u00A0\u00A0'} {/* 4 non-breaking spaces */}
        </React.Fragment>
      ))
    }
    return question.text
  }, [question.text, currentSyntax])

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
        <code className="px-1 bg-gray-700 rounded">
          {currentSyntax === '\n' ? <br /> : currentSyntax === '\t' ? "\u00A0\u00A0\u00A0\u00A0" : currentSyntax}
        </code>{' '}
        as a{' '}
        <strong className="font-bold underline">
          {currentGroup === 'newline' ? 'newline' : 'tab'}
        </strong>, how many{' '}
        <strong className="font-bold underline">
          {currentGroup === 'newline' ? 'lines' : 'tabs'}
        </strong> will be printed?
      </p>

      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 whitespace-pre-wrap">
        <code>{renderedQuestion}</code>
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
