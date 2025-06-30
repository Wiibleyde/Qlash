import type { Request, Response } from 'express';
import type { IRoute } from '../../qlash-shared/types/socket';
import { authenticateToken, generateToken, type AuthenticatedRequest } from '../middleware/auth';
import { UserService } from '../services/userService';
import { logger } from '../events/webserver';

const authRoute: IRoute = {
    register: (app) => {
        // Route d'inscription
        app.post('/auth/register', async (req: Request, res: Response) => {
            try {
                if (!req.body) {
                    res.status(400).json({ 
                        message: 'Request body is required' 
                    });
                    return;
                }

                const { email, password, name } = req.body;

                if (!email || !password || !name) {
                    res.status(400).json({ 
                        message: 'Email, password and name are required' 
                    });
                    return;
                }

                const user = await UserService.createUser(email, password, name);
                const token = generateToken(user);

                res.status(201).json({
                    message: 'User created successfully',
                    user,
                    token
                });
            } catch (error: any) {
                if (error.message === 'User already exists') {
                    res.status(409).json({ message: error.message });
                    return;
                }
                logger.error('Registration error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Route de connexion
        app.post('/auth/login', async (req: Request, res: Response) => {
            try {
                if (!req.body) {
                    res.status(400).json({ 
                        message: 'Request body is required' 
                    });
                    return;
                }

                const { email, password } = req.body;

                if (!email || !password) {
                    res.status(400).json({ 
                        message: 'Email and password are required' 
                    });
                    return;
                }

                const user = await UserService.authenticateUser(email, password);
                const token = generateToken(user);

                res.json({
                    message: 'Login successful',
                    user,
                    token
                });
            } catch (error: any) {
                if (error.message === 'Invalid credentials') {
                    res.status(401).json({ message: error.message });
                    return;
                }
                logger.error('Login error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Route de déconnexion (côté client, juste supprimer le token)
        app.post('/auth/logout', (req: Request, res: Response) => {
            res.json({ message: 'Logout successful' });
        });

        app.get('/auth/isAuthenticated', authenticateToken, (req: Request, res: Response) => {
            const authenticatedReq = req as AuthenticatedRequest; // Cast to any to access user property
            if (!authenticatedReq.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            res.json({
                status: 'authenticated',
                user: authenticatedReq.user,
                timestamp: new Date().toISOString()
            });
        });
    }
};

export default authRoute;