"use client";

import { useState } from "react";
import { finishTest } from "../actions/finishTest";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";

type Props = {
  testId: string;
  questions: any[];
};

const QuestionView = ({ testId, questions }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; optionId: string }[]
  >([]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (optionId: string) => {
    const updatedAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        optionId,
      },
    ];

    setAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishTest(testId, updatedAnswers);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-center">
      <h2 className="text-xl">{currentQuestion.questionText}</h2>
      <div className="flex flex-col gap-3 mt-4">
        {currentQuestion.options.map((option: any) => (
          <PrimaryButton
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className=""
          >
            {option.optionText}
          </PrimaryButton>
        ))}
      </div>
      <div className="text-sm text-gray-500 mt-6">
        {currentIndex + 1} / {questions.length}
      </div>
    </div>
  );
};

export default QuestionView;
