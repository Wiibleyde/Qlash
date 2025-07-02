import { socket } from "@/utils/socket";

export const createGame = (username: string) => {
    socket.emit("create", { username });
}

export const joinGame = (username: string, gameCode: string) => {
    socket.emit("join", { username, gameCode });
}

export const answerQuestion = (gameUuid: string, answer: string | string[] | number) => {
    socket.emit("game:answer", { gameUuid, answer });
}

export const buzz = (gameUuid: string) => {
    socket.emit("game:buzz", { gameUuid });
}