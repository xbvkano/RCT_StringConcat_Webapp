// src/ultilities/keyboard/KeyboardDisplay.tsx
import React from 'react'
import { getTokensByIndex, getExpectedTokens } from './tokenizer'
import { trainingTemplate } from './questionsTemplates'

interface KeyboardDisplayProps {
  /** index into the template set */
  index?: number
  /** when true, source = trainingTemplate */
  training?: boolean
  onKey: (token: string) => void
}

export const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({
  index,
  training = false,
  onKey,
}) => {
  const source = React.useMemo<string[]>(() => {
    if (training) {
      if (index === undefined) return []
      return getExpectedTokens(trainingTemplate[index])
    }
    if (index !== undefined) return getTokensByIndex(index, training)
    return []
  }, [index, training])

  const specialList = [
    'TAB',
    'SPACE',
    'NEWLINE',
    'nullCharacter',
    '\\',
    '"',
    "'",
    'DELETE',
  ] as const
  const specialSet = new Set<string>(specialList as readonly string[])

  const normalTokens = React.useMemo(
    () => shuffleArray(source.filter((t) => !specialSet.has(t))),
    [source]
  )

  const allKeys = [
    ...normalTokens.map((t) => ({ token: t, special: false })),
    ...specialList.map((t) => ({ token: t, special: true })),
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {allKeys.map(({ token, special }, i) => {
        const isDelete = token === 'DELETE'
        return (
          <div
            key={i}
            onClick={() => onKey(token)}
            className={
              `font-mono text-sm whitespace-nowrap border rounded-lg px-4 py-2 transition-shadow duration-200 shadow-sm hover:shadow-lg cursor-pointer ${
                isDelete
                  ? 'bg-red-600 hover:bg-red-700 border-red-700 text-white'
                  : special
                  ? 'bg-blue-600 hover:bg-blue-700 border-blue-700 text-white'
                  : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-800'
              }`
            }
          >
            {token}
          </div>
        )
      })}
    </div>
  )
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
