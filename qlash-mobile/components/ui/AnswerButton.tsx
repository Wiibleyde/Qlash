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
    }
};

const getTrueFalseButtonStyle = (type: 'classic' | 'true' | 'false') => {
    switch (type) {
        case 'classic':
            return styles.button;
        case 'true':
            return styles.trueButton;
        case 'false':
            return styles.falseButton;
        default:
            return styles.button;
    }
};

export default function AnswerButton({
    action,
    text,
    variant = 'blue',
    type = 'classic',
}: {
    action?: () => void;
    text?: string;
    variant?: 'red' | 'blue' | 'yellow' | 'green';
    type?: 'classic' | 'true' | 'false';
}) {
    return (
        <TouchableOpacity
            onPress={action}
            style={[getTrueFalseButtonStyle(type), getButtonStyle(variant)]}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    trueButton: {
        padding: 15,
        backgroundColor: '#00c950',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    falseButton: {
        padding: 15,
        backgroundColor: '#fa2c37',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
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
