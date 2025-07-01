import { QuizService } from "../services/quizService";
import { sendQuestion } from "./game";
import { games, type IEvent } from "./webserver";
import { Logger } from "../utils/logger";
import { findGameById } from "../helpers/game";
import { sendError, sendToRoom } from "../helpers/websocket";

const logger = new Logger(__filename.split('/').pop() as string);

const startgame: IEvent = {
    register: (socket) => {
        socket.on("startgame", async (data) => {
            const { gameUuid, selectedQuiz } = data;
            logger.debug("Selected quiz:", selectedQuiz);
            const isHost = games.some(game =>
                game.id === gameUuid && game.players.some(player => player.socketId === socket.id && player.isHost)
            );
            if (!isHost) {
                logger.error(`User with socket ID ${socket.id} is not the host of game ${gameUuid}.`);
                sendError(socket, "startgame", "You are not the host.");
                return;
            }
            const game = findGameById(gameUuid);
            if (!game) {
                logger.error(`Game with UUID ${gameUuid} not found.`);
                sendError(socket, "startgame", "Game not found.");
                return;
            }
            if (!selectedQuiz) {
                logger.error(`No quiz selected for game ${gameUuid}.`);
                sendError(socket, "startgame", "No quiz selected.");
                return;
            }
            try {
                const quizz = await QuizService.getQuizById(selectedQuiz.id);
                if (!quizz) {
                    logger.error(`Quiz with ID ${selectedQuiz.id} not found.`);
                    sendError(socket, "startgame", "Quiz not found.");
                    return;
                }
                logger.debug("Quizz from service:", quizz);
                game.quiz = quizz;
            } catch (error) {
                logger.error(`Error fetching quiz with ID ${selectedQuiz.id}:`, error);
                sendError(socket, "startgame", "Error fetching quiz.");
                return;
            }
            sendToRoom(socket, gameUuid, "startgame", {
                success: true,
                message: "Game is starting.",
                gameId: game.id,
            });
            logger.info(`Game ${game.id} started with quiz ${selectedQuiz.id}.`);
            setTimeout(() => {
                sendQuestion(gameUuid, socket);
            }, 2000);
        });
    },
};

export default startgame;