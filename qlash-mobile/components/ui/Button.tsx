import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const getButtonStyle = (variants: string) => {
    switch (variants) {
        case 'primary':
            return styles.buttonPrimary;
        case 'secondary':
            return styles.buttonSecondary;
        case 'primaryDisabled':
            return styles.buttonPrimaryDisabled;
        case 'secondaryDisabled':
            return styles.buttonSecondaryDisabled;
        default:
            return styles.buttonPrimary; // Default to primary if no variant is provided
    }
};

export default function Button({
    action,
    text,
    variants,
    disabled = false,
}: {
    action?: () => void;
    text?: string;
    variants?:
        | 'primary'
        | 'secondary'
        | 'primaryDisabled'
        | 'secondaryDisabled';
    disabled?: boolean;
}) {
    return (
        <TouchableOpacity
            onPress={action}
            style={[styles.button, getButtonStyle(variants || 'primary')]}
            disabled={disabled}
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
    buttonPrimaryDisabled: {
        backgroundColor: '#d3d3d3',
    },
    buttonSecondaryDisabled: {
        backgroundColor: '#f1edff',
    },
    buttonPrimaryTextDisabled: {
        color: '#a9a9a9',
    },
    buttonSecondaryTextDisabled: {
        color: '#d3d3d3',
    },
});
