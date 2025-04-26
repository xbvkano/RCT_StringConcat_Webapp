// src/components/pages/ExperimentPage.tsx

import React, { useState, useRef } from 'react'
import axios from 'axios'
import { PageKey, PAGES, SurveyData } from './../../../App'
import { QuestionScreen } from './components/questionScreen'

export interface ExperimentPageProps {
  setPage: (page: PageKey) => void
  surveyData: SurveyData
  experimentDataRef: React.MutableRefObject<string[]>
  /** The literal code-view prompts shown to the user */
  questions: string[]
  /** The exact expected rendered answers, one per prompt */
  expected: string[]
  assignmentId: number
  setSurveyMetrics: (metrics: {
    accuracy: number
    test_accuracy: number[]
    durationMs: number
  }) => void
  clearSurveyData: () => void
}

const apiUrl = import.meta.env.VITE_API_URL

const ExperimentReadyScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center w-full px-6 py-10">
    <h1 className="text-4xl font-extrabold text-white text-center mb-4">
      Ready for the experiment? 🚀
    </h1>
    <p className="text-white text-center max-w-xl mb-6">
      You’ll see a series of strings—translate each into how it would render, then type your answer.
    </p>
    <button
      onClick={onStart}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
    >
      Start Experiment
    </button>
  </div>
)

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
  surveyData,
  experimentDataRef,
  questions,
  expected,
  assignmentId,
  setSurveyMetrics,
  clearSurveyData,
}) => {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const startTimeRef = useRef<number | null>(null)

  const total = questions.length
  const prompt = questions[current]

  const handleStart = () => {
    startTimeRef.current = Date.now()
    setStarted(true)
  }

  const handleNext = async () => {
    if (!started || input.trim() === '') {
      setAttemptedSubmit(true)
      return
    }

    // record this answer
    experimentDataRef.current[current] = input.trim()

    if (current < total - 1) {
      setCurrent((c) => c + 1)
      setInput(experimentDataRef.current[current + 1] || '')
      setAttemptedSubmit(false)
      return
    }

    // finalize timing
    const finish = Date.now()
    const durationMs = startTimeRef.current
      ? finish - startTimeRef.current
      : 0

    // compute correctness per item (1 = exact match, 0 = not)
    const results: number[] = expected.map((exp, idx) =>
      experimentDataRef.current[idx]?.trim() === exp ? 1 : 0
    )

    // sum up number of correct answers
    const sum = results.reduce((a, b) => a + b, 0)
    const overall = (sum / total) * 100

    setSurveyMetrics({
      accuracy: overall,
      test_accuracy: results,
      durationMs,
    })

    // submit to server
    try {
      await axios.post(`${apiUrl}/marcos`, {
        yearsProgramming: surveyData.yearsProgramming,
        age: surveyData.age,
        sex: surveyData.sex,
        language: surveyData.language,
        email: surveyData.email,
        accuracy: overall,
        task_accuracy: results,
        durationMs,
        assignmentId,
      })
      experimentDataRef.current = []
      setInput('')
    } catch (e) {
      console.error('Submit error', e)
    } finally {
      clearSurveyData()
      setPage(PAGES.thankyou)
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {!started ? (
        <ExperimentReadyScreen onStart={handleStart} />
      ) : (
        <QuestionScreen
          question={prompt}
          current={current}
          total={total}
          input={input}
          onChange={setInput}
          onNext={handleNext}
          
          attemptedSubmit={attemptedSubmit}
        />
      )}
    </div>
  )
}

export default ExperimentPage
