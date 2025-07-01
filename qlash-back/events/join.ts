import type { Player } from "../../qlash-shared/types/game";
import { findGameByCode } from "../helpers/game";
import { sendError } from "../helpers/websocket";
import { Logger } from "../utils/logger";
import { type IEvent } from "./webserver";

const logger = new Logger(__filename.split('/').pop() as string);

const join: IEvent = {
    register: (socket) => {
        socket.on("join", (data) => {
            const { username, gameCode } = data;
            if (!username || username.trim() === "" || !gameCode || gameCode.length !== 6) {
                logger.error("Invalid username or game code.");
                sendError(socket, "join", "Invalid username or game code.");
                return;
            }
            logger.info(`User ${username} is joining game with code ${gameCode}...`);
            const game = findGameByCode(gameCode);
            if (!game) {
                logger.error(`Game with code ${gameCode} not found.`);
                sendError(socket, "join", "Game not found.");
                return;
            }
            const player: Player = {
                username,
                socketId: socket.id,
                gameId: game.id,
                isHost: false,
                isAnswered: false,
                score: 0,
            };
            game.players.push(player);
            socket.join(game.id);
            socket.to(game.id).emit("synclobby");
            socket.emit("join", {
                success: true,
                gameUuid: game.id,
            });
            logger.info(`User ${username} joined game with UUID: ${game.id} and code: ${gameCode}`);
        });
    },
}

export default join;