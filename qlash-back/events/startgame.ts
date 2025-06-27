import { QuizService } from "../services/quizService";
import { games, type IEvent } from "./webserver";

const startgame: IEvent = {
    register: (socket) => {
        socket.on("startgame", (data) => {
            const { gameUuid, selectedQuiz } = data;
            const isHost = games.some(game =>
                game.id === gameUuid && game.players.some(player => player.socketId === socket.id && player.isHost)
            );
            if (!isHost) {
                console.error(`User with socket ID ${socket.id} is not the host of game ${gameUuid}.`);
                socket.emit("startgame", { success: false, message: "You are not the host." });
                return;
            }
            const game = games.find(g => g.id === gameUuid);
            if (!game) {
                console.error(`Game with UUID ${gameUuid} not found.`);
                socket.emit("startgame", { success: false, message: "Game not found." });
                return;
            }
            if (!selectedQuiz) {
                console.error(`No quiz selected for game ${gameUuid}.`);
                socket.emit("startgame", { success: false, message: "No quiz selected." });
                return;
            }
            try {
                const quizz = QuizService.getQuizById(selectedQuiz.id);
                if (!quizz) {
                    console.error(`Quiz with ID ${selectedQuiz.id} not found.`);
                    socket.emit("startgame", { success: false, message: "Quiz not found." });
                    return;
                }
                game.quiz = selectedQuiz;
            } catch (error) {
                console.error(`Error fetching quiz with ID ${selectedQuiz.id}:`, error);
                socket.emit("startgame", { success: false, message: "Error fetching quiz." });
                return;
            }
            socket.to(gameUuid).emit("startgame", {
                success: true,
                message: "Game is starting.",
                gameId: game.id
            });
            socket.emit("startgame", {
                success: true,
                message: "Game is starting.",
                gameId: game.id
            });
        });
    },
};

export default startgame;