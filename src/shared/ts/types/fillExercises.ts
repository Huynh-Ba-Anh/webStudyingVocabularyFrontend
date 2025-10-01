export interface FillExercies {
  questionId: string;
  answer: string;
  question: string;
  options: string[];
}

export interface Results {
  results: string[];
  correctCount: number;
}

export interface SubmitResults {
  vocabulary_id: string;
  answer: string;
  question: string;
  correct: boolean;
  userAnswer: string;
}
