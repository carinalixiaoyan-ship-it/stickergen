
export interface Phrase {
  id: number;
  english: string;
  chinese: string;
  category: string;
}

export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  LEARN = 'LEARN',
  QUIZ = 'QUIZ',
  PRACTICE = 'PRACTICE'
}

export interface Progress {
  masteredIds: number[];
  currentCategory: string | null;
  streak: number;
  lastVisit: string;
}
