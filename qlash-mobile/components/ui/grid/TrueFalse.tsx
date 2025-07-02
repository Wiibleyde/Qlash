import { View, StyleSheet } from 'react-native';
import React from 'react';
import AnswerButton from '@/components/ui/AnswerButton';

type TrueFalseProps = {
    handleAnswer: (answer: number) => void;
};

export default function TrueFalse({ handleAnswer }: TrueFalseProps) {
    return (
        <View style={styles.answerButtonsContainer}>
            <AnswerButton
                action={() => handleAnswer(1)}
                text="True"
                type="true"
                variant="green"
            />
            <AnswerButton
                action={() => handleAnswer(0)}
                text="False"
                type="false"
                variant="red"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    answerButtonsContainer: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
});
