import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import type { Socket } from 'socket.io';
import { Server } from 'socket.io';
import type { Game } from '../../qlash-shared/types/game';
import { registerRoutes } from '../routes';
import create from './create';
import join from './join';
import synclobby from './synclobby';
import { getIpAddress, updateBackEnv, updateEnvVariable } from '../utils/config';
import startgame from './startgame';
import gameEvent from './game';
import { Logger } from '../utils/logger';

const logger = new Logger(__filename.split('/').pop() as string);

export interface IEvent {
    register: (socket: Socket) => void;
}

const events: IEvent[] = [
    join,
    create,
    synclobby,
    startgame,
    gameEvent
];

export const games: Game[] = [];

export const initServer = (port: number) => {

    const address = getIpAddress();
    updateBackEnv(address[0] as string);
    updateEnvVariable(address[0] as string);

    const host = process.env.HOST

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
        logger.info(`A user connected: ${socket.id}`);

        events.forEach(event => event.register(socket));

        socket.on('disconnect', () => {
            logger.info(`User disconnected: ${socket.id}`);
        });
    });

    server.listen(port, () => {
        logger.info(`Server is running on http://${host}:${port}`);
    });

    return { app, io, server };
}