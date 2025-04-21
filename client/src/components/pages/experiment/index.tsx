// src/components/pages/experiment.tsx
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { PageKey, PAGES, SurveyData } from './../../../App'
import { QuestionScreen } from './components/questionScreen'
import { ReadyScreen } from './components/readyScreen'

// token helpers
import {
  tokenizeInputString,
  getExpectedTokens
} from '../../ultilities/tokenizer'

// raw templates & detMap
import {
  templates as rawTemplates,
  detMap,
  DetGroup
} from '../../ultilities/questionsTemplates'




/**
 * Compute Levenshtein distance between two token arrays.
 */
function levenshteinDistanceArray(a: string[], b: string[]): number {
  const rows = b.length + 1
  const cols = a.length + 1
  const dp: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  )

  for (let i = 0; i < rows; i++) dp[i][0] = i
  for (let j = 0; j < cols; j++) dp[0][j] = j

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] =
        b[i - 1] === a[j - 1]
          ? dp[i - 1][j - 1]
          : 1 +
            Math.min(
              dp[i - 1][j],    // delete
              dp[i][j - 1],    // insert
              dp[i - 1][j - 1] // substitute
            )
    }
  }
  return dp[rows - 1][cols - 1]
}

export interface ExperimentPageProps {
  setPage: (page: PageKey) => void
  surveyData: SurveyData
  experimentDataRef: React.MutableRefObject<string[]>
  selectedGroup: DetGroup
  questions: string[]
  setSurveyMetrics: (metrics: {
    accuracy: number
    test_accuracy: number[]
    time: Date
  }) => void
  clearSurveyData: () => void
}

const apiUrl = import.meta.env.VITE_API_URL

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
  surveyData,
  experimentDataRef,
  selectedGroup,
  questions,
  setSurveyMetrics,
  clearSurveyData,
}) => {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const startTimeRef = useRef<number | null>(null)

  const totalQuestions = questions.length
  const question = questions[current]

  const handleStart = () => {
    startTimeRef.current = Date.now()
    setStarted(true)
  }

  const handleNext = async () => {
    if (!started || input === '') {
      setAttemptedSubmit(true)
      return
    }

    // — Log THIS question’s token‐accuracy —
    const expectedTokens = getExpectedTokens(rawTemplates[current])
    const actualTokens = tokenizeInputString(input)
    const dist = levenshteinDistanceArray(expectedTokens, actualTokens)
    const maxLen = Math.max(expectedTokens.length, actualTokens.length)
    const accuracy = maxLen > 0 ? ((1 - dist / maxLen) * 100) : 100
    console.log(
      `Accuracy for Q${current + 1}: ${accuracy.toFixed(2)}%`,
      { expectedTokens, actualTokens }
    )

    experimentDataRef.current[current] = input

    if (current < totalQuestions - 1) {
      setCurrent(current + 1)
      setInput(experimentDataRef.current[current + 1] || '')
      setAttemptedSubmit(false)
      return
    }

    // — Final submission: compute all token‐based accuracies —
    const time = new Date()
    const accuracies = rawTemplates.map((tmpl, idx) => {
      const expT = getExpectedTokens(tmpl)
      const actT = tokenizeInputString(experimentDataRef.current[idx] || '')
      const d = levenshteinDistanceArray(expT, actT)
      const m = Math.max(expT.length, actT.length)
      return m > 0 ? (1 - d / m) * 100 : 100
    })
    const overallAccuracy =
      accuracies.reduce((sum, v) => sum + v, 0) / totalQuestions

    setSurveyMetrics({
      accuracy: overallAccuracy,
      test_accuracy: accuracies,
      time,
    })

    try {
      await axios.post(`${apiUrl}/marcos`, {
        yearsProgramming: surveyData.yearsProgramming,
        age: surveyData.age,
        sex: surveyData.sex,
        language: surveyData.language,
        email: surveyData.email,
        accuracy: overallAccuracy,
        task_accuracy: accuracies,
        time,
        group: selectedGroup,
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

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1)
      setInput(experimentDataRef.current[current - 1] || '')
      setAttemptedSubmit(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {!started ? (
        <ReadyScreen
          det={detMap[selectedGroup]}
          onStart={handleStart}
        />
      ) : (
        <QuestionScreen
          question={question}
          current={current}
          total={totalQuestions}
          input={input}
          onChange={setInput}
          onBack={handleBack}
          onNext={handleNext}
          attemptedSubmit={attemptedSubmit}
        />
      )}
    </div>
  )
}

export default ExperimentPage
