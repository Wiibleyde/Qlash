import { answerQuestion, buzz } from '@/services/socket';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useGameSocket from './useGameSocket';

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

const useGame = (game: string) => {
    const router = useRouter();
    const [timer, setTimer] = useState(30);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [rankingOrder, setRankingOrder] = useState<string[]>([]);
    const [questionType, setQuestionType] = useState<QuestionType>("Question à choix multiple");
    const [question, setQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<QCMAnswerOption[]>([]);
    const [waiting, setWaiting] = useState<boolean>(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [quizLength, setQuizLength] = useState<number>(0);
    const [hasBuzzed, setHasBuzzed] = useState(false);
    const [buzzerAnswerInput, setBuzzerAnswerInput] = useState("");

    const [players, setPlayers] = useState<Player[]>([]);
    const [playerBuzzed, setPlayerBuzzed] = useState<string>("");
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
        setWaiting(true);
        setPlayerBuzzed(data.player.username);
    });
    useGameSocket("game:end", () => {
        router.push(`/scoreboard?game=${game}`);
    });

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

    const handleAnswer = (answer: number | string[]) => {
        if (questionType === "Puzzle") {
            answerQuestion(game, rankingOrder);
        } else {
            answerQuestion(game, answer);
            if (typeof answer === "number") setSelectedIdx(answer);
        }
        setWaiting(true);
    };

    return { timer, selectedIdx, rankingOrder, questionType, question, answers, waiting, currentQuestionIndex, quizLength, players, playerBuzzed, setRankingOrder, hasBuzzed, buzzerAnswerInput, handleBuzz, handleBuzzerAnswerChange, handleSubmitBuzzerAnswer, handleAnswer };
}

export default useGame