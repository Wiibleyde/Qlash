import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import OtpForm from '@/components/ui/OtpForm';
import { socket } from '@/utils/socket';
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import { joinGame } from '@/services/socket';
import useGameSocket from '@/hook/useGameSocket';

export default function JoinGame() {
    const [username, setUsername] = useState<string>('');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

    const gameCode = otp.join('');

    const handleJoinGame = () => {
        joinGame(username, gameCode);
    };

    useGameSocket("join", (data) => {
        const { success, gameUuid, message } = data;
        if (success) {
            router.push(`/lobby?game=${gameUuid}`);
        } else {
            toast.error(message);
        }
    });

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
                        text="Join"
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
