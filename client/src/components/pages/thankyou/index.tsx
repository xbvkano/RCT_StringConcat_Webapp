// src/components/pages/thankyou.tsx
import React, { useEffect } from 'react'
import axios from 'axios'
import { SurveyData } from '../../../App'

const apiUrl = import.meta.env.VITE_API_URL

interface ThankYouPageProps {
  surveyData: SurveyData & {
    ids: string[]
    test_accuracy: boolean[]
    durations: number[]
    totalTime: number
    overallAccuracy: number
  }
  assignmentIds: number[]
  setPage: () => void
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({
  surveyData,
  assignmentIds,
}) => {
  useEffect(() => {
    ;(async () => {
      try {
        const {
          test_accuracy,
          ...rest /* yearsProgramming, age, sex, language, email, ids, durations, totalTime, overallAccuracy */
        } = surveyData

        await axios.post(`${apiUrl}/marcos`, {
          ...rest,
          task_accuracy: test_accuracy,
          assignmentIds,
        })
      } catch (error) {
        console.error('Submit error', error)
      }
    })()
  }, [surveyData, assignmentIds])

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white text-center mb-6">
        Thank You!
      </h1>

      <p className="text-white text-md text-center max-w-xl mb-8">
        We sincerely appreciate your participation in this experiment.
        Your input is valuable and helps us better understand how people interpret special character syntax in programming.
      </p>

    </div>
  )
}

export default ThankYouPage
