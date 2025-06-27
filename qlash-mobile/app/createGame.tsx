import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { router, useRouter } from 'expo-router';
import { socket } from '@/utils/socket';

export default function CreateGame() {
    const [username, setUsername] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        socket.on('create', (data) => {
            const { gameUuid } = data;
            router.push(`/hostLobby?game=${gameUuid}`);
        });
        return () => {
            socket.off('create');
        };
    }, []);

    const handleCreateGame = () => {
        socket.emit('create', { username });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Create</Text>
                <View style={styles.inputContainer}>
                    <Input
                        title="Username"
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    text="Create"
                    action={handleCreateGame}
                    variants="primary"
                />
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
