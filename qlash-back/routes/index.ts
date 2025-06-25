import type { Express } from 'express';
import type { IRoute } from '../../qlash-shared/types/socket';
import authRoute from './auth';
import healthRoute from './health';
import quizRoute from './quiz';


const routes: IRoute[] = [
    healthRoute,
    authRoute,
    quizRoute
];

export const registerRoutes = (app: Express) => {
    routes.forEach(route => route.register(app));
};