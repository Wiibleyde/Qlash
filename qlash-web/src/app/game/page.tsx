"use client";
import React, { useState, useEffect } from "react";
import QCMAnswerGrid from "@/components/grid/QCMAnswerGrid";
import PuzzleAnswerGrid from "@/components/grid/PuzzleAnswerGrid";
import { socket } from "@/utils/socket";
import { useRouter, useSearchParams } from "next/navigation";

type QuestionType = "QCM" | "Vrai/Faux" | "Classement";

interface QCMAnswerOption {
  content: string;
}

const GameQuestion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get('game');
  const [timer, setTimer] = useState(30);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rankingOrder, setRankingOrder] = useState<number[]>([]);
  const [questionType] = useState<QuestionType>("QCM");
  const [question, setQuestion] = useState<string>("test");
  const [answers, setAnswers] = useState<QCMAnswerOption[]>([]);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const questionData = {
    QCM: {
      question: "Quelle est la capitale de la France ?",
      colors: [
        "bg-red-500",
        "bg-blue-500",
        "bg-yellow-400",
        "bg-green-500",
      ],
    },
    "Vrai/Faux": {
      question: "La Terre est plate.",
      colors: [
        "bg-green-500",
        "bg-red-500",
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

  useEffect(() => {
    socket.on("game:question", ({ question, timer, questionIndex, answer }) => {
      console.log("Received question:", question, "with timer:", timer, "for question index:", questionIndex, "and answer:", answer);
      setAnswers(question.options);
      setQuestion(question.content);
      setTimer(timer);
      setWaiting(false);
    });
    socket.on("game:wait", () => setWaiting(true));
    socket.on("game:end", () => {
      router.push(`/scoreboard?game=${game}`);
    });
    return () => {
      socket.off("game:question");
      socket.off("game:wait");
      socket.off("game:end");
    };
  }, []);

  const handleAnswer = (answer: number) => {
    socket.emit("game:answer", { gameUuid: game, answer });
    setWaiting(true);
  };

  const renderAnswers = () => {
    if (questionType === "QCM" || questionType === "Vrai/Faux") {
      return (
        <QCMAnswerGrid
          handleAnswer={handleAnswer}
          answers={answers}
          selectedIdx={selectedIdx}
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-around bg-white text-black px-4 py-6 relative">
      <div className="absolute top-4 right-6 text-2xl font-bold bg-white text-black px-4 py-2 rounded-full shadow-lg">
        {timer}s
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-12 mt-8">
        {question}
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
