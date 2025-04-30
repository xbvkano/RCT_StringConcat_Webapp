import React, { useState, useEffect } from 'react';
import { PageKey, PAGES, SurveyData } from './../../../App';
import { ProgrammingLanguageMap }  from './../../../../../shared/languageOptions';

interface SurveyPageProps {
  setPage: () => void;
  backPage: () => void;
  surveyData: SurveyData;
  setSurveyData: (data: SurveyData) => void;
}

const SurveyPage: React.FC<SurveyPageProps> = ({ setPage, surveyData, setSurveyData, backPage }) => {
  const [form, setForm] = useState(surveyData);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.yearsProgramming.trim() !== '' &&
    form.age.trim() !== '' &&
    form.sex.trim() !== '' &&
    form.language.trim() !== '';

  const handleNext = () => {
    if (isValid) {
      setSurveyData(form);
      setPage(); // or your next page
    } else {
      setAttemptedSubmit(true);
    }
  };

  useEffect(() => {
    setForm(surveyData); // preload data when returning
  }, [surveyData]);

  const getFieldClass = (field: keyof SurveyData): string => {
    // If the form hasn’t loaded yet, show the neutral style
    if (!form) return 'border-gray-600';
  
    // Read the value safely
    const value = form[field];
  
    // Only string fields can be trimmed; everything else is treated as “filled”
    const isBlank =
      typeof value === 'string' ? value.trim().length === 0 : false;
  
    return attemptedSubmit && isBlank ? 'border-red-500' : 'border-gray-600';
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {/* Back Button */}
      <div className="w-full flex justify-start mb-4">
        <button
          className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 hover:text-white transition-colors border border-white/20 shadow-sm"
          onClick={() => backPage()}
        >
          ←
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-white text-center mb-8 border-b border-gray-700 pb-2">
        Survey
      </h1>

      {/* Form */}
      <form className="w-full max-w-md text-white space-y-4">
        <div>
          <label className="block mb-1">
            Years programming <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="yearsProgramming"
            value={form.yearsProgramming}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${getFieldClass('yearsProgramming')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${getFieldClass('age')} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label className="block mb-1">
            Sex <span className="text-red-500">*</span>
          </label>
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${getFieldClass('sex')}`}
          >
            <option value="">Select</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Preferred Language <span className="text-red-500">*</span>
          </label>
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${getFieldClass('language')}`}
          >
            <option value="">Select</option>
            {Object.entries(ProgrammingLanguageMap).map(([key, label]) => (
              <option key={key} value={label}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Email for raffle (optional)</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className={`mt-10 py-2 px-6 font-semibold rounded shadow-md transition-all ${
          isValid
            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default SurveyPage;
