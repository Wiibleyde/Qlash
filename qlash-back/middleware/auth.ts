import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({ message: 'Access token required' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }

        (req as AuthenticatedRequest).user = decoded as { id: string; email: string; name: string };
        next();
    });
};

export const generateToken = (user: { id: string; email: string; name: string }) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
};