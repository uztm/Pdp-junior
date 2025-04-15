import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Otp } from '@/api/api';
import { setToken } from '../../hooks/useAuth';
import { setPhoneNumber, setUser, updateUserId, useUser } from '@/hooks/useUser';
import TextS from '@/components/shared/TextS';
import HomeIcon from '@/constants/Phone';
import { TouchableWithoutFeedback } from 'react-native';

const OTPScreen = () => {
    const { top } = useSafeAreaInsets();
    const { smsId, phone } = useLocalSearchParams();
    const { setUserState } = useUser();
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const otpLength = 6;

    const handleOtpChange = (text: string, index: number) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);

        if (text && index < otpLength - 1) {
            setActiveIndex(index + 1);
        }
    };

    const handleBackspace = (index: number) => {
        if (otp[index] === '' && index > 0) {
            setActiveIndex(index - 1);
        }
    };

    const handleSubmit = async () => {
        const otpString = otp.join('');
        setLoading(true);
        setError('');

        const response = await Otp(phone, smsId, otpString);
        setLoading(false);

        if (response.success) {
            const { token, students } = response.data;
            const user = students[0];
            await setToken(token);
            await setUser(user.fullName, 'Group', setUserState);
            await setPhoneNumber(phone.toString(), setUserState);
            await updateUserId(user.id, setUserState);
            router.push('/(tabs)/(home)');
        } else {
            setError(response.errors?.[0]?.errorMsg || 'An error occurred');
        }
    };

    useEffect(() => {
        console.log({smsId});
        
        if (inputRefs.current[activeIndex]) {
            inputRefs.current[activeIndex]?.focus();
        }
    }, [activeIndex]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ paddingTop: top, alignItems: 'center' }}>
                        <TextS style={styles.title}>Kirish</TextS>
                        <TouchableOpacity onPress={Keyboard.dismiss} style={styles.iconContainer}>
                            <HomeIcon />
                        </TouchableOpacity>
                        <View style={styles.infoContainer}>
                            <TextS style={styles.title}>SMS kodni kiriting</TextS>
                            <TextS style={styles.subtitle}>
                                Tasdiqlash uchun sms ko'di {'+998' + phone} raqamiga yuborildi
                            </TextS>
                        </View>
                        <View style={styles.otpContainer}>
                            {Array.from({ length: otpLength }).map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    style={[styles.otpInput, activeIndex === index && styles.activeInput]}
                                    maxLength={1}
                                    placeholder="-"
                                    placeholderTextColor={'#ccc'}
                                    keyboardType="numeric"
                                    value={otp[index]}
                                    onChangeText={(text) => handleOtpChange(text, index)}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            handleBackspace(index);
                                        }
                                    }}
                                    onFocus={() => setActiveIndex(index)}
                                />
                            ))}
                        </View>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <View style={[styles.buttonContainer, { marginBottom: Platform.OS === 'android' ? 20 : null }]}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                                {loading ? <ActivityIndicator size="small" color="#fff" /> : <TextS style={styles.buttonText}>Yuborish</TextS>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#002930',
    },
    iconContainer: {
        width: 162,
        height: 162,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
    },
    subtitle: {
        color: '#494949',
        textAlign: 'center',
        width: '70%',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
        marginTop: 30,
    },
    otpInput: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        borderRadius: 10,
        fontFamily: 'Nunito',
    },
    activeInput: {
        borderColor: '#02EFFF',
        borderWidth: 0.5,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#02EFFF',
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#002930',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 14,
    },
});

export default OTPScreen;
