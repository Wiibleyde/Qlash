import type { Express } from 'express';
import type { IRoute } from '../../qlash-shared/types/socket';
import authRoute from './auth';
import healthRoute from './health';
import quizRoute from './quiz';
import userRoute from './user';


const routes: IRoute[] = [
    healthRoute,
    authRoute,
    quizRoute,
    userRoute
];

export const registerRoutes = (app: Express) => {
    routes.forEach(route => route.register(app));
};