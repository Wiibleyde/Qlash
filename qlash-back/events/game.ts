import type { Socket } from "socket.io";
import type { Player } from "../../qlash-shared/types/game";
import { findGameById } from "../helpers/game";
import { Logger } from "../utils/logger";
import { type IEvent } from "./webserver";

const logger = new Logger(__filename.split('/').pop() as string);

const TIMER = 30; // seconds

const timers: Record<string, NodeJS.Timeout> = {};

const sendQuestion = (gameUuid: string, socket: Socket) => {
    const game = findGameById(gameUuid);
    if (!game) {
        logger.error(`Game with UUID ${gameUuid} not found.`);
        return;
    }
    const index = game.currentQuestionIndex;
    game.currentQuestionStartTime = Date.now();
    logger.info(`Sending question for game ${gameUuid}: ${JSON.stringify(game.quiz?.questions?.[index])}`);
    const question = game.quiz?.questions?.[index];

    let answers = question?.options ? [...question.options] : [];

    if (question?.type?.name === "Puzzle") {
        // Random order for puzzle questions
        answers = [...answers]?.sort(() => Math.random() - 0.5);
    }

    if (!question) {
        logger.error(`End of quiz reached for game ${gameUuid}.`);
        socket.to(gameUuid).emit("game:end", {});
        socket.emit("game:end", {});
        return;
    }
    game.players.forEach((player) => {
        player.isAnswered = false;
    });

    socket.to(gameUuid).emit("game:question", {
        players: game.players.map((p: Player) => ({
            username: p.username,
            socketId: p.socketId,
            score: p.score
        })),
        questionIndex: index,
        question,
        answers,
        currentIndex: game.currentQuestionIndex + 1,
        quizLength: game.quiz?.questions?.length || 0,
        timer: TIMER,
    });
    socket.emit("game:question", {
        players: game.players.map((p: Player) => ({
            username: p.username,
            socketId: p.socketId,
            score: p.score
        })),
        questionIndex: index,
        question,
        answers,
        currentIndex: game.currentQuestionIndex + 1,
        quizLength: game.quiz?.questions?.length || 0,
        timer: TIMER,
    });
    logger.info(`Question sent for game ${gameUuid}: ${JSON.stringify(question.content)}`);
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
            logger.debug(`Player ${socket.id} answered question in game ${gameUuid}: ${JSON.stringify(answer)}`);
            const game = findGameById(gameUuid);
            if (!game) {
                logger.error(`Game with UUID ${gameUuid} not found.`);
                return;
            }
            const player = game.players.find((p: Player) => p.socketId === socket.id);
            if (!player) {
                logger.error(`Player with ID ${socket.id} not found in game ${gameUuid}.`);
                return;
            }
            if (player.isAnswered) {
                logger.warn(`Player ${player.username} has already answered.`);
                return;
            }

            const question = game.quiz?.questions?.[game.currentQuestionIndex];
            if (!question) {
                logger.error(`No question found for game ${gameUuid} at index ${game.currentQuestionIndex}.`);
                return;
            }

            logger.debug(`Player ${socket.id} answer: ${JSON.stringify(answer)}`);
            logger.debug(`Question options: ${JSON.stringify(question.options)}`);
            logger.debug(`Question type: ${question.type?.name}`);

            if (question.type?.name === "Puzzle") {
                // answer est un tableau d'IDs dans l'ordre choisi par le joueur
                const correctOrder = [...(question.options || [])]
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map(opt => opt.id);

                const isCorrect = Array.isArray(answer) &&
                    answer.length === correctOrder.length &&
                    answer.every((id: string, idx: number) => id === correctOrder[idx]);

                if (isCorrect) {
                    const timeTaken = (Date.now() - game.currentQuestionStartTime!) / 1000;
                    const score = Math.max(0, Math.floor(1000 * (TIMER - timeTaken) / TIMER));
                    player.score += score;
                    logger.info(`Player ${player.username} a bien ordonné le puzzle ! Score: ${player.score}`);
                } else {
                    logger.warn(`Player ${player.username} a mal ordonné le puzzle.`);
                }
                player.isAnswered = true;
                socket.emit("game:answer", {});
                return;
            } else if (question.type?.name === "Buzzer") {
                const isCorrect = question.options && answer === question.options[0]?.content;
                if (isCorrect) {
                    const timeTaken = (Date.now() - game.currentQuestionStartTime!) / 1000; // Convert to seconds
                    const score = Math.max(0, Math.floor(1000 * (TIMER - timeTaken) / TIMER));
                    player.score += score;
                    game.players.forEach(p => p.isAnswered = true);
                    socket.emit("game:answer", {});
                    logger.info(`Player ${player.username} a répondu correctement au buzzer ! Score: ${player.score}`);
                    return;
                } else {
                    if (timers[gameUuid]) {
                        clearInterval(timers[gameUuid]);
                    }
                    sendQuestion(gameUuid, socket);
                    logger.warn(`Player ${player.username} a répondu incorrectement au buzzer, question renvoyée.`);
                    return;
                }
            }

            const currentQuestionOptions = question.options || [];
            const userAnswer = currentQuestionOptions[answer];
            const correctAnswers = currentQuestionOptions.filter((option) => option.isCorrect).map((option) => option.id);

            if (!userAnswer) {
                logger.error(`Invalid answer index ${answer} for question in game ${gameUuid}.`);
                return;
            }
            if (correctAnswers.includes(userAnswer.id)) {
                // Player answered correctly 
                const timeTaken = (Date.now() - game.currentQuestionStartTime!) / 1000; // Convert to seconds
                // Calculate score: 1000 points max, decreasing proportionally with time
                const score = Math.max(0, Math.floor(1000 * (TIMER - timeTaken) / TIMER));
                player.score += score;
                logger.info(`Player ${player.username} answered correctly! Score: ${player.score}, Time taken: ${timeTaken}s`);
            } else {
                logger.warn(`Player ${player.username} answered incorrectly. Score: ${player.score}`);
            }

            player.isAnswered = true;
            socket.emit("game:answer", {});
        });

        socket.on("game:buzzed", (data) => {
            const { gameUuid } = data;
            const game = findGameById(gameUuid);
            if (!game) {
                logger.error(`Game with UUID ${gameUuid} not found.`);
                return;
            }
            socket.to(gameUuid).emit("game:buzzer:wait", {
                player: {
                    username: game.players.find((p: Player) => p.socketId === socket.id)?.username || "Unknown",
                },
            });
        });
    }
}

export { sendQuestion };
export default gameEvent;