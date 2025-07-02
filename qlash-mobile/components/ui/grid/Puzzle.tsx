import Button from '@/components/ui/Button';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

type PuzzleProps = {
    options: { id: string; content: string }[];
    selectedOrder: string[];
    onReorder: (newOrder: string[]) => void;
    handleAnswer: (answer: string[]) => void;
};

export default function Puzzle({
    options,
    selectedOrder,
    onReorder,
    handleAnswer,
}: PuzzleProps) {

    const handleDragEnd = ({ data }: { data: { id: string; content: string }[] }) => {
        onReorder(data.map((item) => item.id));
    };

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                paddingVertical: 85,
            }}
        >
            <DraggableFlatList
                data={options}
                onDragEnd={handleDragEnd}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, drag }) => (
                    <View style={styles.item}>
                        <Text onLongPress={drag}>{item.content}</Text>
                    </View>
                )}
            />
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 85,
                }}
            >
                <Button
                    action={() => handleAnswer(selectedOrder)}
                    text="Submit"
                    variants="primary"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
});
