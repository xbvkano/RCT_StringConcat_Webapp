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
import { buildQuestionSet, QuestionItem, GroupKey, groups } from './components/ultilities/questionsTemplates'

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
  ids?: string[]
  test_accuracy?: boolean[]
  durations?: number[]
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

  const [questions, setQuestions] = useState<QuestionItem[]>([])
  const [assignmentId, setAssignmentId] = useState(0)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    async function fetchAllGroupQuestions() {
      const responses = await Promise.all(
        Object.values(GroupEnum)
          .filter(id => typeof id === 'number')
          .map(async (groupId) => {
            const groupKey = groupMap[groupId as GroupEnum];
            const question_size = groups[groupKey].templates.length;
            const syntax_size = groups[groupKey].syntaxes.length;

            const response = await axios.get(`${apiUrl}/marcos/next-group`, {
              params: {
                question_size,
                syntax_size,
                group_id: groupId,
              },
            });

            const { questionArray, syntaxArray, assignmentId } = response.data;

            const questions = buildQuestionSet(groupKey, questionArray, syntaxArray);

            return { questions, assignmentId };
          })
      );

      return responses;
    }

    async function loadQuestions() {
      try {
        const results = await fetchAllGroupQuestions();

        const allQuestions = results.flatMap(r => r.questions);

        setQuestions(allQuestions);
        setAssignmentId(results[0]?.assignmentId || 0);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [])

  const renderPage = () => {
    switch (page) {
      case PAGES.landing:
        return <LandingPage setPage={setPage} />
      case PAGES.info:
        return <InfoPage setPage={setPage} />
      case PAGES.survey:
        return <SurveyPage setPage={setPage} surveyData={surveyDataRef.current} setSurveyData={data => { surveyDataRef.current = data }} />
      case PAGES.training:
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
            idsRef={idsRef}
            durationsRef={durationsRef}
            accuracyRef={accuracyRef}
            questions={questions}
            assignmentId={assignmentId}
            setSurveyMetrics={({ ids, accuracyArray, durations }) => {
              surveyDataRef.current = {
                ...surveyDataRef.current,
                ids,
                test_accuracy: accuracyArray,
                durations,
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
        return <ThankYouPage setPage={setPage} surveyData={surveyDataRef.current} />
      case PAGES.explain:
        return <ExplainPage setPage={setPage} />
      default:
        return <LandingPage setPage={setPage} />
    }
  }

  return <CenteredPaper>{renderPage()}</CenteredPaper>
}

export default App
