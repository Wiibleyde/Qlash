import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AnswerButton from '@/components/ui/AnswerButton';

export default function Game() {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
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
            <View style={styles.answerButtonsContainer}>
                <AnswerButton action={() => {}} text="Answer 1" variant="red" />
                <AnswerButton
                    action={() => {}}
                    text="Answer 2"
                    variant="blue"
                />
                <AnswerButton
                    action={() => {}}
                    text="Answer 3"
                    variant="yellow"
                />
                <AnswerButton
                    action={() => {}}
                    text="Answer 4"
                    variant="green"
                />
            </View>
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
});
