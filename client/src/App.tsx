import React, { useRef, useState } from 'react';
import CenteredPaper from './components/paper';
import InfoPage from './components/pages/information';
import LandingPage from './components/pages/landing';
import SurveyPage from './components/pages/survey';
import NotFoundPage from './components/pages/notFound';
import TrainingPage from './components/pages/training';
import ExperimentPage from './components/pages/experiment';
import ThankYouPageProps from './components/pages/thankyou';

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
  language: string;
  email: string;
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
            setSurveyData={(data) => (surveyDataRef.current = data)}
          />
        );
      case PAGES.training:
        return <TrainingPage setPage={setPage} />;
      case PAGES.experiment:
        return (
          <ExperimentPage
            setPage={setPage}
            experimentDataRef={experimentDataRef}
          />
        );
      case PAGES.thankyou:
        return <ThankYouPageProps setPage={setPage} />;
      default:
        return <NotFoundPage setPage={setPage} />;
    }
  };

  return <CenteredPaper>{renderPage()}</CenteredPaper>;
}

export default App;
