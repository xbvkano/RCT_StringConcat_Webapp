// src/components/ui/ReferenceModal.tsx
import React from 'react'
import { DetGroup, Determinant, detMap } from './questionsTemplates'

interface ReferenceModalProps {
  isOpen: boolean
  onClose: () => void
  selectedGroup: DetGroup
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({
  isOpen,
  onClose,
  selectedGroup,
}) => {
  if (!isOpen) return null

  const det: Determinant = detMap[selectedGroup]

  const specialItems = React.useMemo(() => {
    // define tokens and their placeholder codes
    const map = [
      { token: 'NEWLINE',       label: 'Newline',        code: 'n'    },
      { token: 'TAB',           label: 'Tab',            code: 't'    },
      { token: 'SPACE',         label: 'Space',          code: ' '    },
      { token: 'nullCharacter', label: 'Null Character', code: '0'    },
      { token: '\\',          label: 'Backslash',      code: '\\' },
      { token: '"',            label: 'Double Quote',   code: '"'   },
      { token: "'",            label: 'Single Quote',   code: "'"   },
    ]

    return map.map(({ token, label, code }) => {
      const isPlaceholder = ['n', 't', '0', "\\", "\'", "\""].includes(code)
      const symbol = isPlaceholder
        ? `${det.Lhand}${code}${det.Rhand}` // e.g. \n, ${n}, etc.
        : code === ' ' ? '␣' : code      // space as ␣, else literal
      return { token, label, symbol }
    })
  }, [det])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-lg w-11/12 max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close reference"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Reference Sheet</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Special Characters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specialItems.map(({ token, label, symbol }) => (
                <div
                  key={token}
                  className="flex justify-between items-center bg-gray-800 rounded p-2"
                >
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-400">{symbol}</p>
                  </div>
                  <div className="font-mono text-xs border rounded px-3 py-1 bg-blue-600">
                    {token}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Your Indicator Style</h3>
            <div className="bg-gray-800 rounded p-4">
              <p className="mb-1">Pattern:</p>
              <code className="bg-gray-700 px-2 py-1 rounded block">
                {det.Lhand}
                <span className="text-yellow-300">SPECIAL</span>
                {det.Rhand}
              </code>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={onClose}
              className="mt-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferenceModal