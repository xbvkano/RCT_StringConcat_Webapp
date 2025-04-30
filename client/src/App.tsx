// src/App.tsx
import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import CenteredPaper from './components/paper'
import LandingPage from './components/pages/landing'
import InfoPage from './components/pages/information'
import SurveyPage from './components/pages/survey'
import ThankYouPage from './components/pages/thankyou'
import ExplainNewline from './components/pages/explain/explainNewLine'
import ExplainTab from './components/pages/explain/explainTab'
import { ProgrammingLanguage } from '../../shared/languageOptions'
import {
  buildQuestionSet,
  GroupKey,
  groups,
} from './components/ultilities/questionsTemplates'
import Treatment, { TreatmentStep } from './components/pages/treatment'

export const PAGES = {
  landing: 'landing',
  info: 'info',
  survey: 'survey',
  treatment: 'treatment',
  thankyou: 'thankyou',
} as const
export type PageKey = keyof typeof PAGES

export interface SurveyData {
  yearsProgramming: string
  age: string
  sex: string
  language: ProgrammingLanguage | ''
  email: string
  ids?: string[]
  test_accuracy?: boolean[]
  durations?: number[]
  totalTime?: number
  overallAccuracy?: number
}

export enum GroupEnum {
  newline = 1,
  tab = 2,
}

const apiUrl = import.meta.env.VITE_API_URL

const groupMap: Record<GroupEnum, GroupKey> = {
  [GroupEnum.newline]: 'newline',
  [GroupEnum.tab]: 'tab',
}

function App() {
  const [page, setPage] = useState<PageKey>(PAGES.landing)

  const surveyDataRef = useRef<SurveyData>({
    yearsProgramming: '',
    age: '',
    sex: '',
    language: '',
    email: '',
  })
  const experimentDataRef = useRef<string[]>([])
  const idsRef = useRef<string[]>([])
  const accuracyRef = useRef<boolean[]>([])
  const durationsRef = useRef<number[]>([])

  const [treatments, setTreatments] = useState<TreatmentStep[]>([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    async function fetchAllGroupQuestions(): Promise<TreatmentStep[]> {
      const steps = await Promise.all(
        Object.values(GroupEnum)
          .filter(id => typeof id === 'number')
          .map(async (groupId) => {
            const groupKey = groupMap[groupId as GroupEnum]
            const question_size = groups[groupKey].templates.length
            const syntax_size = groups[groupKey].syntaxes.length

            const { data } = await axios.get(`${apiUrl}/marcos/next-group`, {
              params: { question_size, syntax_size, group_id: groupId },
            })

            const { questionArray, syntaxArray, assignmentIds } = data
            const ExplainComponent =
              groupId === GroupEnum.newline ? ExplainNewline : ExplainTab

            return {
              ExplainComponent,
              questions: buildQuestionSet(
                groupKey,
                questionArray,
                syntaxArray
              ),
              assignmentIds,
            }
          })
      )
      return steps
    }

    fetchAllGroupQuestions()
      .then(setTreatments)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const renderPage = () => {
    switch (page) {
      case PAGES.landing:
        return <LandingPage setPage={() => setPage(PAGES.info)} />
      case PAGES.info:
        return <InfoPage setPage={() => setPage(PAGES.survey)} backPage={() => setPage(PAGES.landing)} />
      case PAGES.survey:
        return (
          <SurveyPage
            setPage={() => setPage(PAGES.treatment)}
            backPage={() => setPage(PAGES.info)}
            surveyData={surveyDataRef.current}
            setSurveyData={data => {
              surveyDataRef.current = data
            }}
          />
        )
      case PAGES.treatment:
        if (loading) {
          return <div className="text-center p-8">Loading…</div>
        }
        return (
          <Treatment
            steps={treatments}
            surveyDataRef={surveyDataRef}
            experimentDataRef={experimentDataRef}
            idsRef={idsRef}
            durationsRef={durationsRef}
            accuracyRef={accuracyRef}
            onFinish={() => setPage(PAGES.thankyou)}
          />
        )
      case PAGES.thankyou:
        return (
          <ThankYouPage
            setPage={() => setPage(PAGES.landing)}
            surveyData={{
              ...surveyDataRef.current,
              ids: surveyDataRef.current.ids ?? [],
              test_accuracy: surveyDataRef.current.test_accuracy ?? [],
              durations: surveyDataRef.current.durations ?? [],
              totalTime: surveyDataRef.current.totalTime ?? 0,
              overallAccuracy: surveyDataRef.current.overallAccuracy ?? 0,
            }}
            assignmentIds={treatments.flatMap(t => t.assignmentIds)}
          />
        )
      default:
        return <LandingPage setPage={() => setPage(PAGES.info)} />
    }
  }

  return <CenteredPaper>{renderPage()}</CenteredPaper>
}

export default App
