// src/components/pages/components/AssignmentScreen.tsx
import React from 'react'

interface AssignmentProps {
  onStart: () => void
}

export const AssignmentScreen: React.FC<AssignmentProps> = ({ onStart }) => {


  return (
    <>
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">
        Ready for the training? 🎉
      </h1>
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
      >
        Start training
      </button>
    </>
  )
}
