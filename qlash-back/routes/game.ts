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
        // Define your game-related routes here
        app.get('/game/:gameId', (req: Request, res: Response) => {
            const { gameId } = req.params;
            // Logic to get game details by gameId

            const game = games.find(g => g.id === gameId);
            if (!game) {
                return res.status(404).json({ message: `Game with ID ${gameId} not found` });
            }

            const leaderboard: GameLeaderboard = {
                gameId: game.id,
                players: game.players.map(player => ({
                    username: player.username,
                    score: player.score,
                })),
            };

            // Sort  leaderboard by score in descending order
            leaderboard.players.sort((a, b) => b.score - a.score);

            res.status(200).json({ message: `Game details for ${gameId}`, leaderboard });
        });

        // Add more game-related routes as needed
    }
}

export default gameRoute;