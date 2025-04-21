import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import CenteredPaper from './components/paper'
import InfoPage from './components/pages/information'
import LandingPage from './components/pages/landing'
import SurveyPage from './components/pages/survey'
import NotFoundPage from './components/pages/notFound'
import TrainingPage from './components/pages/training'
import ExperimentPage from './components/pages/experiment'
import ThankYouPage from './components/pages/thankyou'
import ExplainPage from './components/pages/explain'
import { ProgrammingLanguage } from './../../shared/languageOptions'
import { templates as rawTemplates, applyDet, DetGroup, detMap } from './components/ultilities/questionsTemplates'

export const PAGES = {
  landing: 'landing',
  info: 'info',
  survey: 'survey',
  training: 'training',
  experiment: 'experiment',
  thankyou: 'thankyou',
  explain: 'explain'
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
  time?: Date
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

  // ─── Lifted experiment state ────────────────────────────────
  const [selectedGroup, setSelectedGroup] = useState<DetGroup | null>(null)
  const [questions, setQuestions] = useState<string[]>([])
  const [loadingGroup, setLoadingGroup] = useState(true)
  const fetchOnce = useRef(false)
  useEffect(() => {
    if (fetchOnce.current) return
    fetchOnce.current = true
    axios
      .get<{ group: DetGroup }>(`${apiUrl}/marcos/next-group`)
      .then(({ data }) => {
        setSelectedGroup(data.group)
        setQuestions(applyDet(detMap[data.group], rawTemplates))
      })
      .catch((err) => console.error('Error fetching group:', err))
      .finally(() => setLoadingGroup(false))
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
        return <TrainingPage setPage={setPage} selectedGroup={selectedGroup as DetGroup}/>

      case PAGES.experiment:
        if (loadingGroup) {
          return <div className="text-center p-8">Loading…</div>
        }
        return (
          <ExperimentPage
            setPage={setPage}
            surveyData={surveyDataRef.current}
            experimentDataRef={experimentDataRef}
            selectedGroup={selectedGroup as DetGroup}
            questions={questions}
            setSurveyMetrics={({ accuracy, test_accuracy, time }) => {
              surveyDataRef.current = {
                ...surveyDataRef.current,
                accuracy,
                test_accuracy,
                time,
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
        return (
          <ExplainPage setPage={setPage}/>
        )
      
      default:
        return <NotFoundPage setPage={setPage} />
    }
  }

  return <CenteredPaper>{renderPage()}</CenteredPaper>
}

export default App
