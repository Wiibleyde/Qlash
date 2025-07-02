import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';

type PuzzleProps = {
    data: { key: string; label: string }[];
    onDataChange?: (data: { key: string; label: string }[]) => void;
};

export default function Puzzle({
    data: initialData,
    onDataChange,
}: PuzzleProps) {
    const [data, setData] = useState(initialData);

    const handleDragEnd = ({ data }: { data: typeof initialData }) => {
        setData(data);
        if (onDataChange) {
            onDataChange(data);
        }
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
                data={data}
                onDragEnd={handleDragEnd}
                scrollEnabled={false}
                keyExtractor={(item) => item.key}
                renderItem={({ item, drag }) => (
                    <View style={styles.item}>
                        <Text onLongPress={drag}>{item.label}</Text>
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
                    action={() => {
                        if (onDataChange) {
                            onDataChange(data);
                        }
                    }}
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
