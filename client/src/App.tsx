// src/App.tsx
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import CenteredPaper from './components/paper'
import LandingPage from './components/pages/landing'
import InfoPage from './components/pages/information'
import SurveyPage from './components/pages/survey'
import TrainingPage from './components/pages/training'
import ExperimentPage from './components/pages/experiment'
import ThankYouPage from './components/pages/thankyou'
import ExplainPage from './components/pages/explain'
import { ProgrammingLanguage } from '../../shared/languageOptions'

// ← Import the within-subject generator:
import { generateWithinSubjectQuestions } from './components/ultilities/questionsTemplates'

export const PAGES = {
  landing: 'landing',
  info: 'info',
  survey: 'survey',
  training: 'training',
  experiment: 'experiment',
  thankyou: 'thankyou',
  explain: 'explain',
} as const
export type PageKey = keyof typeof PAGES

export interface SurveyData {
  yearsProgramming: string
  age: string
  sex: string
  language: ProgrammingLanguage | ''
  email: string
  accuracy?: number
  test_accuracy?: number[]
  durationMs?: number
}

const apiUrl = import.meta.env.VITE_API_URL

function App() {
  const [page, setPage] = useState<PageKey>(PAGES.landing)

  // Persisted survey data
  const surveyDataRef = useRef<SurveyData>({
    yearsProgramming: '',
    age: '',
    sex: '',
    language: '',
    email: '',
  })

  // Persisted experiment answers
  const experimentDataRef = useRef<string[]>([])

  // Questions & assignment state
  const [questions, setQuestions] = useState<string[]>([])
  const [assignmentId, setAssignmentId] = useState(0)
  const [loading, setLoading] = useState(true)
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true

    axios
      .get<{ assignmentId: string }>(`${apiUrl}/marcos/next-group`)
      .then((resp) => {
        setAssignmentId(parseInt(resp.data.assignmentId, 10))
      })
      .catch((err) => {
        console.error('Error fetching assignment:', err)
      })
      .finally(() => {
        // ← Generate your 10 within‐subject prompts here. You can pass any count.
        setQuestions(generateWithinSubjectQuestions(10))
        setLoading(false)
      })
  }, [])

  const renderPage = () => {
    switch (page) {
      case PAGES.landing:
        return <LandingPage setPage={setPage} />

      case PAGES.info:
        return <InfoPage setPage={setPage} />

      case PAGES.survey:
        return (
          <SurveyPage
            setPage={setPage}
            surveyData={surveyDataRef.current}
            setSurveyData={(data) => {
              surveyDataRef.current = data
            }}
          />
        )

      case PAGES.training:
        // ← training is totally unchanged
        return <TrainingPage setPage={setPage} />

      case PAGES.experiment:
        if (loading) {
          return <div className="text-center p-8">Loading…</div>
        }
        return (
          <ExperimentPage
            setPage={setPage}
            surveyData={surveyDataRef.current}
            experimentDataRef={experimentDataRef}
            questions={questions}
            assignmentId={assignmentId}
            setSurveyMetrics={({ accuracy, test_accuracy, durationMs }) => {
              surveyDataRef.current = {
                ...surveyDataRef.current,
                accuracy,
                test_accuracy,
                durationMs,
              }
            }}
            clearSurveyData={() => {
              surveyDataRef.current = {
                yearsProgramming: '',
                age: '',
                sex: '',
                language: '',
                email: '',
              }
            }}
          />
        )

      case PAGES.thankyou:
        return (
          <ThankYouPage
            setPage={setPage}
            surveyData={surveyDataRef.current}
          />
        )

      case PAGES.explain:
        return <ExplainPage setPage={setPage} />

      default:
        return <LandingPage setPage={setPage} />
    }
  }

  return <CenteredPaper>{renderPage()}</CenteredPaper>
}

export default App
