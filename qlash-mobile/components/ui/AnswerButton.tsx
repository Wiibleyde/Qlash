import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const getButtonStyle = (variant: 'red' | 'blue' | 'yellow' | 'green') => {
    switch (variant) {
        case 'red':
            return styles.buttonRed;
        case 'blue':
            return styles.buttonBlue;
        case 'yellow':
            return styles.buttonYellow;
        case 'green':
            return styles.buttonGreen;
        default:
            return styles.button;
    }
};

export default function AnswerButton({
    action,
    text,
    variant = 'blue',
}: {
    action?: () => void;
    text?: string;
    variant?: 'red' | 'blue' | 'yellow' | 'green';
}) {
    return (
        <TouchableOpacity
            onPress={action}
            style={[styles.button, getButtonStyle(variant)]}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        backgroundColor: '#694aff',
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonRed: {
        backgroundColor: '#fa2c37',
    },
    buttonBlue: {
        backgroundColor: '#2c7fff',
    },
    buttonYellow: {
        backgroundColor: '#fdc800',
    },
    buttonGreen: {
        backgroundColor: '#00c950',
    },
});
