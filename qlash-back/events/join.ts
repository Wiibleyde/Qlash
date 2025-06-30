import type { Player } from "../../qlash-shared/types/game";
import { games, type IEvent } from "./webserver";

const join: IEvent = {
    register: (socket) => {
        socket.on("join", (data) => {
            const { username, gameCode } = data;
            if (!username || username.trim() === "" || !gameCode || gameCode.length !== 6) {
                console.error("Username is required to join a game.");
                socket.emit("join", { joined: false, message: "Invalid username or game code." });
                return;
            }
            console.log(`User ${username} is joining game with code ${gameCode}...`);
            const game = games.find(g => g.code === gameCode);
            if (!game) {
                console.error(`Game with code ${gameCode} not found.`);
                socket.emit("join", { joined: false, message: "Game not found." });
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
                joined: true,
                gameUuid: game.id,
            });
        });
    },
}

export default join;