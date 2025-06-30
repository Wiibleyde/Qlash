import { GoogleGenAI, Type } from "@google/genai";
import type { IQuiz } from "../qlash-shared/types/quiz";

export async function generateQuiz(prompt: string): Promise<IQuiz | null> {
    const { GEMINI_API_KEY } = process.env;
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in the environment variables.");
    }

    const genAI = new GoogleGenAI({
        apiKey: GEMINI_API_KEY
    });

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Generate a quiz with 5 questions based on the following prompt: ${prompt}. 
                            Return a JSON object with a 'questions' array. Each question should have:
                            - content: the question text
                            - options: array of option objects with 'content' and 'isCorrect' properties
                            - Ensure only one option per question has isCorrect: true`
                        }
                    ],
                }
            ],
            config: {
                responseMimeType: "application/json",
                temperature: 0.7,
                responseJsonSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    content: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                content: { type: Type.STRING },
                                                isCorrect: { type: Type.BOOLEAN }
                                            },
                                            required: ["content", "isCorrect"]
                                        }
                                    }
                                },
                                required: ["content", "options"]
                            }
                        }
                    },
                    required: ["questions"]
                }
            }
        });
        console.log("Generated quiz:", response);
        if (response) {
            const responseText = response.text;
            if (responseText) {
                try {
                    const quiz = JSON.parse(responseText);
                    return quiz;
                } catch (error) {
                    console.error("Error generating quiz:", error);
                    throw error;
                }
                return null;
            }
        }
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw error;
    }
    return null;
}
