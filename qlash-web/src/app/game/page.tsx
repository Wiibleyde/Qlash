"use client";
import React, { useState, useEffect } from "react";
import QCMAnswerGrid from "@/components/grid/QCMAnswerGrid";
import PuzzleAnswerGrid from "@/components/grid/PuzzleAnswerGrid";
import BuzzerAnswerGrid from "@/components/grid/BuzzerAnswerGrid";
import { socket } from "@/utils/socket";
import { useRouter, useSearchParams } from "next/navigation";

type QuestionType = "Question à choix multiple" | "Vrai/Faux" | "Puzzle" | "Buzzer";

interface QCMAnswerOption {
  id: string;
  content: string;
}

interface Player {
  username: string;
  socketId?: string;
  score: number;
}

const GameQuestion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get("game");
  const [timer, setTimer] = useState(30);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rankingOrder, setRankingOrder] = useState<string[]>([]);
  const [questionType, setQuestionType] = useState<QuestionType>("Question à choix multiple");
  const [question, setQuestion] = useState<string>("test");
  const [answers, setAnswers] = useState<QCMAnswerOption[]>([]);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizLength, setQuizLength] = useState<number>(0);

  const [players, setPlayers] = useState<Player[]>([]);
  const [playerBuzzed, setPlayerBuzzed] = useState<string>("");
  const [hasBuzzed, setHasBuzzed] = useState(false);
  const [buzzerAnswerInput, setBuzzerAnswerInput] = useState("");

  const handleBuzz = () => {
    if (!hasBuzzed) {
      setHasBuzzed(true);
      socket.emit("game:buzzed", { gameUuid: game });
    }
  };

  const handleBuzzerAnswerChange = (val: string) => {
    setBuzzerAnswerInput(val);
  };

  const handleSubmitBuzzerAnswer = () => {
    if (buzzerAnswerInput.trim() === "") return;

    socket.emit("game:answer", { gameUuid: game, answer: buzzerAnswerInput });
    setWaiting(true);
    setHasBuzzed(false);
    setBuzzerAnswerInput("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    socket.on("game:question", ({ question, timer, answers: answersFromServer, currentIndex, quizLength, players: playersFromServer }) => {
      setPlayerBuzzed("");
      setPlayers(playersFromServer);
      setAnswers(answersFromServer);
      setQuestion(question.content);
      setTimer(timer);
      setWaiting(false);
      setSelectedIdx(null);
      setQuestionType(question.type.name);
      setCurrentQuestionIndex(currentIndex);
      setQuizLength(quizLength);
      if (question.type.name === "Puzzle" && question.options) {
        console.log("Setting ranking order for Puzzle type", question.options);
        setRankingOrder(answersFromServer.map((opt: QCMAnswerOption) => opt.id));
      }
    });
    socket.on("game:wait", () => setWaiting(true));
    socket.on("game:buzzer:wait", (data) => {
      setPlayerBuzzed(data.player.username);
    });
    socket.on("game:end", () => {
      router.push(`/scoreboard?game=${game}`);
    });
    return () => {
      socket.off("game:question");
      socket.off("game:wait");
      socket.off("game:buzzer:wait");
      socket.off("game:end");
    };
  }, [game, router]);

  const handleAnswer = (answer: number | string[]) => {
    console.log("Submitting answer:", answer);
    console.log("Question type:", questionType);
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
      return <div className="text-xl font-semibold mt-8">En attente des autres réponses...</div>;
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
            options={answers}
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

    if (questionType === "Buzzer") {
      return (
        <>
          <BuzzerAnswerGrid
            playersBuzzed={playerBuzzed}
            players={players}
            yourScore={players.find((p) => p.socketId === socket.id)?.score ?? 0}
            onBuzz={handleBuzz}
            isBuzzed={hasBuzzed}
            buzzerAnswer={buzzerAnswerInput}
            onAnswerChange={handleBuzzerAnswerChange}
            onSubmitAnswer={handleSubmitBuzzerAnswer}
          />
        </>
      );
    }


    return null;
  };

  if (questionType === "Buzzer" && !waiting) {
    return (
      <>
        <div className="fixed inset-0 z-50 bg-transparent text-black pointer-events-none">
          <div className="fixed top-4 right-6 text-2xl font-bold bg-white px-4 py-2 rounded-full shadow-lg pointer-events-auto">
            {timer}s
          </div>

          <h1 className="text-3xl text-white md:text-4xl lg:text-5xl font-extrabold text-center mt-20 px-4 pointer-events-auto">
            {question}
          </h1>

          <div className="fixed bottom-4 right-6 text-2xl font-bold bg-white px-4 py-2 rounded-full shadow-lg pointer-events-auto">
            {`Question ${currentQuestionIndex} / ${quizLength}`}
          </div>
        </div>

        <div className="bg-white">
          {renderAnswers()}
        </div>
      </>
    );
  }

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
