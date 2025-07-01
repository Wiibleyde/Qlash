import { findGameById } from "../helpers/game";
import { sendError } from "../helpers/websocket";
import { Logger } from "../utils/logger";
import { type IEvent } from "./webserver";

const logger = new Logger(__filename.split('/').pop() as string);

const synclobby: IEvent = {
    register: (socket) => {
        socket.on("synclobby", (data) => {
            logger.debug(`User with socket ID ${socket.id} requested to sync lobby., ${JSON.stringify(data)}`);
            const { gameUuid } = data;
            logger.info(`Game UUID: ${gameUuid}`);
            const game = findGameById(gameUuid);
            if (game) {
                const playerExists = game.players.some(player => player.socketId === socket.id);
                if (!playerExists) {
                    logger.error(`Player with socket ID ${socket.id} not found in game ${gameUuid}.`);
                    sendError(socket, "synclobby", "Player not found in game.");
                    return;
                }
                const playersData = game.players.map(player => ({
                    username: player.username,
                    socketId: player.socketId,
                    isHost: player.isHost,
                }));
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
                logger.error(`Game with UUID ${gameUuid} not found.`);
                sendError(socket, "synclobby", "Game not found.");
            }
        });
    }
}

export default synclobby;