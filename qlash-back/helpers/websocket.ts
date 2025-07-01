import type { Socket } from "socket.io";

export const sendError = (socket: Socket, event: string, message: string) => {
    socket.emit(event, {
        success: false,
        message,
    });
}