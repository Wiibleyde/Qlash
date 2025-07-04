export interface IQuiz {
    id: string;
    name: string;
    description: string | null;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    questions?: IQuestion[];
    author?: IUser;
}

export interface IQuestionType {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    questions?: IQuestion[];
}

export interface IQuestion {
    id: string;
    quizId: string;
    typeId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    quiz?: IQuiz;
    type?: IQuestionType;
    options?: IOption[];
}

export interface IOption {
    id: string;
    questionId: string;
    content: string;
    isCorrect: boolean;
    order: number | null;
    createdAt: Date;
    updatedAt: Date;
    question?: IQuestion;
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    quizzes?: IQuiz[];
}
