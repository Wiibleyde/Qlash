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
                            Return a JSON object with:
                            - name: a catchy title for the quiz
                            - description: a brief description of the quiz
                            - questions: array of question objects
                            
                            Each question should have:
                            - content: the question text
                            - type: one of these exact values: "Question à choix multiple", "Vrai/Faux", or "Puzzle"
                            - options: array of option objects with 'content' and 'isCorrect' properties
                            
                            Rules:
                            - For "Question à choix multiple": 4 options, only one correct
                            - For "Vrai/Faux": exactly 2 options ("Vrai" and "Faux"), only one correct
                            - For "Puzzle": 3-4 options representing elements to order, mark the first element as correct
                            - Ensure only one option per question has isCorrect: true
                            - Vary the question types across the 5 questions`
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
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    content: { type: Type.STRING },
                                    type: { type: Type.STRING },
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
                                required: ["content", "type", "options"]
                            }
                        }
                    },
                    required: ["name", "description", "questions"]
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
