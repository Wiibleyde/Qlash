import { games, type IEvent } from "./webserver";

const synclobby: IEvent = {
    register: (socket) => {
        socket.on("synclobby", (data) => {
            console.log(`User with socket ID ${socket.id} requested to sync lobby., ${JSON.stringify(data)}`);
            const { gameUuid } = data;
            console.log(gameUuid)
            const game = games.find(g => g.id === gameUuid);
            if (game) {
                const playerExists = game.players.some(player => player.socketId === socket.id);
                if (!playerExists) {
                    console.error(`Player with socket ID ${socket.id} not found in game ${gameUuid}.`);
                    socket.emit("synclobby", { success: false, message: "Player not found in game." });
                    return;
                }
                const playersData = game.players.map(player => ({
                    username: player.username,
                    socketId: player.socketId,
                    isHost: player.isHost,
                }));
                console.log(playersData)
                // l'envoie à tous les joueurs du jeu sauf celui qui a envoyé la requête
                socket.to(gameUuid).emit("synclobby", {
                    success: true,
                    players: playersData,
                    gameCode: game.code,
                });
                socket.emit("synclobby", {
                    success: true,
                    players: playersData,
                    gameCode: game.code,
                });
            } else {
                console.error(`Game with UUID ${gameUuid} not found.`);
                socket.emit("synclobby", { success: false, message: "Game not found." });
            }
        });
    }
}

export default synclobby;