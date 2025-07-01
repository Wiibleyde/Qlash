import type { Request, Response } from "express";
import type { IRoute } from "../../qlash-shared/types/socket";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";
import { UserService } from "../services/userService";

const userRoute: IRoute = {
    register: (app) => {
        app.get('/user/:id', authenticateToken, async (req: Request, res: Response) => {
            const authenticatedReq = req as AuthenticatedRequest;
            if (!authenticatedReq.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (authenticatedReq.user.id !== req.params.id) {
                return res.status(403).json({ message: 'Forbidden: You can only access your own user data' });
            }
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const user = await UserService.getUserById(id)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        });



        app.put('/user/:id', authenticateToken, (req: Request, res: Response) => {
            const authenticatedReq = req as AuthenticatedRequest;
            if (!authenticatedReq.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (authenticatedReq.user.id !== req.params.id) {
                return res.status(403).json({ message: 'Forbidden: You can only update your own user data' });
            }
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const updateData = req.body;
            const updatedUser = UserService.updateUser(id, updateData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        });

    }
};

export default userRoute;