// src/ultilities/keyboard/KeyboardDisplay.tsx
import React, { useEffect } from 'react'

interface KeyboardDisplayProps {
  onKey: (token: string) => void
}

export const KeyboardDisplay: React.FC<KeyboardDisplayProps> = ({ onKey }) => {
  const keys = ['1', '2', '3', '4', 'ENTER', 'DELETE']

  const handleClick = (key: string) => {
    onKey(key)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      if (['1', '2', '3', '4'].includes(key)) {
        onKey(key)
      } else if (key === 'Enter') {
        onKey('ENTER')
      } else if (key === 'Backspace') {
        onKey('DELETE')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onKey])

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {keys.map((key, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(key)}
          className={`
            px-4 py-2 text-lg font-semibold rounded shadow
            ${key === 'DELETE' ? 'bg-red-600 hover:bg-red-700 text-white' :
              key === 'ENTER' ? 'bg-green-600 hover:bg-green-700 text-white' :
              'bg-gray-200 hover:bg-gray-300 text-gray-900'}
          `}
        >
          {key}
        </button>
      ))}
    </div>
  )
}
