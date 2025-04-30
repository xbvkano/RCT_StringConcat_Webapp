// src/components/pages/questionScreen.tsx
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { KeyboardDisplay } from '../../../ultilities/keyboard'
import {
  groups,
  GroupKey,
  QuestionItem,
  SyntaxConfig,
} from '../../../ultilities/questionsTemplates'

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
  input,
  onChange,
  onNext,
  attemptedSubmit,
  submitted,
}) => {
  const [typedTokens, setTypedTokens] = useState<string[]>([])

  // Whenever the question changes, clear only the local tokens
  useEffect(() => {
    setTypedTokens([])
  }, [question.text])

  // Determine group & syntax for this question
  const [currentGroup, currentSyntax] = useMemo<
    [GroupKey | null, string | null]
  >(() => {
    const groupId = question.id.slice(0, 2)
    const syntaxId = question.id.slice(4, 6)
    let foundGroup: GroupKey | null = null

    ;(Object.keys(groups) as GroupKey[]).forEach((g) => {
      if (groups[g].groupId === groupId) {
        foundGroup = g
      }
    })
    if (!foundGroup) return [null, null]

    const groupConfig = groups[foundGroup] as {
      syntaxes: SyntaxConfig[]
    }
    const syntaxEntry = groupConfig.syntaxes.find(
      (s: SyntaxConfig) => s.id === syntaxId
    )
    return [foundGroup, syntaxEntry?.text || null]
  }, [question.id])

  // Handle keyboard tokens
  const handleKey = useCallback(
    (token: string) => {
      if (submitted) return

      setTypedTokens((prev) => {
        let next: string[]
        if (token === 'DELETE') {
          next = prev.slice(0, -1)
        } else if (token === 'ENTER') {
          onNext()
          next = []
        } else if (
          ['1', '2', '3', '4'].includes(token) &&
          prev.length === 0
        ) {
          next = [token]
        } else {
          next = prev
        }
        onChange(next.join(''))
        return next
      })
    },
    [onChange, onNext, submitted]
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

  // Render the question text, showing visible tabs/newlines
  const renderedQuestion = useMemo(() => {
    if (currentSyntax === '\n') {
      return question.text.split('\n').map((ln, i) => (
        <React.Fragment key={i}>
          {ln}
          <br />
        </React.Fragment>
      ))
    }
    if (currentSyntax === '\t') {
      return question.text.split('\t').map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {'\u00A0\u00A0\u00A0\u00A0'}
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
          {currentSyntax === '\n'
            ? <br />
            : currentSyntax === '\t'
            ? '\u00A0\u00A0\u00A0\u00A0'
            : currentSyntax}
        </code>{' '}
        as a{' '}
        <strong className="font-bold underline">
          {currentGroup === 'newline' ? 'newline' : 'tab'}
        </strong>
        , how many{' '}
        <strong className="font-bold underline">
          {currentGroup === 'newline' ? 'lines' : 'tabs'}
        </strong>{' '}
        will be printed?
      </p>
      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 whitespace-pre-wrap">
        <code>{renderedQuestion}</code>
      </div>
      <div className="mb-4 p-2 border border-gray-600 rounded min-h-[4rem] font-mono whitespace-pre-wrap bg-gray-800 text-white max-w-xl w-full">
        {input || <span className="text-gray-500">Type your answer...</span>}
        <span className="inline-block w-1 h-6 bg-white animate-pulse align-bottom ml-1" />
      </div>
      <KeyboardDisplay onKey={handleKey} />
      {attemptedSubmit && input === '' && (
        <p className="text-red-500 mt-2">Please enter a response.</p>
      )}
    </div>
  )
}
