import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { KeyboardDisplay } from '../../../ultilities/keyboard'
import {
  groups,
  GroupKey,
  QuestionItem,
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

const QuestionScreen: React.FC<QuestionProps> = ({
  question,
  current,
  total,
  input,
  onChange,
  onNext,
  attemptedSubmit,
}) => {
  if (!question) return null

  const [hasAnswered, setHasAnswered] = useState(false)

  useEffect(() => {
    setHasAnswered(false)
  }, [question.id])

  // Fix: make onNext always reference latest value
  const onNextRef = useRef(onNext)
  useEffect(() => {
    onNextRef.current = onNext
  }, [onNext])

  const [groupKey, syntaxText] = useMemo<[GroupKey | null, string | null]>(() => {
    const gid = question.id.slice(0, 2)
    const sid = question.id.slice(4, 6)
    let g: GroupKey | null = null
    for (const k of Object.keys(groups) as GroupKey[]) {
      if (groups[k].groupId === gid) {
        g = k
        break
      }
    }

    if (!g) return [null, null]
    const entry = groups[g].syntaxes.find((s) => s.id === sid)
    return [g, entry?.text || null]
  }, [question.id])

  const handleKey = useCallback(
    (tok: string) => {
      console.log('Got here')

      if (hasAnswered) return

      console.log('Submitted?')

      if (['1', '2', '3', '4'].includes(tok)) {
        flushSync(() => {
          onChange(tok)
        })
        setHasAnswered(true)
        setTimeout(() => {
          onNextRef.current()
        }, 200)
      }
    },
    [hasAnswered, onChange]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) handleKey(e.key)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleKey])

  const rendered = useMemo(() => {
    if (syntaxText === '\n') {
      return question.text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))
    }
    if (syntaxText === '\t') {
      return question.text.split('\t').map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {'\u00A0\u00A0\u00A0\u00A0'}
        </React.Fragment>
      ))
    }
    return question.text
  }, [question.text, syntaxText])

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-4">
        Experiment
      </h1>

      <p className="mb-1 text-center">
        Question {current + 1}/{total} — ID <code>{question.id}</code>
      </p>

      <h2 className="text-2xl text-white font-bold mb-2 mt-4 text-center">
        {groupKey === 'newline' ? 'Newline syntax is:' : 'Tab syntax is:'}
      </h2>
      <div className="text-center text-white mb-4">
        <code className="text-xl bg-gray-800 px-3 py-2 rounded inline-block">
          {groupKey === 'newline' && syntaxText === '\n'
            ? '↵ (newline)'
            : groupKey === 'tab' && syntaxText === '\t'
            ? '→ (tab)'
            : syntaxText}
        </code>
      </div>

      <p className="text-xl font-semibold text-white mb-2 text-center">
        {groupKey === 'newline'
          ? 'How many lines will be printed?'
          : 'How many tabs will be printed?'}
      </p>

      <div className="bg-gray-800 text-white px-4 py-3 rounded max-w-xl w-full mb-6 border border-gray-700 whitespace-pre-wrap">
        <code>{rendered}</code>
      </div>

      <KeyboardDisplay onKey={handleKey} />

      {attemptedSubmit && input === '' && (
        <p className="text-red-500 mt-2 text-center">Please enter a response.</p>
      )}
    </div>
  )
}

export default QuestionScreen
