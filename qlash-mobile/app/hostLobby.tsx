import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { socket } from '@/utils/socket';
import { SimplePlayer } from '../../qlash-shared/types/user'
import { toast } from 'sonner-native';
import { useLocalSearchParams } from 'expo-router';

export default function Hostlobby() {
    const params = useLocalSearchParams();
    const game = params.game as string;

    const [players, setPlayers] = useState<SimplePlayer[]>([]);
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        socket.on("synclobby", (data) => {
            if (!data) return;
            const { success, players: playersInLobby, gameCode } = data;
            if (success) {
                setPlayers(playersInLobby);
                setCode(gameCode);
            } else {
                toast.error("Erreur lors de la synchronisation des joueurs dans la salle.");
            }
        })
        socket.emit("synclobby", { gameUuid: game });
        return () => {
            socket.off("synclobby");
        };
    }, []);

    return (
        <View style={styles.container}>
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
                            <Text>{player.username}</Text>
                        </View>
                    ))}
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
