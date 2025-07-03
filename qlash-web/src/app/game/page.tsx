"use client";
import BuzzerAnswerGrid from "@/components/grid/BuzzerAnswerGrid";
import PuzzleAnswerGrid from "@/components/grid/PuzzleAnswerGrid";
import QCMAnswerGrid from "@/components/grid/QCMAnswerGrid";
import Loading from "@/components/Loading";
import useGameSocket from "@/hook/useGameSocket";
import { answerQuestion, buzz } from "@/services/socket";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const game = searchParams.get("game") as string;
  const [timer, setTimer] = useState(30);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rankingOrder, setRankingOrder] = useState<string[]>([]);
  const [questionType, setQuestionType] = useState<QuestionType>("Question à choix multiple");
  const [question, setQuestion] = useState<string>("");
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
      buzz(game);
    }
  };

  const handleBuzzerAnswerChange = (val: string) => {
    setBuzzerAnswerInput(val);
  };

  const handleSubmitBuzzerAnswer = () => {
    if (buzzerAnswerInput.trim() === "") return;

    answerQuestion(game, buzzerAnswerInput);
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

  useGameSocket("game:question", (data) => {
    const { question, timer, answers: answersFromServer, currentIndex, quizLength, players: playersFromServer } = data;
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
    setRankingOrder(answersFromServer.map((opt: QCMAnswerOption) => opt.id));

  });

  useGameSocket("game:wait", () => setWaiting(true));
  useGameSocket("game:buzzer:wait", (data) => {
    setPlayerBuzzed(data.player.username);
  });
  useGameSocket("game:end", () => {
    router.push(`/scoreboard?game=${game}`);
  });

  const handleAnswer = (answer: number | string[]) => {
    if (questionType === "Puzzle") {
      answerQuestion(game, rankingOrder);
    } else {
      answerQuestion(game, answer);
      if (typeof answer === "number") setSelectedIdx(answer);
    }
    setWaiting(true);
  };

  const renderAnswers = () => {
    if (waiting) {
      return <Loading />;
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
