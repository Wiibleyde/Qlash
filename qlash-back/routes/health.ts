import type { Express } from 'express';
import type { IRoute } from './index';

const healthRoute: IRoute = {
    register: (app: Express) => {
        app.get('/', (req, res) => {
            res.json({ message: 'Server is running!' });
        });

        app.get('/health', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });
    }
};

export default healthRoute;