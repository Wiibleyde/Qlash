import { prisma } from "../database";

export class QuizService {
    static async getQuizById(quizId: string) {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    include: {
                        type: true,
                        options: true
                    }
                },
                author: true
            }
        });

        if (!quiz) {
            throw new Error('Quiz not found');
        }

        return quiz;
    }

    static async createQuiz(quizData: any, authorId: string) {
        // First verify that the author exists
        const author = await prisma.user.findUnique({
            where: { id: authorId }
        });

        if (!author) {
            throw new Error('Author not found');
        }

        const quiz = await prisma.quiz.create({
            data: {
                name: quizData.name,
                description: quizData.description,
                authorId: authorId,
                questions: {
                    create: await Promise.all(quizData.questions?.map(async (question: any) => {
                        // Find existing question type - fail if not found
                        const questionType = await prisma.questionType.findFirst({
                            where: { name: question.type.name }
                        });

                        if (!questionType) {
                            throw new Error(`Question type '${question.type.name}' not found. Please use an existing question type.`);
                        }

                        return {
                            content: question.content,
                            typeId: questionType.id,
                            options: {
                                create: question.options?.map((option: any) => ({
                                    content: option.content,
                                    isCorrect: option.isCorrect,
                                    order: option.order
                                })) || []
                            }
                        };
                    }) || [])
                }
            },
            include: {
                questions: {
                    include: {
                        type: true,
                        options: true
                    }
                },
                author: true
            }
        });

        return quiz;
    }

    static async updateQuiz(quizId: string, quizData: any, authorId: string) {
        // First check if quiz exists and user is authorized
        const existingQuiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: { questions: true }
        });

        if (!existingQuiz) {
            throw new Error('Quiz not found');
        }

        if (existingQuiz.authorId !== authorId) {
            throw new Error('Unauthorized');
        }

        // Delete existing questions and their options
        await prisma.option.deleteMany({
            where: {
                question: {
                    quizId: quizId
                }
            }
        });

        await prisma.question.deleteMany({
            where: { quizId: quizId }
        });

        // Update quiz with new questions
        const updatedQuiz = await prisma.quiz.update({
            where: { id: quizId },
            data: {
                name: quizData.name,
                description: quizData.description,
                questions: {
                    create: await Promise.all(quizData.questions?.map(async (question: any) => {
                        // Find existing question type - fail if not found
                        const questionType = await prisma.questionType.findFirst({
                            where: { name: question.type.name }
                        });

                        if (!questionType) {
                            throw new Error(`Question type '${question.type.name}' not found. Please use an existing question type.`);
                        }

                        return {
                            content: question.content,
                            typeId: questionType.id,
                            options: {
                                create: question.options?.map((option: any) => ({
                                    content: option.content,
                                    isCorrect: option.isCorrect,
                                    order: option.order
                                })) || []
                            }
                        };
                    }) || [])
                }
            },
            include: {
                questions: {
                    include: {
                        type: true,
                        options: true
                    }
                },
                author: true
            }
        });

        return updatedQuiz;
    }

    static async deleteQuiz(quizId: string) {
        await prisma.quiz.delete({
            where: { id: quizId }
        });
    }
}