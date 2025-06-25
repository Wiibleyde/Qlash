import type { Game, Player } from "../models/Game";
import { createGameCode, createGameUuid } from "../utils/game";
import { games, type IEvent } from "./webserver";

const create: IEvent = {
    register: (socket) => {
        socket.on("create", (data) => {
            const { username } = data;
            console.log(`User ${username} is creating a game...`);
            const gameCode = createGameCode();
            const gameUuid = createGameUuid();
            const player: Player = {
                username,
                socketId: socket.id,
                gameId: gameUuid,
                isHost: true,
            };
            const game: Game = {
                id: gameUuid,
                code: gameCode,
                players: [],
                host: player,
            };
            games.push(game);
            game.players.push(player);
            socket.join(gameUuid);
            socket.emit("create", {
                gameCode,
                gameUuid
            });
            console.log(`User ${username} created a game with code ${gameCode}`);
        });
    },
};

export default create;