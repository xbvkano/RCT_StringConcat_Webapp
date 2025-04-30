// src/components/pages/ExperimentPage.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { QuestionScreen } from './components/questionScreen'
import type { QuestionItem, GroupKey } from '../../ultilities/questionsTemplates'
import { groups } from '../../ultilities/questionsTemplates'
import type { SurveyData } from '../../../App'

export interface ExperimentPageProps {
  setPage: () => void
  surveyData: SurveyData
  experimentDataRef: React.MutableRefObject<string[]>
  idsRef: React.MutableRefObject<string[]>
  durationsRef: React.MutableRefObject<number[]>
  accuracyRef: React.MutableRefObject<boolean[]>
  questions: QuestionItem[]
  assignmentIds: number[]
  setSurveyMetrics: (metrics: {
    ids: string[]
    accuracyArray: boolean[]
    durations: number[]
    totalTime: number
  }) => void
}

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
  surveyData,
  experimentDataRef,
  idsRef,
  durationsRef,
  accuracyRef,
  questions,
  setSurveyMetrics,
}) => {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const startTimeRef = useRef(0)
  const questionStartRef = useRef(0)

  // reset once on mount
  useEffect(() => {
    idsRef.current = []
    durationsRef.current = []
    accuracyRef.current = []
    experimentDataRef.current = []
  }, [])

  const syntaxMap = useMemo(() => {
    const m: Record<string, GroupKey> = {}
    ;(Object.keys(groups) as GroupKey[]).forEach(g =>
      groups[g].syntaxes.forEach(s => { m[s.text] = g })
    )
    return m
  }, [])

  const total = questions.length
  const currentItem = questions[current]

  const handleStart = () => {
    const now = Date.now()
    startTimeRef.current = now
    questionStartRef.current = now
    setStarted(true)
  }

  const handleNext = () => {
    if (!started || input.trim() === '') {
      setAttemptedSubmit(true)
      return
    }

    // record by index
    idsRef.current[current] = currentItem.id

    const now = Date.now()
    const delta = now - questionStartRef.current
    durationsRef.current[current] = delta
    questionStartRef.current = now

    let syntaxUsed: string | null = null
    let groupKey: GroupKey | null = null
    for (const [syn, grp] of Object.entries(syntaxMap)) {
      if (currentItem.text.includes(syn)) {
        syntaxUsed = syn
        groupKey = grp
        break
      }
    }
    const count = syntaxUsed
      ? currentItem.text.split(syntaxUsed).length - 1
      : 0
    const correctAnswer = groupKey === 'newline' ? count + 1 : count

    const userAnswer = parseInt(input, 10)
    const isCorrect = userAnswer === correctAnswer
    accuracyRef.current[current] = isCorrect
    experimentDataRef.current[current] = input

    if (current < total - 1) {
      setCurrent(current + 1)
      setInput('')
      setAttemptedSubmit(false)
      return
    }

    if (submitted) return
    setSubmitted(true)

    const experimentEnd = Date.now()
    const totalTime = experimentEnd - startTimeRef.current

    setSurveyMetrics({
      ids: [...idsRef.current],
      accuracyArray: [...accuracyRef.current],
      durations: [...durationsRef.current],
      totalTime,
    })

    setPage()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {!started ? (
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Ready for the Experiment? 🚀
          </h1>
          <button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Start Experiment
          </button>
        </div>
      ) : (
        <QuestionScreen
          question={currentItem}
          current={current}
          total={total}
          input={input}
          onChange={val => setInput(val)}
          onNext={handleNext}
          attemptedSubmit={attemptedSubmit}
          submitted={submitted}
        />
      )}
    </div>
  )
}

export default ExperimentPage
