import React from 'react';
import { PageKey, PAGES } from './../../../App';

interface NotFoundPageProps {
  setPage: (page: PageKey) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-6 py-10 text-center">
      <h1 className="text-5xl font-extrabold text-white mb-6">Page Not Found</h1>
      <p className="text-white text-md max-w-lg mb-10">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => setPage(PAGES.landing)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-all"
      >
        Return Home
      </button>
    </div>
  );
};

export default NotFoundPage;
