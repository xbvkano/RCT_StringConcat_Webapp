// src/App.tsx

import React, { useRef, useState } from 'react';
import CenteredPaper from './components/paper';
import InfoPage from './components/pages/information';
import LandingPage from './components/pages/landing';
import SurveyPage from './components/pages/survey';
import NotFoundPage from './components/pages/notFound';
import TrainingPage from './components/pages/training';
import ExperimentPage from './components/pages/experiment';
import ThankYouPage from './components/pages/thankyou';
import { ProgrammingLanguage } from './../../shared/languageOptions';

export const PAGES = {
  landing: 'landing',
  info: 'info',
  survey: 'survey',
  training: 'training',
  experiment: 'experiment',
  thankyou: 'thankyou',
} as const;

export type PageKey = keyof typeof PAGES;

export interface SurveyData {
  yearsProgramming: string;
  age: string;
  sex: string;
  language: ProgrammingLanguage | '';
  email: string;
  accuracy?: number;
  test_accuracy?: number[];
  time?: Date;
}

function App() {
  const [page, setPage] = useState<PageKey>(PAGES.landing);

  // Persisted survey data
  const surveyDataRef = useRef<SurveyData>({
    yearsProgramming: '',
    age: '',
    sex: '',
    language: '',
    email: '',
  });

  // Persisted experiment answers
  const experimentDataRef = useRef<string[]>([]);

  const renderPage = () => {
    switch (page) {
      case PAGES.landing:
        return <LandingPage setPage={setPage} />;

      case PAGES.info:
        return <InfoPage setPage={setPage} />;

      case PAGES.survey:
        return (
          <SurveyPage
            setPage={setPage}
            surveyData={surveyDataRef.current}
            setSurveyData={(data) => {
              surveyDataRef.current = data;
            }}
          />
        );

      case PAGES.training:
        return <TrainingPage setPage={setPage} />;

        case PAGES.experiment:
          return (
            <ExperimentPage
              setPage={setPage}
              surveyData={surveyDataRef.current}            // ← add this
              experimentDataRef={experimentDataRef}
              setSurveyMetrics={({ accuracy, test_accuracy, time }) => {
                surveyDataRef.current = {
                  ...surveyDataRef.current,
                  accuracy,
                  test_accuracy,
                  time,
                };
              }}
              clearSurveyData={() => {
                surveyDataRef.current = {
                  yearsProgramming: '',
                  age: '',
                  sex: '',
                  language: '',
                  email: '',
                };
              }}
            />
          );

      case PAGES.thankyou:
        return (
          <ThankYouPage
            setPage={setPage}
            surveyData={surveyDataRef.current}
          />
        );

      default:
        return <NotFoundPage setPage={setPage} />;
    }
  };

  return <CenteredPaper>{renderPage()}</CenteredPaper>;
}

export default App;
