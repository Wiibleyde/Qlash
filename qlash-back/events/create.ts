import type { Game, Player } from "../../qlash-shared/types/game";
import { sendError } from "../helpers/websocket";
import { createGameCode, createGameUuid } from "../utils/game";
import { Logger } from "../utils/logger";
import { games, type IEvent } from "./webserver";

const logger = new Logger(__filename.split('/').pop() as string);

const create: IEvent = {
    register: (socket) => {
        socket.on("create", (data) => {
            const { username } = data;
            if (!username || username.trim() === "") {
                logger.error("Username is required to create a game.");
                sendError(socket, "create", "Username is required to create a game.");
                return;
            }
            const gameCode = createGameCode();
            const gameUuid = createGameUuid();
            const player: Player = {
                username,
                socketId: socket.id,
                gameId: gameUuid,
                isHost: true,
                isAnswered: false,
                score: 0,
            };
            const game: Game = {
                id: gameUuid,
                code: gameCode,
                players: [],
                host: player,
                currentQuestionIndex: 0,
            };
            games.push(game);
            game.players.push(player);
            socket.join(gameUuid);
            socket.emit("create", {
                success: true,
                gameUuid
            });
            logger.info(`Game created successfully with UUID: ${gameUuid} and code: ${gameCode}`);
        });
    },
};

export default create;