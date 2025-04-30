import React, { useState } from 'react'
import TrainingPage from '../training'
import ExperimentPage from '../experiment'
import { generateMixedTrainingQuestions } from '../../ultilities/questionsTemplates'
import type { QuestionItem } from '../../ultilities/questionsTemplates'
import type { SurveyData } from '../../../App'

export interface TreatmentStep {
  ExplainComponent: React.FC<{ onNext: () => void }>
  questions: QuestionItem[]
  assignmentIds: number[]
}

export interface TreatmentProps {
  steps: TreatmentStep[]
  surveyDataRef: React.MutableRefObject<SurveyData>
  experimentDataRef: React.MutableRefObject<string[]>
  idsRef: React.MutableRefObject<string[]>
  durationsRef: React.MutableRefObject<number[]>
  accuracyRef: React.MutableRefObject<boolean[]>
  onFinish: () => void
}

const Treatment: React.FC<TreatmentProps> = ({
  steps,
  surveyDataRef,
  experimentDataRef,
  idsRef,
  durationsRef,
  accuracyRef,
  onFinish,
}) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<'explain' | 'train' | 'experiment'>(
    'explain'
  )
  const current = steps[stepIndex]

  const handleNext = () => {
    if (phase === 'explain') {
      setPhase('train')
    } else if (phase === 'train') {
      // reset just once before starting this group's experiment
      idsRef.current = []
      durationsRef.current = []
      accuracyRef.current = []
      experimentDataRef.current = []
      setPhase('experiment')
    } else {
      if (stepIndex < steps.length - 1) {
        setStepIndex(i => i + 1)
        setPhase('explain')
      } else {
        onFinish()
      }
    }
  }

  if (phase === 'explain') {
    return <current.ExplainComponent onNext={handleNext} />
  }

  // exercise: filter training only for this group
  const prefix = current.questions[0]?.id.slice(0, 2) ?? ''
  const allTraining = generateMixedTrainingQuestions()
  const trainingQuestions = allTraining.filter(q =>
    q.id.startsWith(prefix)
  )

  if (phase === 'train') {
    return (
      <TrainingPage
        setPage={handleNext}
        trainingQuestions={trainingQuestions}
      />
    )
  }

  // experiment phase: collect & accumulate metrics
  return (
    <ExperimentPage
      setPage={handleNext}
      surveyData={surveyDataRef.current}
      experimentDataRef={experimentDataRef}
      idsRef={idsRef}
      durationsRef={durationsRef}
      accuracyRef={accuracyRef}
      questions={current.questions}
      assignmentIds={current.assignmentIds}
      setSurveyMetrics={({
        ids,
        accuracyArray,
        durations,
        totalTime,
      }) => {
        const prev = surveyDataRef.current
        const combinedIds = [...(prev.ids ?? []), ...ids]
        const combinedAcc = [...(prev.test_accuracy ?? []), ...accuracyArray]
        const combinedDur = [...(prev.durations ?? []), ...durations]
        surveyDataRef.current = {
          ...prev,
          ids: combinedIds,
          test_accuracy: combinedAcc,
          durations: combinedDur,
          totalTime: (prev.totalTime ?? 0) + totalTime,
          overallAccuracy:
            combinedAcc.filter(Boolean).length / combinedAcc.length,
        }
      }}
    />
  )
}

export default Treatment
