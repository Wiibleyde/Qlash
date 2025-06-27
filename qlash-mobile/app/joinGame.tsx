import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import OtpForm from '@/components/ui/OtpForm';
import { socket } from '@/utils/socket';
import { router } from 'expo-router';
import { toast } from 'sonner-native';

export default function JoinGame() {
    const [username, setUsername] = useState<string>('');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

    const gameCode = otp.join('');

    const handleJoinGame = () => {
        console.log(
            `Joining game with code: ${gameCode} and username: ${username}`
        );
        socket.emit('join', { username, gameCode });
    };

    useEffect(() => {
        socket.on('join', (data) => {
            const { joined, gameUuid, message } = data;
            if (joined) {
                router.push(`/hostLobby?game=${gameUuid}`);
                console.log(`Joined game with UUID: ${gameUuid}`);
                // Redirect to game page or update UI accordingly
            } else {
                toast.error(
                    `Failed to join game: the information provided is incorrect or the game does not exist.`
                );
                console.error(`Failed to join game: ${message}`);
                // Show error message to user
            }
        });
        return () => {
            socket.off('join');
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Join</Text>
                <View style={styles.inputContainer}>
                    <Input
                        title="Username"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <OtpForm length={6} otp={otp} setOtp={setOtp} />
                <View style={styles.buttonContainer}>
                    <Button
                        text="Create"
                        action={handleJoinGame}
                        variants="primary"
                    />
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    titleContainer: {
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 38,
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
