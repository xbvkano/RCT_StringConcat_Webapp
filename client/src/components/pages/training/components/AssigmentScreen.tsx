// src/components/pages/components/AssignmentScreen.tsx
import React from 'react'
import { trainingGroups, TrainingGroupKey } from '../../../ultilities/questionsTemplates'

interface AssignmentProps {
  groupKey: TrainingGroupKey
  onStart: () => void
}

export const AssignmentScreen: React.FC<AssignmentProps> = ({ groupKey, onStart }) => {
  const { placeholder, syntaxes } = trainingGroups[groupKey]
  const syntax = syntaxes[0] // we only have our single bogus training syntax here
  // Nicely human-readable name for this placeholder
  const name =
    placeholder === 'n' ? 'Newline' :
    placeholder === 't' ? 'Tab' :
    placeholder

  return (
    <>
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Ready for the training? 🎉
      </h1>
      <p className="text-white text-center max-w-xl mb-6">
        In this section, you’ll use <code>{syntax}</code> to represent each <strong>{name.toLowerCase()}</strong>.
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
      >
        Start training
      </button>
    </>
  )
}
