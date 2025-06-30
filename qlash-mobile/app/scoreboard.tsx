import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Player from '@/components/ui/scoreboard/player';
import Button from '@/components/ui/Button';

export default function Scoreboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scoreboard</Text>
            <View style={styles.divider} />
            <View style={styles.contentWrapper}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Player index={1} name="Lytzeer" score={300} />
                    <Player
                        index={2}
                        name="Lytzeer2"
                        score={250}
                        isCurrentPlayer
                    />
                    <Player index={3} name="Lytzeer3" score={200} />
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button
                        action={() => {}}
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
