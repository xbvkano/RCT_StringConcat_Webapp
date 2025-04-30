// src/components/pages/ExperimentPage.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react'
import QuestionScreen from "./components/questionScreen"
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
    overallAccuracy: number
  }) => void
}

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
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

  const questionStartRef = useRef<number>(0)

  // Reset all the per-question refs on mount:
  useEffect(() => {
    idsRef.current = []
    experimentDataRef.current = []
    durationsRef.current = []
    accuracyRef.current = []
  }, [])

  // Whenever we move to a new `current` question, clear the input + flags:
  useEffect(() => {
    setInput('')
    setAttemptedSubmit(false)
    setSubmitted(false)
  }, [current])

  // Map each possible syntax token to its group
  const syntaxMap = useMemo<Record<string, GroupKey>>(() => {
    const m: Record<string, GroupKey> = {}
    ;(Object.keys(groups) as GroupKey[]).forEach((g) => {
      groups[g].syntaxes.forEach((s) => {
        m[s.text] = g
      })
    })
    return m
  }, [])

  const total = questions.length
  const question = questions[current]

  const handleStart = () => {
    questionStartRef.current = Date.now()
    setStarted(true)
  }

  const handleNext = () => {
    if (!started || input.trim() === '') {
      setAttemptedSubmit(true)
      return
    }

    // record ID & raw input
    idsRef.current.push(question.id)
    experimentDataRef.current.push(input)

    // record duration
    const now = Date.now()
    const delta = now - questionStartRef.current
    durationsRef.current.push(delta)
    questionStartRef.current = now

    // determine correct answer
    let used: string | null = null
    let grp: GroupKey | null = null
    for (const [tok, g] of Object.entries(syntaxMap)) {
      if (question.text.includes(tok)) {
        used = tok
        grp = g
        break
      }
    }
    const count = used ? question.text.split(used).length - 1 : 0
    const correct = grp === 'newline' ? count + 1 : count
    const answer = parseInt(input, 10)
    accuracyRef.current.push(answer === correct)

    // next question?
    if (current < total - 1) {
      setCurrent(c => c + 1)
      return
    }

    // final submit for this group
    if (submitted) return
    setSubmitted(true)

    // totalTime = sum of all per-question durations
    const totalTime = durationsRef.current.reduce((a, b) => a + b, 0)
    const arrAcc = [...accuracyRef.current]
    const overall = arrAcc.filter(x => x).length / arrAcc.length

    setSurveyMetrics({
      ids: [...idsRef.current],
      accuracyArray: arrAcc,
      durations: [...durationsRef.current],
      totalTime,
      overallAccuracy: overall,
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
          question={question}
          current={current}
          total={total}
          input={input}
          onChange={setInput}
          onNext={handleNext}
          attemptedSubmit={attemptedSubmit}
          submitted={submitted}
        />
      )}
    </div>
  )
}

export default ExperimentPage
