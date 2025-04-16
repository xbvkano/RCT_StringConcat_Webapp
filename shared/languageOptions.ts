export const ProgrammingLanguageMap = {
    cpp: 'C++',
    java: 'Java',
    csharp: 'C#',
    js: 'JS',
    ts: 'TS',
    python: 'Python',
    other: 'Other',
  } as const;
  
  export type ProgrammingLanguageKey = keyof typeof ProgrammingLanguageMap;
  export type ProgrammingLanguage = typeof ProgrammingLanguageMap[ProgrammingLanguageKey];
  