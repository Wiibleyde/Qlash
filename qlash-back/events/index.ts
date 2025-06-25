import { createServer } from 'http';
import { Server } from 'socket.io';
import join from './join';

const events = [
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

        events.forEach(registerEvent => registerEvent(socket));

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    server.listen(port, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
    return { io };
}