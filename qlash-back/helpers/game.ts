import { games } from "../events/webserver";
import type { Game, Player } from "../../qlash-shared/types/game";

export function findGameBySocketId(socketId: string): Game | undefined {
    return games.find(g => g.players.some(player => player.socketId === socketId));
}

export const findGameById = (gameId: string): Game | undefined => {
    return games.find(game => game.id === gameId);
};

export const findGameByCode = (gameCode: string): Game | undefined => {
    return games.find(game => game.code === gameCode);
};

export function findPlayer(game: Game, socketId: string): Player | undefined {
    return game.players.find(player => player.socketId === socketId);
}