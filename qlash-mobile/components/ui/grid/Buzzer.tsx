import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import React from 'react';
import { View } from 'react-native';

type Player = {
    username: string;
    socketId?: string;
    score: number;
}

type BuzzerProps = {
    playersBuzzed: string;
    players: Player[];
    onBuzz: () => void;
    isBuzzed: boolean;
    buzzerAnswer: string;
    onAnswerChange: (answer: string) => void;
    onSubmitAnswer: () => void;
}

export default function Buzzer({
    playersBuzzed,
    players,
    onBuzz,
    isBuzzed,
    buzzerAnswer,
    onAnswerChange,
    onSubmitAnswer
}: BuzzerProps) {

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                paddingVertical: 85,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {isBuzzed ? (
                <>
                    <Input
                        placeholder="Enter your answer"
                        style={{
                            width: '80%',
                            marginBottom: 20,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        }}
                        value={buzzerAnswer}
                        onChangeText={onAnswerChange}
                    />
                    <Button
                        action={() => {
                            onSubmitAnswer();
                        }}
                        text="Submit"
                        variants="primary"
                    />
                </>
            ) : (
                <Button
                    action={() => {
                        onBuzz();
                    }}
                    text="Press Buzzer"
                    variants="buzzer"
                />
            )}
        </View>
    );
}
