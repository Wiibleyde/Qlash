import { View, StyleSheet } from 'react-native';
import React from 'react';
import AnswerButton from '@/components/ui/AnswerButton';

type TrueFalseProps = {
    setAnswersSelectedBool: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TrueFalse({ setAnswersSelectedBool }: TrueFalseProps) {
    return (
        <View style={styles.answerButtonsContainer}>
            <AnswerButton
                action={() => {
                    setAnswersSelectedBool(true);
                }}
                text="True"
                type="true"
                variant="green"
            />
            <AnswerButton
                action={() => {
                    setAnswersSelectedBool(true);
                }}
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
