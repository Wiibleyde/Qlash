import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import join from './join';
import type { Socket } from 'socket.io';
import { registerRoutes } from '../routes';
import create from './create';
import type { Game } from '../models/Game';
import synclobby from './synclobby';

export interface IEvent {
    register: (socket: Socket) => void;
}

const events: IEvent[] = [
    join,
    create,
    synclobby
];

export const games: Game[] = [];

export const initServer = (host: string, port: number) => {
    const app = express();

    // Middleware Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }));

    // Register all routes
    registerRoutes(app);

    // Créer le serveur HTTP avec Express
    const server = createServer(app);

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

    return { app, io, server };
}