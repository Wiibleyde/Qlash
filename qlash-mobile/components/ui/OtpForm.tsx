import React, { useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInput as RNTextInput,
} from 'react-native';

interface OtpFormProps {
    length: number;
    otp: string[];
    setOtp: (otp: string[]) => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ otp, setOtp, length }) => {
    const inputsRef = useRef<(RNTextInput | null)[]>([]);

    const handleChange = (value: string, idx: number) => {
        const cleanValue = value.replace(/[^0-9]/g, '');
        if (!cleanValue) return;

        const newOtp = [...otp];
        newOtp[idx] = cleanValue[0];
        setOtp(newOtp);

        // Focus suivant
        if (idx < length - 1 && cleanValue) {
            inputsRef.current[idx + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, idx: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (otp[idx]) {
                const newOtp = [...otp];
                newOtp[idx] = '';
                setOtp(newOtp);
            } else if (idx > 0) {
                inputsRef.current[idx - 1]?.focus();
            }
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((char, idx) => (
                <TextInput
                    key={idx}
                    ref={(ref) => {
                        inputsRef.current[idx] = ref;
                    }}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={char}
                    onChangeText={(val) => handleChange(val, idx)}
                    onKeyPress={(e) => handleKeyPress(e, idx)}
                    autoCorrect={false}
                    autoCapitalize="none"
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    input: {
        width: 46,
        height: 46,
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ececec',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default OtpForm;
