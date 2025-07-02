import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    ScrollView,
} from 'react-native';
import { sliderInformations } from '@/constants/OnBoarding';
import React, { useRef, useState, useEffect } from 'react';
import Dot from '@/components/onBoarding/Dot';
import RenderSlide from '@/components/renders/RenderSlider';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';

const { width } = Dimensions.get('window');

export default function OnBoarding() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const dotAnimations = useRef(
        sliderInformations.map((_, i) => ({
            width: new Animated.Value(i === 0 ? 40 : 10),
            opacity: new Animated.Value(i === 0 ? 1 : 0.5),
        }))
    ).current;

    useEffect(() => {
        scrollX.setValue(0);
        dotAnimations.forEach((dot, i) => {
            dot.width.setValue(i === 0 ? 40 : 10);
            dot.opacity.setValue(i === 0 ? 1 : 0.5);
        });
    }, [dotAnimations, scrollX]);

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const position = value / width;
            sliderInformations.forEach((_, i) => {
                const dist = Math.abs(position - i);
                dotAnimations[i].width.setValue(dist < 1 ? 40 - dist * 30 : 10);
                dotAnimations[i].opacity.setValue(
                    dist < 1 ? 1 - dist * 0.5 : 0.5
                );
            });

            const newIndex = Math.round(position);
            if (
                newIndex !== currentIndex &&
                newIndex >= 0 &&
                newIndex < sliderInformations.length
            ) {
                setCurrentIndex(newIndex);
            }
        });

        return () => scrollX.removeListener(listener);
    }, [currentIndex, dotAnimations, scrollX]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false,
        }
    );

    const onScrollEnd = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index >= 0 && index < sliderInformations.length)
            setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: '100%',
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={onScrollEnd}
                    contentContainerStyle={{ flexGrow: 1 }}
                    decelerationRate="fast"
                >
                    {sliderInformations.map((item, i) => (
                        <RenderSlide key={i} item={item} />
                    ))}
                </ScrollView>

                <View style={styles.paginationContainer}>
                    {sliderInformations.map((_, i) => (
                        <Dot
                            key={i}
                            index={i}
                            currentIndex={currentIndex}
                            dotAnimations={dotAnimations}
                        />
                    ))}
                </View>
                <View style={styles.divider} />
                <Button
                    action={() => {
                        router.push('/joinGame');
                    }}
                    text="JOIN A GAME"
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
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 30,
    },
});
