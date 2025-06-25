import React from 'react';
import { Animated, StyleSheet } from 'react-native';

interface DotProps {
    index: number;
    currentIndex: number;
    dotAnimations: {
        width: Animated.Value;
        opacity: Animated.Value;
    }[];
}

const Dot = ({ index, currentIndex, dotAnimations }: DotProps) => {
    return (
        <Animated.View
            key={index}
            style={[
                styles.paginationDot,
                {
                    width: dotAnimations[index].width,
                    opacity: dotAnimations[index].opacity,
                    backgroundColor: index === currentIndex ? '#694aff' : 'rgba(0,0,0,0.5)',
                },
            ]}
        />
    );
};

export default Dot;

const styles = StyleSheet.create({
    paginationDot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});