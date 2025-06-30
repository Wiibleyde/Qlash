import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type PlayerProps = {
    index: number;
    name: string;
    score: number;
    isCurrentPlayer?: boolean;
};

export default function Player({
    index,
    name,
    score,
    isCurrentPlayer,
}: PlayerProps) {
    return (
        <View
            style={[
                styles.playerContainer,
                isCurrentPlayer && styles.currentPlayerIndicator,
            ]}
        >
            <View style={styles.playerInfoContainer}>
                <Text
                    style={[
                        styles.playerText,
                        isCurrentPlayer && styles.currentPlayerText,
                    ]}
                >
                    {index}
                </Text>
                <Text
                    style={[
                        styles.playerText,
                        isCurrentPlayer && styles.currentPlayerText,
                    ]}
                >
                    {name}
                </Text>
            </View>
            <Text
                style={[
                    styles.playerScore,
                    isCurrentPlayer && styles.currentPlayerScore,
                ]}
            >
                {score}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: '#694aff',
    },
    playerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    currentPlayerIndicator: {
        backgroundColor: '#fff',
    },
    playerText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#fff',
    },
    playerScore: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    currentPlayerText: {
        color: '#000',
    },
    currentPlayerScore: {
        color: '#000',
    },
});
