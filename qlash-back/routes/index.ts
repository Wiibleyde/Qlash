import type { Express } from 'express';
import healthRoute from './health';
import authRoute from './auth';
import quizRoute from './quiz';

export interface IRoute {
    register: (app: any) => void;
}

const routes: IRoute[] = [
    healthRoute,
    authRoute,
    quizRoute
];

export const registerRoutes = (app: Express) => {
    routes.forEach(route => route.register(app));
};