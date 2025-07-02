import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import QCMAnswerGrid from '@/components/ui/grid/QCMAnswerGrid';
import TrueFalse from '@/components/ui/grid/TrueFalse';
import Puzzle from '@/components/ui/grid/Puzzle';
import Buzzer from '@/components/ui/grid/Buzzer';
import useGameSocket from '@/hook/useGameSocket';
import { answerQuestion, buzz } from '@/services/socket';
import { router, useLocalSearchParams } from 'expo-router';

interface QCMAnswerOption {
    id: string;
    content: string;
}

type QuestionType = "Question à choix multiple" | "Vrai/Faux" | "Puzzle" | "Buzzer";

interface Player {
    username: string;
    socketId?: string;
    score: number;
}

const getContainerStyle = (bool: true | false, questionType: QuestionType) => {
    switch (bool) {
        case false:
            return getContainerTypeContainerStyle(questionType);
        case true:
            return styles.secondaryContainer;
        default:
            return styles.container;
    }
};

const getContainerTypeContainerStyle = (type: QuestionType) => {
    switch (type) {
        case 'Question à choix multiple':
        case 'Vrai/Faux':
            return styles.container;
        case 'Puzzle':
            return styles.puzzleContainer;
        default:
            return styles.container;
    }
};

export default function Game() {
    const params = useLocalSearchParams();
    const game = params.game as string;
    const [answersSelectedBool, setAnswersSelectedBool] = useState(false);
    const [timer, setTimer] = useState(30);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [rankingOrder, setRankingOrder] = useState<string[]>([]);
    const [questionType, setQuestionType] = useState<QuestionType>("Question à choix multiple");
    const [question, setQuestion] = useState<string>("test");
    const [answers, setAnswers] = useState<QCMAnswerOption[]>([]);
    const [waiting, setWaiting] = useState<boolean>(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [quizLength, setQuizLength] = useState<number>(0);

    const [players, setPlayers] = useState<Player[]>([]);
    const [playerBuzzed, setPlayerBuzzed] = useState<string>("");
    const [hasBuzzed, setHasBuzzed] = useState(false);
    const [buzzerAnswerInput, setBuzzerAnswerInput] = useState("");

    const handleBuzz = () => {
        if (!hasBuzzed) {
            setHasBuzzed(true);
            buzz(game);
        }
    };

    const handleBuzzerAnswerChange = (val: string) => {
        setBuzzerAnswerInput(val);
    };

    const handleSubmitBuzzerAnswer = () => {
        if (buzzerAnswerInput.trim() === "") return;

        answerQuestion(game, buzzerAnswerInput);
        setWaiting(true);
        setHasBuzzed(false);
        setBuzzerAnswerInput("");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useGameSocket("game:question", (data) => {
        const { question, timer, answers: answersFromServer, currentIndex, quizLength, players: playersFromServer } = data;
        setPlayerBuzzed("");
        setPlayers(playersFromServer);
        setAnswers(answersFromServer);
        setQuestion(question.content);
        setTimer(timer);
        setWaiting(false);
        setSelectedIdx(null);
        setQuestionType(question.type.name);
        setCurrentQuestionIndex(currentIndex);
        setQuizLength(quizLength);
        setRankingOrder(answersFromServer.map((opt: QCMAnswerOption) => opt.id));
    });

    useGameSocket("game:wait", () => setWaiting(true));
    useGameSocket("game:buzzer:wait", (data) => {
        setPlayerBuzzed(data.player.username);
    });
    useGameSocket("game:end", () => {
        router.push(`/scoreboard?game=${game}`);
    });

    const handleAnswer = (answer: number | string[]) => {
        if (questionType === "Puzzle") {
            answerQuestion(game, rankingOrder);
        } else {
            answerQuestion(game, answer);
            if (typeof answer === "number") setSelectedIdx(answer);
        }
        setWaiting(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getComponent = (questionType: QuestionType) => {
        switch (questionType) {
            case 'Question à choix multiple':
                return <QCMAnswerGrid handleAnswer={handleAnswer} answers={answers} />;
            case 'Vrai/Faux':
                return <TrueFalse handleAnswer={handleAnswer} />;
            case 'Puzzle':
                return <Puzzle options={answers} selectedOrder={rankingOrder} onReorder={setRankingOrder} handleAnswer={handleAnswer} />;
            case 'Buzzer':
                return <Buzzer playersBuzzed={playerBuzzed}
                players={players}
                onBuzz={handleBuzz}
                isBuzzed={hasBuzzed}
                buzzerAnswer={buzzerAnswerInput}
                onAnswerChange={handleBuzzerAnswerChange}
                onSubmitAnswer={handleSubmitBuzzerAnswer} />;
        }
    }

    return (
        <View style={getContainerStyle(answersSelectedBool, questionType)}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.infoContainer}>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.title}>{currentQuestionIndex}/{quizLength}</Text>
                    </View>
                    <View style={styles.timerContainer}>
                        <Text style={styles.title}>{timer}s</Text>
                    </View>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                        {question}
                    </Text>
                </View>
            </View>
            {!waiting ? (
                getComponent(questionType)
            ) : waiting ? (
                <View style={styles.answerButtonsContainer}>
                    <Button
                        action={() => {
                            setAnswersSelectedBool(false);
                            setTimer(30);
                        }}
                        text="Waiting for other players..."
                        variants="primaryDisabled"
                        disabled={true}
                    />
                </View>
            ) : (
                <View style={styles.answerButtonsContainer}>
                    <Button
                        action={() => {
                            setAnswersSelectedBool(false);
                            setTimer(30);
                        }}
                        text="Next Question"
                        variants="primary"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    secondaryContainer: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 85,
    },
    puzzleContainer: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 85,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    questionContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    questionText: {
        fontSize: 18,
        color: '#694aff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    answerButtonsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        flexWrap: 'wrap',
        gap: 10,
    },
    answerButton: {
        padding: 15,
        backgroundColor: '#694aff',
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%',
    },
    answerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    timerContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    questionNumberContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    waitingText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        width: '100%',
    },
});
