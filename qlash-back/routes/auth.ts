import type { IRoute } from './index';
import type { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { generateToken } from '../middleware/auth';

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
                console.error('Registration error:', error);
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
                console.error('Login error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });

        // Route de déconnexion (côté client, juste supprimer le token)
        app.post('/auth/logout', (req: Request, res: Response) => {
            res.json({ message: 'Logout successful' });
        });
    }
};

export default authRoute;