export interface SimplePlayer {
    username: string;
    socketId: string;
    isHost?: boolean;
}

export interface LoggedUser {
    id: string;
    email: string;
    name: string;
};