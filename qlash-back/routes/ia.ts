import type { Express } from 'express';
import type { IRoute } from "../../qlash-shared/types/socket";
import { authenticateToken, type AuthenticatedRequest } from "../middleware/auth";
import { generateQuiz } from '../intelligence';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../utils/logger';

const logger = new Logger(__filename.split('/').pop() as string);

const prisma = new PrismaClient();

const iaRoute: IRoute = {
    register: (app: Express) => {
        app.get("/ia/quiz/:prompt", authenticateToken, async (req, res) => {
            const authenticatedReq = req as AuthenticatedRequest;

            if (!authenticatedReq.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            logger.debug('Generating quiz for user:', authenticatedReq.user.id);
            const quizData = req.params.prompt;
            if (!quizData) {
                res.status(400).json({ message: 'Prompt is required' });
                return;
            }

            try {
                // Get question types from database
                const questionTypes = await prisma.questionType.findMany();
                const typeMap = new Map(questionTypes.map(type => [type.name, type]));

                const generatedQuiz = await generateQuiz(quizData);

                if (generatedQuiz && generatedQuiz.questions) {
                    // Transform the generated quiz to match our database structure
                    const transformedQuiz = {
                        name: generatedQuiz.name,
                        description: generatedQuiz.description,
                        questions: generatedQuiz.questions.map((question: any, index: number) => {
                            const questionType = typeMap.get(question.type);
                            if (!questionType) {
                                throw new Error(`Question type "${question.type}" not found in database`);
                            }

                            return {
                                id: `temp_${index}`,
                                content: question.content,
                                type: questionType,
                                options: question.options?.map((option: any, optIndex: number) => ({
                                    id: `temp_option_${index}_${optIndex}`,
                                    content: option.content,
                                    isCorrect: option.isCorrect,
                                    order: optIndex,
                                    questionId: `temp_${index}`,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                })) || [],
                                quizId: '',
                                typeId: questionType.id,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            };
                        })
                    };

                    res.json(transformedQuiz);
                } else {
                    res.status(500).json({ message: 'Failed to generate quiz' });
                }
            } catch (error) {
                logger.error('Error in IA quiz generation:', error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                res.status(500).json({ message: 'Failed to generate quiz', error: errorMessage });
            }
        });
    },
}

export default iaRoute;