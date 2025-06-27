import type { Socket } from "socket.io";
import { games, type IEvent } from "./webserver";
import type { Game, Player } from "../../qlash-shared/types/game";

const TIMER = 30; // seconds

const timers: Record<string, NodeJS.Timeout> = {};

const sendQuestion = (gameUuid: string, socket: Socket) => {
    const game = games.find((g: Game) => g.id === gameUuid);
    if (!game) {
        console.error(`Game with UUID ${gameUuid} not found.`);
        return;
    }
    const index = game.currentQuestionIndex;
    game.currentQuestionStartTime = Date.now();
    console.log(game)
    const question = game.quiz?.questions?.[index];
    const answers = question?.options

    if (!question) {
        console.error(`End of quiz reached for game ${gameUuid}.`);
        socket.to(gameUuid).emit("game:end", {});
        socket.emit("game:end", {});
        return;
    }
    game.players.forEach((player) => {
        player.isAnswered = false;
    });

    socket.to(gameUuid).emit("game:question", {
        questionIndex: index,
        question,
        answers,
        currentIndex: game.currentQuestionIndex + 1,
        quizLength: game.quiz?.questions?.length || 0,
        timer: TIMER,
    });
    socket.emit("game:question", {
        questionIndex: index,
        question,
        answers,
        currentIndex: game.currentQuestionIndex + 1,
        quizLength: game.quiz?.questions?.length || 0,
        timer: TIMER,
    });
    let timeLeft = TIMER;
    timers[gameUuid] = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0 || game.players.every((p) => p.isAnswered)) {
            clearInterval(timers[gameUuid]);

            socket.to(gameUuid).emit("game:wait", {});
            socket.emit("game:wait", {});
            setTimeout(() => {
                game.currentQuestionIndex++;
                sendQuestion(gameUuid, socket);
            }, 2000);
        }
    }, 1000);
}

const gameEvent: IEvent = {
    register: (socket) => {
        socket.on("game:question", (gameUuid: string) => {
            sendQuestion(gameUuid, socket);
        });
        socket.on("game:answer", (data) => {
            const { gameUuid, answer } = data;
            console.log("answer", data);
            const game = games.find((g: Game) => g.id === gameUuid);
            if (!game) {
                console.error(`Game with UUID ${gameUuid} not found.`);
                return;
            }
            const player = game.players.find((p: Player) => p.socketId === socket.id);
            if (!player) {
                console.error(`Player with ID ${socket.id} not found in game ${gameUuid}.`);
                return;
            }
            if (player.isAnswered) {
                console.warn(`Player ${player.username} has already answered.`);
                return;
            }

            const question = game.quiz?.questions?.[game.currentQuestionIndex];
            if (!question) {
                console.error(`No question found for game ${gameUuid} at index ${game.currentQuestionIndex}.`);
                return;
            }

            console.log(answer)

            const currentQuestionOptions = question.options || [];
            const userAnswer = currentQuestionOptions[answer];
            const correctAnswers = currentQuestionOptions.filter((option) => option.isCorrect).map((option) => option.id);

            if (!userAnswer) {
                console.error(`Invalid answer index ${answer} for question in game ${gameUuid}.`);
                return;
            }
            if (correctAnswers.includes(userAnswer.id)) {
                // Player answered correctly 
                const timeTaken = (Date.now() - game.currentQuestionStartTime!) / 1000; // Convert to seconds
                // Calculate score: 1000 points max, decreasing proportionally with time
                const score = Math.max(0, Math.floor(1000 * (TIMER - timeTaken) / TIMER));
                player.score += score;
                console.log(`Player ${player.username} answered correctly! Score: ${player.score}, Time taken: ${timeTaken}s`);
            } else {
                console.log(`Player ${player.username} answered incorrectly. Score: ${player.score}`);
            }

            player.isAnswered = true;
            socket.emit("game:answer", {});
        });
    }
}

export { sendQuestion };
export default gameEvent;