// src/components/pages/ExperimentPage.tsx
import React, { useState, useRef, useMemo } from 'react'
import axios from 'axios'
import { PageKey, PAGES, SurveyData } from './../../../App'
import { QuestionScreen } from './components/questionScreen'
import type { QuestionItem, GroupKey } from '../../ultilities/questionsTemplates'
import { groups } from '../../ultilities/questionsTemplates'

export interface ExperimentPageProps {
  setPage: (page: PageKey) => void
  surveyData: SurveyData
  experimentDataRef: React.MutableRefObject<string[]>
  idsRef: React.MutableRefObject<string[]>
  durationsRef: React.MutableRefObject<number[]>    // ms per question
  accuracyRef: React.MutableRefObject<boolean[]>
  questions: QuestionItem[]
  assignmentId: number[]
  setSurveyMetrics: (metrics: {
    ids: string[]
    accuracyArray: boolean[]
    durations: number[]     // ms per question
    totalTime: number       // ms overall
    overallAccuracy: number
  }) => void
  clearSurveyData: () => void
}

const apiUrl = import.meta.env.VITE_API_URL

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
  surveyData,
  experimentDataRef,
  idsRef,
  durationsRef,
  accuracyRef,
  questions,
  assignmentId,
  setSurveyMetrics,
  clearSurveyData,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  // Refs to track times
  const startTimeRef = useRef<number>(0)
  const questionStartRef = useRef<number>(0)

  const total = questions.length
  const currentItem = questions[current]

  // map syntax → groupKey
  const syntaxMap = useMemo<Record<string, GroupKey>>(() => {
    const m: Record<string, GroupKey> = {}
    ;(Object.keys(groups) as GroupKey[]).forEach((g) => {
      groups[g].syntaxes.forEach((syntaxConfig) => {
        m[syntaxConfig.text] = g
      })
    })
    return m
  }, [])

  const handleStart = () => {
    const now = Date.now()
    startTimeRef.current = now
    questionStartRef.current = now
    setStarted(true)
  }

  const handleNext = async () => {
    if (!started || input.trim() === '') {
      setAttemptedSubmit(true)
      return
    }
  
    // normal progression
    idsRef.current[current] = currentItem.id
      


    const now = Date.now()
    if (durationsRef.current[current] == null) {
      const delta = now - questionStartRef.current
      durationsRef.current[current] = delta
      questionStartRef.current = now
      console.log(`Question ${current + 1}: now=${now}, duration=${delta}ms`)
    }
  
    const prompt = currentItem.text
    let syntaxUsed: string | null = null
    let groupKey: GroupKey | null = null
    for (const [syn, grp] of Object.entries(syntaxMap)) {
      if (prompt.includes(syn)) {
        syntaxUsed = syn
        groupKey = grp
        break
      }
    }
    const count = syntaxUsed ? prompt.split(syntaxUsed).length - 1 : 0
    const correctAnswer = groupKey === 'newline' ? count + 1 : count
  
    const userAnswer = parseInt(input, 10)
    const isCorrect = userAnswer === correctAnswer
    accuracyRef.current[current] = isCorrect
  
    experimentDataRef.current[current] = input
  
    // 👇 if still questions left, move to next
    if (current < total - 1) {
      setCurrent(current + 1)
      setInput(experimentDataRef.current[current + 1] || '')
      setAttemptedSubmit(false)
      return
    }
  
    // 👇 FINAL SUBMIT (only here we care about submitted lock)
  
    if (submitted) return;
    setSubmitted(true); // Immediately lock it right before final submit
  
    const experimentEnd = Date.now()
    const totalTime = experimentEnd - startTimeRef.current
    const correctCount = accuracyRef.current.filter(Boolean).length
    const overallAccuracy = correctCount / total
  
    setSurveyMetrics({
      ids: idsRef.current,
      accuracyArray: accuracyRef.current,
      durations: durationsRef.current,
      totalTime,
      overallAccuracy,
    })
  
    try {
      await axios.post(`${apiUrl}/marcos`, {
        ...surveyData,
        ids: idsRef.current,
        task_accuracy: accuracyRef.current,
        durations: durationsRef.current,
        totalTime,
        overallAccuracy,
        assignmentId,
      })
      experimentDataRef.current = []
      idsRef.current = []
      durationsRef.current = []
      accuracyRef.current = []
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
        <>
          <QuestionScreen
            question={currentItem}
            current={current}
            total={total}
            input={input}
            onChange={setInput}
            onNext={handleNext}
            attemptedSubmit={attemptedSubmit}
            submitted={submitted}
          />
          
        </>
      )}
    </div>
  )
}

export default ExperimentPage
