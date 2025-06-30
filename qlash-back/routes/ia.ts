import type { Express } from 'express';
import type { IRoute } from "../../qlash-shared/types/socket";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";
import { generateQuiz } from '../intelligence';

const iaRoute: IRoute = {
    register: (app: Express) => {
        app.get("/ia/quiz/:prompt", authenticateToken, async (req, res) => {
            const authenticatedReq = req as AuthenticatedRequest;

            if (!authenticatedReq.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            console.log('Generating quiz for user:', authenticatedReq.user.id);
            const quizData = req.params.prompt;
            if (!quizData) {
                res.status(400).json({ message: 'Prompt is required' });
                return;
            }

            const quiz = await generateQuiz(quizData);

            if (quiz) {
                res.json(quiz);
            } else {
                res.status(500).json({ message: 'Failed to generate quiz' });
            }
        });
    },
}

export default iaRoute;