import { FillExercies } from "../types/fillExercises";

export interface ExerciseAnswer {
  questionId: string;
  userAnswer: string;
}

export interface ExerciseResult {
  question: string;
  answer: string;
  userAnswer: string;
  correct: boolean;
  vocabulary_id: string;
}

export interface Progress {
  _id: string;
  user_id: string;
  vocabulary_id: string[];
  createdAt: string;
  __v: number;
}

export interface FillExercise {
  exercises: FillExercies[];
}
