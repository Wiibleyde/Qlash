import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Player from '@/components/ui/scoreboard/player';
import Button from '@/components/ui/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { socket } from '@/utils/socket';

interface Player {
    username: string;
    score: number;
    socketId: string;
}

export default function Scoreboard() {
    const params = useLocalSearchParams();
    const game = params.game as string;

    const [scoreboardPlayers, setScoreboardPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://${process.env.EXPO_PUBLIC_HOST}:8000/game/${game}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data);
            setScoreboardPlayers(data.leaderboard.players);
        };

        fetchData();
    }, [game]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scoreboard</Text>
            <View style={styles.divider} />
            <View style={styles.contentWrapper}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {scoreboardPlayers.map((player, index) => (
                        <Player
                            isCurrentPlayer={player.socketId === socket.id}
                            key={player.username}
                            index={index + 1}
                            name={player.username}
                            score={player.score}
                        />
                    ))}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        action={() => { router.replace('/') }}
                        text="Next"
                        variants="secondary"
                        disabled={false}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#694aff',
        paddingTop: 85,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    divider: {
        width: '90%',
        height: 2,
        backgroundColor: '#fff',
        marginBottom: 20,
        opacity: 0.5,
    },
    contentWrapper: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    buttonContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        backgroundColor: '#694aff',
    },
});
