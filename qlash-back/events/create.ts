import { createGameCode, createGameUuid } from "../utils/game";
import type { IEvent } from "./webserver";

const create: IEvent = {
    register: (socket) => {
        socket.on("create", (data) => {
            const { username } = data;
            const gameCode = createGameCode();
            const gameUuid = createGameUuid();
            socket.join(gameUuid);
            socket.emit("gameCreated", {
                gameCode,
                gameUuid
            });
            console.log(`User ${username} created a game with code ${gameCode}`);
        });
    },
};

export default create;