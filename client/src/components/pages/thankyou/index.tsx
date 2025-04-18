import React, { useEffect } from 'react';
import axios from 'axios';
import { PageKey, SurveyData, PAGES } from './../../../App';

const apiUrl = import.meta.env.VITE_API_URL;


interface ThankYouPageProps {
  setPage: (page: PageKey) => void;
  surveyData: SurveyData;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ setPage, surveyData }) => {
  useEffect(() => {
    const sendSurveyData = async () => {
      try {
        await axios.post(`${apiUrl}/marcos`, {
          yearsProgramming: surveyData.yearsProgramming,
          age: surveyData.age,
          sex: surveyData.sex,
          language: surveyData.language,
          email: surveyData.email,
          accuracy: surveyData.accuracy,
          task_accuracy: surveyData.test_accuracy,
          time: surveyData.time,
        });
        console.log('✅ Survey data successfully submitted');
      } catch (error) {
        console.error('❌ Error submitting survey data:', error);
      }
    };

    sendSurveyData();
  }, [surveyData]);

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
