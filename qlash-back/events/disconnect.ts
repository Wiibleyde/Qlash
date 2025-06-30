import { Logger } from "../utils/logger";
import synclobby from "./synclobby";
import { games, type IEvent } from "./webserver";

const logger = new Logger(__filename.split('/').pop() as string);


const disconnect: IEvent = {
    register: (socket) => {
        socket.on("disconnect", () => {            
            const game = games.find(g => g.players.some(player => player.socketId === socket.id));
            if (!game) {
                logger.warn(`No game found for socket ${socket.id}`);
                return;
            }
            const playerIndex = game.players.findIndex(player => player.socketId === socket.id);
            if (playerIndex === -1) {
                logger.warn(`Player with socket ${socket.id} not found in game ${game.id}`);
                return;
            }
            const player = game.players[playerIndex];
            game.players.splice(playerIndex, 1);
            logger.info(`Player ${player?.username} disconnected from game ${game.id}`);
            
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