import React, { FC, ReactNode } from 'react';

interface CenteredPaperProps {
  children: ReactNode;
}

const CenteredPaper: FC<CenteredPaperProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800">
      <div className="w-[50vw] h-[100vh] bg-gray-900  shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default CenteredPaper;
