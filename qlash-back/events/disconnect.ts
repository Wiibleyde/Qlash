import { findGameBySocketId } from "../helpers/game";
import { Logger } from "../utils/logger";
import { games, type IEvent } from "./webserver";

const logger = new Logger(__filename.split('/').pop() as string);

const disconnect: IEvent = {
    register: (socket) => {
        socket.on("disconnect", () => {         
            const game = findGameBySocketId(socket.id);   
            if (!game) {
                logger.warn(`No game found for socket ${socket.id}`);
                return;
            }
            const player = game.players.find(player => player.socketId === socket.id);
            if (!player) {
                logger.warn(`Player with socket ${socket.id} not found in game ${game.id}`);
                return;
            }
            // Remove player from game
            game.players = game.players.filter(p => p.socketId !== socket.id);
            logger.info(`Player ${player?.username} disconnected from game ${game.id}`);
            if (player.isHost) {
                if (game.players.length > 0) {
                    // If the host disconnects, promote the next player to host
                    const newHost = game.players[0];
                    if (newHost) {
                        newHost.isHost = true;
                        logger.info(`Player ${newHost.username} is now the host of game ${game.id}`);
                    }
                } else {
                    logger.info(`No players left in game ${game.id}, removing game`);
                    games.splice(games.indexOf(game), 1);
                }
            }
            
            socket.to(game.id).emit("synclobby", {
                success: true,
                players: game.players.map(p => ({
                    username: p.username,
                    socketId: p.socketId,
                    isHost: p.isHost,
                })),
                gameCode: game.code,
            });
        });
    }
};

export default disconnect;