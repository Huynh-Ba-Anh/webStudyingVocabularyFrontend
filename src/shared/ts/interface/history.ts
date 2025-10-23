interface IExercise {
    question: string;
    answer: string;
    userAnswer: string;
    correct: boolean;
}

export interface IHistory {
    _id: string;
    createdAt: string;
    correctCount: number;
    totalCount: number;
    exercises: IExercise[];
}
