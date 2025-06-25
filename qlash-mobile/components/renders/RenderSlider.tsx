import { Dimensions, StyleSheet, View, Text } from 'react-native';
import MultipleChoiceSvg from '../ui/onBoarding/MultipleChoiceSvg';
import SpaceSvg from '../ui/onBoarding/SpaceSvg';
import BuddiesSvg from '../ui/onBoarding/BuddiesSvg';

interface RenderSlideProps {
    item: {
        title: string;
        index: number;
    };
}

const RenderSlide = ({
    item
}: RenderSlideProps) => {
    const getSlideComponent = () => {
        switch (item.index) {
            case 1:
                return <MultipleChoiceSvg width={300} />;
            case 2:
                return <SpaceSvg width={300} />;
            case 3:
                return <BuddiesSvg width={300} />;
        }
    };
                
    return (
        <View style={styles.slideContainer}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {getSlideComponent()}
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
        </View>
    );
};

export default RenderSlide;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    slideContainer: {
        width: width,
        height: height * 0.7,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 60,
    },
    slideTitle: {
        color: '#333',
        textAlign: 'center',
        fontSize: 38,
        fontWeight: 'bold',
    },
});