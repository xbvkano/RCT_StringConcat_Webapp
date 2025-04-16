import React from 'react';
import { Sparkles } from 'lucide-react'; // optional — replace or remove if not using Lucide

interface LandingPageProps {
  setPage: (page: 'landing' | 'info') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-900">
      <h1 className="text-5xl font-extrabold text-white tracking-tight text-center mb-6">
        RCT on Special Characters
      </h1>

       {/* Decorative Icon */}
       <div className="text-blue-400 mb-4">
        <Sparkles className="w-10 h-10 mx-auto animate-pulse" />
      </div>

      <p className="text-white text-md max-w-lg text-center mb-10 leading-relaxed">
        Welcome to our randomized controlled trial on special character understanding.
        In this experiment, you'll be translating strings that contain special formatting into plain text and typing out your translation.
        This helps us understand how different representations affect interpretation.
      </p>

      <button
        onClick={() => setPage('info')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default LandingPage;
