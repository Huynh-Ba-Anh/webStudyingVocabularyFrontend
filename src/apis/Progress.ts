import { FillExercise, Progress } from "../shared/ts/interface/progress";
import { Results } from "../shared/ts/types/fillExercises";
import axiosClient from "./axiosClient";

export const progressApi = {
  createProgress: (): Promise<Progress> => axiosClient.post("/progresses"),

  getFillExercise: (progressId: string): Promise<FillExercise> =>
    axiosClient.get(`/progresses/fill-Exercise/${progressId}`),

  submitExercise: (
    progressId: string,
    answers: { questionId: string; userAnswer: string }[]
  ): Promise<Results> =>
    axiosClient.post(`/progresses/submit/${progressId}`, { answers }),
};
