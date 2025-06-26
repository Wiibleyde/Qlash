import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Button({
    action,
    text,
    variants,
}: {
    action?: () => void;
    text?: string;
    variants?: 'primary' | 'secondary';
}) {
    return (
        <TouchableOpacity
            onPress={action}
            style={[
                styles.button,
                variants === 'primary'
                    ? styles.buttonPrimary
                    : styles.buttonSecondary,
            ]}
        >
            <Text
                style={[
                    styles.buttonText,
                    variants === 'primary'
                        ? styles.buttonPrimaryText
                        : styles.buttonSecondaryText,
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderRadius: 70,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonPrimary: {
        backgroundColor: '#694aff',
    },
    buttonSecondary: {
        backgroundColor: '#f1edff',
    },
    buttonPrimaryText: {
        color: '#fff',
    },
    buttonSecondaryText: {
        color: '#694aff',
    },
});
