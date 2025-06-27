"use client";
import React, { useState, useEffect } from "react";
import QCMAnswerGrid from "@/components/grid/QCMAnswerGrid";
import PuzzleAnswerGrid from "@/components/grid/PuzzleAnswerGrid";

type QuestionType = "QCM" | "Vrai/Faux" | "Classement";

const GameQuestion = () => {
  const [timer, setTimer] = useState(30);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rankingOrder, setRankingOrder] = useState<number[]>([]);
  const [questionType] = useState<QuestionType>("QCM");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const questionData = {
    QCM: {
      question: "Quelle est la capitale de la France ?",
      answers: [
        { text: "Paris", color: "bg-red-500" },
        { text: "Lyon", color: "bg-blue-500" },
        { text: "Marseille", color: "bg-yellow-400" },
        { text: "Nice", color: "bg-green-500" },
      ],
    },
    "Vrai/Faux": {
      question: "La Terre est plate.",
      answers: [
        { text: "Vrai", color: "bg-green-500" },
        { text: "Faux", color: "bg-red-500" },
      ],
    },
    Classement: {
      question: "Classez ces villes de la plus au nord à la plus au sud :",
      options: ["Lille", "Paris", "Lyon", "Marseille"],
    },
  };

  useEffect(() => {
    if (questionType === "Classement") {
      setRankingOrder(Array.from({ length: questionData.Classement.options.length }, (_, i) => i));
    }
  }, [questionType]);

  const renderAnswers = () => {
    if (questionType === "QCM" || questionType === "Vrai/Faux") {
      const { answers } = questionData[questionType];
      return (
        <QCMAnswerGrid
          answers={answers}
          selectedIdx={selectedIdx}
          onSelect={setSelectedIdx}
        />
      );
    }

    if (questionType === "Classement") {
      return (
        <PuzzleAnswerGrid
          options={questionData.Classement.options}
          selectedOrder={rankingOrder}
          onReorder={setRankingOrder}
        />
      );
    }

    return null;
  };

  const currentQuestion =
    questionData[questionType as keyof typeof questionData].question;

  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-white text-black px-4 py-6 relative">
      <div className="absolute top-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        {timer}s
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 mt-8">
        {currentQuestion}
      </h1>

      <div className="flex flex-col items-center justify-end h-full w-full">
        {renderAnswers()}
      </div>

      <div className="absolute bottom-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        1/10
      </div>
    </div>
  );
};

export default GameQuestion;
