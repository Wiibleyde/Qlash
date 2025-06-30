import type { Game, Player } from "../../qlash-shared/types/game";
import { createGameCode, createGameUuid } from "../utils/game";
import { games, type IEvent } from "./webserver";

const create: IEvent = {
    register: (socket) => {
        socket.on("create", (data) => {
            const { username } = data;
            if (!username || username.trim() === "") {
                socket.emit("create", { success: false, message: "Username is required to create a game." });
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
            console.log(`User ${username} created a game with code ${gameCode}`);
        });
    },
};

export default create;