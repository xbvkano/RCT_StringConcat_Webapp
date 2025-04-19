// src/components/pages/ExperimentPage.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PageKey, PAGES, SurveyData } from './../../../App';
import {QuestionProps, QuestionScreen} from "./components/questionScreen"
import { AssignmentScreen } from "./components/AssigmentScreen"

import {
  backslashDet,
  singleQuoteDet,
  doubleQuoteDet,
  templateLiteralDet,
  escapedPrefixDet,
  angleDet,
  dollarSignDet,
  tildeDet,
  hashPrefixDet,
  tagSlashDet,
  backtickDet,
  hashSuffixDet,
  templates,
  applyDet,
  Determinant,
} from './components/questionsTemplates';

const apiUrl = import.meta.env.VITE_API_URL;

export enum DetGroup {
  Backslash = 'Backslash',
  SingleQuote = 'SingleQuote',
  DoubleQuote = 'DoubleQuote',
  TemplateLiteral = 'TemplateLiteral',
  EscapedPrefix = 'EscapedPrefix',
  AngleBracket = 'AngleBracket',
  DollarSign = 'DollarSign',
  TildeWrapped = 'TildeWrapped',
  HashPrefix = 'HashPrefix',
  TagSlash = 'TagSlash',
  BacktickDet = 'BacktickDet',
  HashSuffix = 'HashSuffix',
}

const detMap: Record<DetGroup, Determinant> = {
  [DetGroup.Backslash]: backslashDet,
  [DetGroup.SingleQuote]: singleQuoteDet,
  [DetGroup.DoubleQuote]: doubleQuoteDet,
  [DetGroup.TemplateLiteral]: templateLiteralDet,
  [DetGroup.EscapedPrefix]: escapedPrefixDet,
  [DetGroup.AngleBracket]: angleDet,
  [DetGroup.DollarSign]: dollarSignDet,
  [DetGroup.TildeWrapped]: tildeDet,
  [DetGroup.HashPrefix]: hashPrefixDet,
  [DetGroup.TagSlash]: tagSlashDet,
  [DetGroup.BacktickDet]: backtickDet,
  [DetGroup.HashSuffix]: hashSuffixDet,
};

function levenshteinDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: b.length + 1 }, () => []);
  for (let i = 0; i <= b.length; i++) {
    dp[i] = Array(a.length + 1).fill(0);
    dp[i][0] = i;
  }
  for (let j = 0; j <= a.length; j++) dp[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      dp[i][j] =
        b[i - 1] === a[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[b.length][a.length];
}

// Loading indicator
const Loading: React.FC = () => (
  <p className="text-center text-white">Loading...</p>
);


interface ExperimentPageProps {
  setPage: (page: PageKey) => void;
  surveyData: SurveyData;
  experimentDataRef: React.MutableRefObject<string[]>;
  setSurveyMetrics: (metrics: {
    accuracy: number;
    test_accuracy: number[];
    time: Date;
  }) => void;
  clearSurveyData: () => void;
}

const ExperimentPage: React.FC<ExperimentPageProps> = ({
  setPage,
  surveyData,
  experimentDataRef,
  setSurveyMetrics,
  clearSurveyData,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<DetGroup | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const fetchOnce = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (fetchOnce.current) return;
    fetchOnce.current = true;
    axios
      .get<{ group: DetGroup }>(`${apiUrl}/marcos/next-group`)
      .then(({ data }) => {
        setSelectedGroup(data.group);
        setQuestions(applyDet(detMap[data.group], templates));
      })
      .catch((err) => console.error('Error fetching next group:', err));
  }, []);

  if (!selectedGroup) return <Loading />;

  const det = detMap[selectedGroup];
  const totalQuestions = questions.length;
  const question = questions[current];

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setStarted(true);
  };

  const handleNext = async () => {
    if (!started || input.trim() === '') {
      setAttemptedSubmit(true);
      return;
    }
    experimentDataRef.current[current] = input;
    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
      setInput(experimentDataRef.current[current + 1] || '');
      setAttemptedSubmit(false);
      return;
    }

    const time = new Date();
    const accuracies = questions.map((q, idx) => {
      const exp = q;
      let act = experimentDataRef.current[idx] || '';
      act = act.replace(/\r\n/g, '\n').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
      if (exp === act) return 100.0;
      const dist = levenshteinDistance(exp, act);
      const maxLen = Math.max(exp.length, act.length);
      return maxLen > 0 ? (1 - dist / maxLen) * 100 : 100.0;
    });
    const overallAccuracy = accuracies.reduce((s, v) => s + v, 0) / totalQuestions;

    setSurveyMetrics({ accuracy: overallAccuracy, test_accuracy: accuracies, time });
    try {
      await axios.post(`${apiUrl}/marcos`, {
        yearsProgramming: surveyData.yearsProgramming,
        age: surveyData.age,
        sex: surveyData.sex,
        language: surveyData.language,
        email: surveyData.email,
        accuracy: overallAccuracy,
        task_accuracy: accuracies,
        time,
        group: selectedGroup,
      });
      // clear all data for next pass
      experimentDataRef.current = [];
      setInput('');
    } catch (e) {
      console.error('Submit error', e);
    } finally {
      clearSurveyData();
      setPage(PAGES.thankyou);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setInput(experimentDataRef.current[current - 1] || '');
      setAttemptedSubmit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {!started ? (
        <AssignmentScreen det={det} onStart={handleStart} />
      ) : (
        <QuestionScreen
          question={question}
          current={current}
          total={totalQuestions}
          input={input}
          onChange={setInput}
          onBack={handleBack}
          onNext={handleNext}
          attemptedSubmit={attemptedSubmit}
        />
      )}
    </div>
  );
};

export default ExperimentPage;
