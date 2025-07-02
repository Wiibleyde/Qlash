import type { IRoute } from "../../qlash-shared/types/socket";
import type { Request, Response } from "express";
import { games } from "../events/webserver";

interface GameLeaderboard {
    gameId: string;
    players: {
        username: string;
        score: number;
    }[];
}

const gameRoute: IRoute = {
    register: (app) => {
        app.get('/game/:gameId', (req: Request, res: Response) => {
            const { gameId } = req.params;
            const game = games.find(g => g.id === gameId);
            if (!game) {
                return res.status(404).json({ message: `Game with ID ${gameId} not found` });
            }

            const leaderboard: GameLeaderboard = {
                gameId: game.id,
                players: game.players.map(player => ({
                    username: player.username,
                    score: player.score,
                    socketId: player.socketId,
                })),
            };

            leaderboard.players.sort((a, b) => b.score - a.score);

            res.status(200).json({ message: `Game details for ${gameId}`, leaderboard });
        });
    }
}

export default gameRoute;