import { View, Text, StyleSheet } from 'react-native';
import Input from '@/components/ui/Input';
import React from 'react';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function SignUp() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Create an account</Text>
                <View style={styles.subtitle_container}>
                    <Text style={styles.subtitle}>
                        Please complete yout profile.
                    </Text>
                    <Text style={styles.subtitle}>
                        Don&#39;t worry, your data will remain private and only
                        you can see it.
                    </Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Input
                    title="Username"
                    placeholder="Username"
                    type="username"
                />
                <Input title="Email" placeholder="Email" type="emailAddress" />
                <Input
                    title="Password"
                    placeholder="Password"
                    type="password"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    text="Sign up"
                    action={() => {
                        router.push('/createGame');
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
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
