"use client";
import React, { useState, useEffect } from "react";
import QCMAnswerGrid from "@/components/grid/QCMAnswerGrid";
import PuzzleAnswerGrid from "@/components/grid/PuzzleAnswerGrid";
import { socket } from "@/utils/socket";
import { useRouter, useSearchParams } from "next/navigation";

type QuestionType = "Question à choix multiple" | "Vrai/Faux" | "Puzzle";

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
  const [questionType, setQuestionType] = useState<QuestionType>("Question à choix multiple");
  const [question, setQuestion] = useState<string>("test");
  const [answers, setAnswers] = useState<QCMAnswerOption[]>([]);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizLength, setQuizLength] = useState<number>(0);

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
    Puzzle: {
      question: "Classez ces villes de la plus au nord à la plus au sud :",
      options: ["Lille", "Paris", "Lyon", "Marseille"],
    },
  };

  useEffect(() => {
    if (questionType === "Puzzle") {
      setRankingOrder(Array.from({ length: questionData.Puzzle.options.length }, (_, i) => i));
    }
  }, [questionType]);

  useEffect(() => {
    socket.on("game:question", ({ question, timer, questionIndex, answer, type, currentIndex, quizLength }) => {
      console.log("Received question:", currentIndex, quizLength);
      setAnswers(question.options || []);
      setQuestion(question.content || "");
      setTimer(timer);
      setWaiting(false);
      setSelectedIdx(null);
      setGameEnded(false);
      setQuestionType(question.type.name);
      setCurrentQuestionIndex(currentIndex);
      setQuizLength(quizLength);
      console.log(questionType)
      console.log(question.type.name)
      if (type === "Puzzle") {
        setRankingOrder(Array.from({ length: question.options.length }, (_, i) => i));
      }
    });
    socket.on("game:wait", () => setWaiting(true));
    socket.on("game:end", () => {
      setGameEnded(true);
      router.push(`/scoreboard?game=${game}`);
    });
    return () => {
      socket.off("game:question");
      socket.off("game:wait");
      socket.off("game:end");
    };
  }, [game, router]);

  const handleAnswer = (answer: number | number[]) => {
    if (questionType === "Puzzle") {
      socket.emit("game:answer", { gameUuid: game, answer: rankingOrder });
    } else {
      socket.emit("game:answer", { gameUuid: game, answer });
      if (typeof answer === "number") setSelectedIdx(answer);
    }
    setWaiting(true);
  };

  const renderAnswers = () => {
    if (waiting) {
      return (
        <div className="text-xl font-semibold mt-8">
          En attente des autres réponses...
        </div>
      );
    }

    if (questionType === "Question à choix multiple" || questionType === "Vrai/Faux") {
      return (
        <QCMAnswerGrid
          handleAnswer={handleAnswer}
          answers={answers}
          selectedIdx={selectedIdx}
        />
      );
    }

    if (questionType === "Puzzle") {
      return (
        <>
          <PuzzleAnswerGrid
            options={answers.length ? answers.map(a => a.content) : questionData.Puzzle.options}
            selectedOrder={rankingOrder}
            onReorder={setRankingOrder}
          />
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
            onClick={() => handleAnswer(rankingOrder)}
          >
            Valider
          </button>
        </>
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
        {waiting ? "En attente..." : `Question ${currentQuestionIndex} / ${quizLength}`}
      </div>
    </div>
  );
};

export default GameQuestion;
