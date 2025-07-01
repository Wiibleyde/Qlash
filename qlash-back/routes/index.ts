import type { Express } from 'express';
import authRoute from './auth';
import healthRoute from './health';
import quizRoute from './quiz';
import userRoute from './user';
import gameRoute from './game';
import iaRoute from './ia';
import type { IRoute } from '../../qlash-shared/types/socket';


const routes: IRoute[] = [
    healthRoute,
    authRoute,
    quizRoute,
    userRoute,
    gameRoute,
    iaRoute
];

export const registerRoutes = (app: Express) => {
    routes.forEach(route => route.register(app));
};