"use client";
import BuzzerAnswerGrid from "@/components/grid/BuzzerAnswerGrid";
import PuzzleAnswerGrid from "@/components/grid/PuzzleAnswerGrid";
import QCMAnswerGrid from "@/components/grid/QCMAnswerGrid";
import Loading from "@/components/Loading";
import useGame from "@/hook/useGame";
import { useSearchParams } from "next/navigation";

const GameQuestion = () => {
  const searchParams = useSearchParams();
  const game = searchParams.get("game") as string;
  const { selectedIdx, rankingOrder, questionType, question, answers, waiting, currentQuestionIndex, quizLength, players, playerBuzzed, setRankingOrder, timer, buzzerAnswerInput, hasBuzzed, handleBuzz, handleBuzzerAnswerChange, handleSubmitBuzzerAnswer, handleAnswer } = useGame(game);

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
