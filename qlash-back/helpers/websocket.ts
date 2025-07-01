import type { Socket } from "socket.io";

export const sendError = (socket: Socket, event: string, message: string) => {
    socket.emit(event, {
        success: false,
        message,
    });
}

export const sendToRoom = (socket: Socket, roomId: string, event: string, data: any) => {
    socket.to(roomId).emit(event, data);
    socket.emit(event, data);
}