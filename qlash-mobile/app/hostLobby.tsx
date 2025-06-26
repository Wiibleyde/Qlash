import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Hostlobby() {
    return (
        <View style={styles.container}>
            <View style={styles.codeContainer}>
                <Text style={styles.codeTitle}>Game Code:</Text>
                <View style={styles.codeTextContainer}>
                    <Text style={styles.codeText}>123456</Text>
                </View>
            </View>
            <View style={styles.playersContainer}>
                <Text style={styles.playerTitle}>Players :</Text>
                <View style={styles.playerContainer}>
                    <View style={styles.player}>
                        <Text>Player 1</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    codeTextContainer: {
        padding: 10,
        backgroundColor: '#ffe020',
        borderRadius: 8,
        alignItems: 'center',
    },
    codeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    codeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    codeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
        width: '100%',
    },
    playersContainer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    player: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
});
