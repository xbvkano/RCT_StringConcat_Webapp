import React from 'react';
import { PAGES, PageKey } from '../../../App'; // Adjust the import path as necessary

interface InfoPageProps {
  setPage: (page: PageKey) => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ setPage }) => {
  return (
    
      <div className="flex flex-col h-full w-full items-center justify-between p-6">
         {/* Top Row: Back button */}
        <div className="w-full flex justify-start mb-4">
        <button
            className="text-white text-xl px-3 py-1 rounded hover:bg-blue-700 hover:text-white transition-colors border border-white/20 shadow-sm"
          aria-label="Go back"
          onClick={() => setPage(PAGES.landing)}
        >
            ←
        </button>
        </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-white tracking-tight text-center mt-8 mb-4 border-b border-gray-700 pb-2">
        Information Page
      </h1>

      {/* Top paragraph */}
        <p className="text-white text-md max-w-2xl text-center mb-6">
                Before we begin the training, we’d like to introduce you to the different types of indicators and special characters you may encounter in code.
              During the training and experiment, you'll have access to the special characters list at all times. However,
              the indicator list will only be available initially and will later be removed. Your group will be tested on just one type of indicator,
              so you'll have plenty of time to get familiar with it.
        </p>

      {/* Grid layout */}
      <div className="text-white text-lg max-w-4xl mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left column: Special characters */}
        <div className="text-left">
          <p className="mb-3 font-semibold underline underline-offset-4">Special Characters:</p>
          <ul className="space-y-2">
            {[
              ['n', 'Newline'],
              ['t', 'Tab'],
              ['\\', 'Backslash'],
              ['"', 'Double Quote'],
              ["'", 'Single Quote'],
              ['0', 'Null Character'],
            ].map(([symbol, label]) => (
              <li key={symbol} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">🔹</span>
                <span>
                  <code>{symbol}</code> — {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: Indicator styles */}
        <div className="text-right">
          <p className="mb-3 font-semibold underline underline-offset-4">Indicator Styles:</p>
          <ul className="space-y-2">
            {[
              ['\\SPECIAL', 'Backslash prefix'],
              ["'SPECIAL'", 'Single quotes'],
              ['"SPECIAL"', 'Double quotes'],
              ['`${SPECIAL}`', 'Template literal'],
              ['\\\\SPECIAL', 'Escaped prefix'],
              ['`SPECIAL`', 'Backticks (raw string)'],
              ['<SPECIAL>', 'Angle brackets'],
              ['$SPECIAL', 'Dollar sign'],
              ['~SPECIAL~', 'Tilde-wrapped abbreviation'],
                ['#SPECIAL', 'Hash-prefixed label'],
                ['/ \\ < >SPECIAL', 'Tag slash'],
            ].map(([code, label]) => (
              <li key={code} className="flex justify-end items-start gap-2">
                <span className="text-left">
                  {label} — <code>{code}</code>
                </span>
                <span className="text-blue-400 mt-1">🔹</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mt-10 mb-6 shadow-lg transition-all"
      onClick={() => setPage(PAGES.survey)}>
        Get Started
      </button>
    </div>
  );
};

export default InfoPage;
