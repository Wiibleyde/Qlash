import { type IQuiz } from "./quiz";

export interface Game {
    id: string;
    code: string;
    players: Player[];
    host: Player;
    quiz?: IQuiz;
    currentQuestionIndex: number;
    currentQuestionStartTime?: number;
}


export interface Player {
    username: string;
    socketId: string;
    gameId: string;
    isHost: boolean;
    isAnswered: boolean;
    score: number;
}