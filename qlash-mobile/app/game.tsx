import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import QCMAnswerGrid from '@/components/ui/grid/QCMAnswerGrid';
import TrueFalse from '@/components/ui/grid/TrueFalse';
import Puzzle from '@/components/ui/grid/Puzzle';
import Buzzer from '@/components/ui/grid/Buzzer';

const getContainerStyle = (bool: true | false) => {
    switch (bool) {
        case false:
            return getContainerTypeContainerStyle('puzzle');
        case true:
            return styles.secondaryContainer;
        default:
            return styles.container;
    }
};

const getContainerTypeContainerStyle = (type: string) => {
    switch (type) {
        case 'qcm':
        case 'trueFalse':
            return styles.container;
        case 'puzzle':
            return styles.puzzleContainer;
        default:
            return styles.container;
    }
};

export default function Game() {
    const [timer, setTimer] = useState(30);
    const [answersSelectedBool, setAnswersSelectedBool] = useState(false);
    const [waitingForPlayers, setWaitingForPlayers] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={getContainerStyle(answersSelectedBool)}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.infoContainer}>
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.title}>1/10</Text>
                    </View>
                    <View style={styles.timerContainer}>
                        <Text style={styles.title}>{timer}s</Text>
                    </View>
                </View>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                        Question will be displayed here
                    </Text>
                </View>
            </View>
            {!answersSelectedBool ? (
                <Buzzer />
            ) : waitingForPlayers ? (
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
