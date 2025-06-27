import type { Socket } from "socket.io";
import { games, type IEvent } from "./webserver";
import type { Game, Player } from "../../qlash-shared/types/game";

const TIMER = 30; // seconds

const timers: Record<string, NodeJS.Timeout> = {};

const sendQuestion = (gameUuid: string, socket: Socket) => {
    const game = games.find((g: Game) => g.id === gameUuid);
    if (!game) {
        console.error(`Game with UUID ${gameUuid} not found.`);
        return;
    }
    const index = game.currentQuestionIndex;
    console.log(game)
    const question = game.quiz?.questions?.[index];
    const answers = question?.options

    if (!question) {
        console.error(`End of quiz reached for game ${gameUuid}.`);
        socket.to(gameUuid).emit("game:end", {});
        socket.emit("game:end", {});
        return;
    }
    game.players.forEach((player) => {
        player.isAnswered = false;
    });

    socket.to(gameUuid).emit("game:question", {
        questionIndex: index,
        question,
        answers,
        currentIndex: game.currentQuestionIndex + 1,
        quizLength: game.quiz?.questions?.length || 0,
        timer: TIMER,
    });
    socket.emit("game:question", {
        questionIndex: index,
        question,
        answers,
        currentIndex: game.currentQuestionIndex + 1,
        quizLength: game.quiz?.questions?.length || 0,
        timer: TIMER,
    });
    let timeLeft = TIMER;
    timers[gameUuid] = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0 || game.players.every((p) => p.isAnswered)) {
            clearInterval(timers[gameUuid]);

            socket.to(gameUuid).emit("game:wait", {});
            socket.emit("game:wait", {});
            setTimeout(() => {
                game.currentQuestionIndex++;
                sendQuestion(gameUuid, socket);
            }, 2000);
        }
    }, 1000);
}

const gameEvent: IEvent = {
    register: (socket) => {
        socket.on("game:question", (gameUuid: string) => {
            sendQuestion(gameUuid, socket);
        });
        socket.on("game:answer", (data) => {
            const { gameUuid, answer } = data;
            console.log("answer", data);
            const game = games.find((g: Game) => g.id === gameUuid);
            if (!game) {
                console.error(`Game with UUID ${gameUuid} not found.`);
                return;
            }
            const player = game.players.find((p: Player) => p.socketId === socket.id);
            if (!player) {
                console.error(`Player with ID ${socket.id} not found in game ${gameUuid}.`);
                return;
            }
            player.isAnswered = true;
            socket.emit("game:answer", {});
        });
    }
}

export { sendQuestion };
export default gameEvent;