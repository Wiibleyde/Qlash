import type { IRoute } from ".";
import type { Request, Response } from 'express';
import { QuizService } from "../services/quizService";

const quizRoute: IRoute = {
    register: (app) => {
        app.get('/quizzes', (req: Request, res: Response) => {
            res.json({ message: 'List of quizzes' });
        });

        app.get('/quizzes/:id', (req: Request, res: Response) => {
            const { id } = req.params;
            res.json({ message: `Details of quiz ${id}` });
        });

        app.post('/quiz', (req: Request, res: Response) => {
            const newQuiz = req.body;
            if (!newQuiz || !newQuiz.title || !newQuiz.questions) {
                return res.status(400).json({ message: 'Invalid quiz data' });
            }
            // Here you would typically save the quiz to a database
            QuizService.createQuiz(newQuiz)
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
