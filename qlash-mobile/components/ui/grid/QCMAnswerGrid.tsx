import { View, StyleSheet } from 'react-native';
import React from 'react';
import AnswerButton from '@/components/ui/AnswerButton';

type QCMAnswerGridProps = {
    setAnswersSelectedBool: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QCMAnswerGrid({
    setAnswersSelectedBool,
}: QCMAnswerGridProps) {
    return (
        <View style={styles.answerButtonsContainer}>
            <AnswerButton
                action={() => {
                    setAnswersSelectedBool(true);
                }}
                text="Answer 1"
                variant="red"
            />
            <AnswerButton
                action={() => {
                    setAnswersSelectedBool(true);
                }}
                text="Answer 2"
                variant="blue"
            />
            <AnswerButton
                action={() => {
                    setAnswersSelectedBool(true);
                }}
                text="Answer 3"
                variant="yellow"
            />
            <AnswerButton
                action={() => {
                    setAnswersSelectedBool(true);
                }}
                text="Answer 4"
                variant="green"
            />
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
