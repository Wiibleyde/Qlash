"use client";
import FinalScoreboard from "@/components/FinalScoreboard";
import { useSearchParams } from "next/navigation";

const Scoreboard = () => {

  const searchParams = useSearchParams();
  const game = searchParams.get('game');

  return (
    <FinalScoreboard game={game as string} />
  );
};

export default Scoreboard;
