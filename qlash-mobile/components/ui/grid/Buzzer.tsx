import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Buzzer() {
    const [buzzerPressed, setBuzzerPressed] = useState(false);

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
            {buzzerPressed ? (
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
                    onSubmitEditing={() => {
                        // Handle answer submission logic here
                        setBuzzerPressed(false);
                    }}
                />
            ) : (
                <Button
                    action={() => {
                        setBuzzerPressed(true);
                    }}
                    text="Press Buzzer"
                    variants="buzzer"
                />
            )}
        </View>
    );
}
