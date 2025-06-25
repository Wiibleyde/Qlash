export interface Game {
    id: string;
    code: string;
    players: Player[];
    host: Player;
}


export interface Player {
    username: string;
    socketId: string;
    gameId: string;
    isHost: boolean;
}