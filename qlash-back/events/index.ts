import { createServer } from 'http';
import { Server } from 'socket.io';
import join from './join';
import type { Socket } from 'socket.io';

export interface IEvent {
    register: (socket: Socket) => void;
}

const events: IEvent[] = [
    join,
];

export const initServer = (host: string, port: number) => {
    const server = createServer();
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type"],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        events.forEach(event => event.register(socket));

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    server.listen(port, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
    return { io };
}