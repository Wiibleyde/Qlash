import type { Express } from 'express';
import healthRoute from './health';

export interface IRoute {
    register: (app: Express) => void;
}

const routes: IRoute[] = [
    healthRoute,
];

export const registerRoutes = (app: Express) => {
    routes.forEach(route => route.register(app));
};