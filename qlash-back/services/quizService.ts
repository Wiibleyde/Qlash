import { prisma } from "../database";

export class QuizService {
    static async getQuizById(quizId: string) {
        const quiz = await prisma.quiz.findUnique({
            where: { id: quizId },
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            }
        });

        if (!quiz) {
            throw new Error('Quiz not found');
        }

        return quiz;
    }

    static async createQuiz(data: any) {
        const quiz = await prisma.quiz.create({
            data
        });

        return quiz;
    }

    static async updateQuiz(quizId: string, data: any) {
        const quiz = await prisma.quiz.update({
            where: { id: quizId },
            data
        });

        return quiz;
    }

    static async deleteQuiz(quizId: string) {
        await prisma.quiz.delete({
            where: { id: quizId }
        });
    }
}