import { View, Text, TextInput } from 'react-native';
import React from 'react';

interface InputProps extends React.ComponentProps<typeof TextInput> {
    title?: string;
    placeholder?: string;
    type?: 'emailAddress' | 'password' | 'username';
}

export default function Input({
    title,
    placeholder,
    type,
    ...props
}: InputProps) {
    return (
        <View
            style={{
                width: '100%',
                marginVertical: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
            }}
        >
            <Text>{title}</Text>
            <TextInput
                {...props}
                placeholder={placeholder}
                style={{
                    borderColor: '#6200ee',
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    width: '100%',
                }}
                textContentType={type}
                secureTextEntry={type === 'password'}
                keyboardType={
                    type === 'emailAddress' ? 'email-address' : 'default'
                }
            />
        </View>
    );
}
