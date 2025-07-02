import { View, StyleSheet } from 'react-native';
import React from 'react';
import AnswerButton from '@/components/ui/AnswerButton';

type QCMAnswerGridProps = {
    answers: { id: string; content: string }[];
    handleAnswer: (answer: number) => void;
};

const getAnswerButtonVariant = (index: number) => {
    switch (index) {
        case 1:
            return 'red';
        case 2:
            return 'blue';
        case 3:
            return 'yellow';
        case 4:
            return 'green';
        default:
            return 'red';
    }
}

export default function QCMAnswerGrid({
    answers,
    handleAnswer,
}: QCMAnswerGridProps) {
    return (
        <View style={styles.answerButtonsContainer}>
            {answers.map((answer, index) => (
                <AnswerButton
                    key={answer.id}
                    action={() => handleAnswer(index)}
                    text={answer.content}
                    variant={getAnswerButtonVariant(index)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    answerButtonsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        flexWrap: 'wrap',
        gap: 10,
    },
});
