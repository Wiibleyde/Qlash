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
            game.quiz = selectedQuiz;
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