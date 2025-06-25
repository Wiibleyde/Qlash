import type { Express } from 'express';
import healthRoute from './health';
import authRoute from './auth';

export interface IRoute {
    register: (app: any) => void;
}

const routes: IRoute[] = [
    healthRoute,
    authRoute
];

export const registerRoutes = (app: Express) => {
    routes.forEach(route => route.register(app));
};