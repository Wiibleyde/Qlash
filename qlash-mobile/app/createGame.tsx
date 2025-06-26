import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/ui/Input';
import React from 'react';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function createGame() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Create</Text>
                <View style={styles.inputContainer}>
                    <Input
                        title="Username"
                        placeholder="Username"
                        type="username"
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    text="Create"
                    action={() => {
                        router.push('/hostLobby');
                    }}
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
