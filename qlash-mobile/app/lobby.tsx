import useGameSocket from '@/hook/useGameSocket';
import { socket } from '@/utils/socket';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SimplePlayer } from '../../qlash-shared/types/user';

export default function Hostlobby() {
    const params = useLocalSearchParams();
    const game = params.game as string;

    const [players, setPlayers] = useState<SimplePlayer[]>([]);
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        socket.emit('synclobby', { gameUuid: game });
    }, [game]);

    useGameSocket("synclobby", (data) => {
        const { success, players: playersInLobby, gameCode } = data;
        if (success) {
            setPlayers(playersInLobby);
            setCode(gameCode);
        }
    });

    useGameSocket("startgame", (data) => {
        const { success, message, gameId } = data;
        if (success) {
            router.push(`/game?game=${gameId}`);
        }
    });

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.codeContainer}>
                    <Text style={styles.codeTitle}>Game Code:</Text>
                    <View style={styles.codeTextContainer}>
                        <Text style={styles.codeText}>{code}</Text>
                    </View>
                </View>
                <View style={styles.playersContainer}>
                    <Text style={styles.playerTitle}>Players :</Text>
                    <View style={styles.playerContainer}>
                        {players.map((player, index) => (
                            <View key={index} style={styles.player}>
                                <Text style={styles.playerText}>
                                    {player.username}
                                </Text>
                            </View>
                        ))}
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
        width: '100%',
        paddingVertical: 80,
        justifyContent: 'space-between',
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
        width: '100%',
    },
    codeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#694aff',
    },
    codeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#694aff',
    },
    codeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    playersContainer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#694aff',
    },
    player: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#dbeafe',
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
    playerText: {
        fontSize: 16,
        color: '#193ab2',
    },
});
