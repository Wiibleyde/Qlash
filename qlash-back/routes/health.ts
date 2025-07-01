import type { Express } from 'express';
import type { IRoute } from '../../qlash-shared/types/socket';
import { authenticateToken, type AuthenticatedRequest } from '../middleware/auth';

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

        app.get('/health/account', authenticateToken, (req, res) => {
            const authenticatedReq = req as AuthenticatedRequest;
            res.json({
                status: 'authenticated',
                user: authenticatedReq.user,
                timestamp: new Date().toISOString()
            });
        });
    }
};

export default healthRoute;