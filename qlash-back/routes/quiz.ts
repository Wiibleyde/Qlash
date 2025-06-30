import type { Request, Response } from 'express';
import type { IRoute } from "../../qlash-shared/types/socket";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";
import { QuizService } from '../services/quizService';
import { prisma } from '../database';
import { Logger } from '../utils/logger';

const logger = new Logger(__filename.split('/').pop() as string);

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

        app.get('/question/types', async (req: Request, res: Response) => {
            const quizTypes = await prisma.questionType.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            });
            res.status(200).json(quizTypes);
        });

        app.post('/quiz', authenticateToken, (req: Request, res: Response) => {
            const authenticatedReq = req as AuthenticatedRequest;

            if (!authenticatedReq.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            logger.info('Creating quiz for user:', authenticatedReq.user.id);
            const quizData = req.body;
            logger.debug('Quiz data:', JSON.stringify(quizData, null, 2));

            QuizService.createQuiz(quizData, authenticatedReq.user.id)
                .then(createdQuiz => {
                    res.status(201).json({ message: 'Quiz created', quiz: createdQuiz });
                })
                .catch(error => {
                    logger.error('Error creating quiz:', error);
                    if (error.message === 'Author not found') {
                        res.status(400).json({ message: 'Invalid user' });
                    } else if (error.message.includes('Question type') && error.message.includes('not found')) {
                        res.status(400).json({ message: error.message });
                    } else {
                        res.status(500).json({ message: 'Internal server error' });
                    }
                });
        });

        app.put('/quiz/:id', authenticateToken, (req: Request, res: Response) => {
            const authenticatedReq = req as AuthenticatedRequest;
            const { id } = req.params;

            if (!authenticatedReq.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            if (!id) {
                return res.status(400).json({ message: 'Quiz ID is required' });
            }

            const updatedQuizData = req.body;

            QuizService.updateQuiz(id, updatedQuizData, authenticatedReq.user.id)
                .then(quiz => {
                    res.status(200).json({ message: 'Quiz updated', quiz });
                })
                .catch(error => {
                    logger.error('Error updating quiz:', error);
                    if (error.message === 'Quiz not found' || error.message === 'Unauthorized') {
                        res.status(404).json({ message: error.message });
                    } else if (error.message.includes('Question type') && error.message.includes('not found')) {
                        res.status(400).json({ message: error.message });
                    } else {
                        res.status(500).json({ message: 'Internal server error' });
                    }
                });
        });

        app.get('/quizzes/latest', (req: Request, res: Response) => {
            QuizService.getLatestQuizzes()
                .then(quizzes => {
                    res.status(200).json(quizzes);
                })
                .catch(error => {
                    logger.error('Error fetching latest quizzes:', error);
                    res.status(500).json({ message: 'Internal server error' });
                });
        });

        app.get('/quizzes', (req: Request, res: Response) => {
            const params = req.query;
            QuizService.getQuizzes(params.search as string)
                .then(quizzes => {
                    res.status(200).json(quizzes);
                })
                .catch(error => {
                    logger.error('Error fetching quizzes:', error);
                    res.status(500).json({ message: 'Internal server error' });
                });
        });
    }
};

export default quizRoute;
