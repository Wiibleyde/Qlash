import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/ui/Input';
import React from 'react';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function SignUp() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Hello There</Text>
                <View style={styles.inputContainer}>
                    <Input
                        title="Email"
                        placeholder="Email"
                        type="emailAddress"
                    />
                    <Input
                        title="Password"
                        placeholder="Password"
                        type="password"
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    text="Sign In"
                    action={() => {
                        router.push('/joinGame');
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
    subtitle_container: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#694aff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#694aff',
    },
    label: {
        fontSize: 16,
    },
});
