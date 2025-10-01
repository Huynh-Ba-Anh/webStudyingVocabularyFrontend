/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, message, Radio, Result } from "antd";
import { progressApi } from "../apis/Progress";
import Title from "antd/es/typography/Title";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FillExercies } from "../shared/ts/types/fillExercises";

export default function Progress() {
  const [fillExercises, setFillExercises] = useState<FillExercies[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [progressId, setProgressId] = useState(String);
  const [results, setResults] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const createProgress = async () => {
    try {
      const response = await progressApi.createProgress();
      const progressId = response._id;

      const getFillExercise = await progressApi.getFillExercise(progressId);
      setFillExercises(getFillExercise.exercises || []);
      setAnswers({});
      setProgressId(progressId);
      setResults(0);
      setCurrentIndex(0);
      setSubmitted(false);
    } catch (error) {
      message.error("Không thể tạo progress");
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleNext = () => {
    if (!answers[currentIndex]) {
      message.warning("Vui lòng chọn đáp án trước khi tiếp tục!");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSubmit = async () => {
    try {
      const answersArray = fillExercises.map((ex, ix) => ({
        questionId: ex.questionId || ex.questionId?.toString(),
        userAnswer: answers[ix] || "",
      }));
      const respon = await progressApi.submitExercise(progressId, answersArray);
      setResults(respon.correctCount);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      message.error("Không thể nộp bài. Vui lòng thử lại.");
    }
  };

  if (fillExercises.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
        <Title level={3} className="mb-8 text-gray-900">
          📝 Bài tập Progress
        </Title>
        <Button
          onClick={createProgress}
          type="primary"
          size="large"
          className="rounded-xl px-6 py-3 text-lg"
        >
          Tạo Progress mới
        </Button>
      </div>
    );
  }

  if (submitted) {
    const isWin = results >= 15;
    return (
      <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
        <Result
          status={isWin ? "success" : "error"}
          title={isWin ? `🎉 Chúc mừng! Bạn trả lời đúng ${results}/${fillExercises.length} câu!` 
                      : `😔 Rất tiếc! Bạn chỉ trả lời đúng ${results}/${fillExercises.length} câu.`}
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={createProgress}
              className="rounded-xl px-6 py-3"
            >
              Làm Progress mới
            </Button>,
          ]}
        />
      </div>
    );
  }

  const currentQuestion = fillExercises[currentIndex];
  const isLast = currentIndex === fillExercises.length - 1;

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <Title level={3} className="mb-8 text-center text-gray-900">
        📝 Bài tập Progress
      </Title>

      <Card className="border rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl bg-white">
        <div className="mb-4">
          <span className="font-semibold text-gray-800 text-lg">
            Câu {currentIndex + 1}/{fillExercises.length}:{currentQuestion.question}
          </span>
        </div>

        <Radio.Group
          onChange={(e) => handleAnswerChange(currentIndex, e.target.value)}
          value={answers[currentIndex] || ""}
          className="flex flex-col gap-2"
        >
          {currentQuestion.options.map((opt, idx) => (
            <Radio key={idx} value={opt} className="text-base">
              {opt}
            </Radio>
          ))}
        </Radio.Group>

        <div className="flex justify-between gap-4 mt-6">
          <Button
            size="large"
            className="rounded-xl border-gray-300 hover:border-gray-400 px-6 py-3"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Câu trước
          </Button>

          {!isLast ? (
            <Button
              type="primary"
              size="large"
              className="rounded-xl px-6 py-3 bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
              onClick={handleNext}
            >
              Câu tiếp theo
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              className="rounded-xl px-6 py-3 bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600"
              onClick={handleSubmit}
            >
              Nộp bài
            </Button>
          )}
        </div>
      </Card>

      <div className="flex justify-center mt-6">
        <Button
          icon={<ReloadOutlined />}
          size="large"
          className="rounded-xl border-gray-300 hover:border-gray-400 px-4"
          onClick={() => setFillExercises([])}
        >
          Làm Progress mới
        </Button>
      </div>
    </div>
  );
}
