// src/ultilities/keyboard/KeyboardDisplay.tsx
import React, { useEffect } from 'react'

interface KeyboardDisplayProps {
  onKey: (token: string) => void
}

export const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({ onKey }) => {
  const choices = ['1', '2', '3', '4']

  // const handleClick = (key: string) => {
  //   onKey(key)
  // }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      if (choices.includes(key)) {
        onKey(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onKey])

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {choices.map((choice) => (
        <button
          key={choice}
          
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-3 px-6 rounded shadow transition-all"
        >
          {choice}
        </button>
      ))}
    </div>
  )
}
