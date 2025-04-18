// src/components/pages/thankyou.tsx
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { PageKey, SurveyData, PAGES } from './../../../App';

const apiUrl = import.meta.env.VITE_API_URL;

interface ThankYouPageProps {
  setPage: (page: PageKey) => void;
  surveyData: SurveyData;
  clearSurveyData: () => void;    // ← we’ll add this
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({
  setPage,
  surveyData,
  clearSurveyData,
}) => {
  const didSend = useRef(false);

  useEffect(() => {
    if (didSend.current) return;
    didSend.current = true;

    (async () => {
      try {
        await axios.post(`${apiUrl}/marcos`, {
          yearsProgramming: surveyData.yearsProgramming,
          age:                 surveyData.age,
          sex:                 surveyData.sex,
          language:            surveyData.language,
          email:               surveyData.email,
          accuracy:            surveyData.accuracy,
          task_accuracy:       surveyData.test_accuracy,
          time:                surveyData.time,
        });
        console.log('✅ Survey data successfully submitted');
      } catch (error) {
        console.error('❌ Error submitting survey data:', error);
      } finally {
        clearSurveyData();
      }
    })();
  }, []);  // ← only on mount, plus our ref guard covers StrictMode

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white text-center mb-6">
        Thank You!
      </h1>

      <p className="text-white text-md text-center max-w-xl mb-8">
        We sincerely appreciate your participation in this experiment.
        Your input is valuable and helps us better understand how people interpret special character syntax in programming.
      </p>

      <button
        onClick={() => setPage(PAGES.landing)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
