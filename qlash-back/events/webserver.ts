import { createServer } from 'http';
import type { Socket } from 'socket.io';
import events from '.';
import type { Game } from '../../qlash-shared/types/game';
import { registerRoutes } from '../routes';
import { app, io, server } from '../server';
import { getIpAddress, updateBackEnv, updateEnvVariable } from '../utils/config';
import { Logger } from '../utils/logger';

const logger = new Logger(__filename.split('/').pop() as string);

export interface IEvent {
    register: (socket: Socket) => void;
}

export const games: Game[] = [];

export const initServer = (port: number) => {

    const address = getIpAddress();
    updateBackEnv(address[0] as string);
    updateEnvVariable(address[0] as string);

    const host = process.env.HOST

    // Register all routes
    registerRoutes(app);

    io.on('connection', (socket) => {
        logger.info(`A user connected: ${socket.id}`);

        events.forEach(event => event.register(socket));
    });

    server.listen(port, () => {
        logger.info(`Server is running on http://${host}:${port}`);
    });
}