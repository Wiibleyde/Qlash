import type { IRoute } from "./index";
import type { Request, Response } from 'express';
import { QuizService } from "../services/quizService";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";
import type { Quiz } from "@prisma/client";

const quizRoute: IRoute = {
    register: (app) => {
        app.get('/quiz/:id', (req: Request, res: Response) => {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Quiz ID is required' });
            }
            QuizService.getQuizById(id)
                .then(quiz => {
                    res.status(200).json(quiz);
                })
                .catch(error => {
                    console.error('Error fetching quiz:', error);
                    res.status(404).json({ message: 'Quiz not found' });
                });
        });

        app.post('/quiz', authenticateToken, (req: Request, res: Response) => {
            const authenticatedReq = req as AuthenticatedRequest;

            if (!authenticatedReq.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const newQuiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'> = JSON.parse(req.body);

            QuizService.createQuiz(newQuiz, authenticatedReq.user.id)
                .then(createdQuiz => {
                    res.status(201).json({ message: 'Quiz created', quiz: createdQuiz });
                })
                .catch(error => {
                    console.error('Error creating quiz:', error);
                    res.status(500).json({ message: 'Internal server error' });
                });
        });
    }
};

export default quizRoute;
