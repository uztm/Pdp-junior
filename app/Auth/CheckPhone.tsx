import {
    View, TextInput, TouchableOpacity, StyleSheet, Platform,
    KeyboardAvoidingView, Keyboard, Animated, Dimensions,
    Image, ActivityIndicator, ScrollView
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import TextS from '@/components/shared/TextS'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import HomeIcon from '@/constants/Phone'
import { Login } from '@/api/api'
import { useRouter } from 'expo-router'
import { Flag } from '@/constants/images'

export default function CheckPhone() {
    const { top } = useSafeAreaInsets()
    const router = useRouter()
    const translateY = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(0)).current
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const showError = (message: string) => {
        setErrorMessage(message)
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start(() => setErrorMessage(''))
            }, 2000)
        })
    }

    const LoginFunc = async () => {
        setLoading(true)
        try {
            const response = await Login(phone)

            if (response.success) {
                if (response.data) {
                    router.navigate({ pathname: response.data.hasPassword ? '/Auth/Password' : '/Auth/NewPassword', params: { phone } })
                }
            } else if (response.errors?.[0]?.errorCode === 3002) {
                showError('Foydalanuvchi topilmadi')
            }
        } catch (e) {
            console.log('Login error:', e)
        } finally {
            setLoading(false)
        }
    }

    // const Content = () => (
    //     return 0
    // )

    return Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            onTouchStart={() => Keyboard.dismiss()}
        >
            <View style={styles.inner}>
                <View style={{ paddingTop: top, alignItems: 'center' }}>
                    <TextS style={styles.title}>Kirish</TextS>

                    <View style={styles.iconContainer}>
                        <HomeIcon />
                    </View>

                    <View style={styles.infoContainer}>
                        <TextS style={styles.title}>Kirish / Ro‘yxatdan o‘tish</TextS>
                        <TextS style={styles.subtitle}>
                            Tasdiqlash kodini olish uchun quyidagi maydonga telefon raqamingizni kiriting.
                        </TextS>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.phoneCode}>
                            <Image source={{ uri: Flag }} style={{ width: 28, height: 20 }} />
                            <TextS style={styles.phoneText}>+998</TextS>
                        </View>
                        <TextInput
                            placeholder="XX XXX XX XX"
                            style={styles.input}
                            keyboardType="numeric"
                            placeholderTextColor={'#DFDFDF'}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>

                {errorMessage !== '' && (
                    <Animated.View style={[styles.errorContainer, { opacity }]}>
                        <TextS style={styles.errorText}>{errorMessage}</TextS>
                    </Animated.View>
                )}

                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={LoginFunc}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#002930" />
                    ) : (
                        <TextS style={styles.buttonText}>Davom etish</TextS>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    ) : (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.inner}>
                <View style={{ paddingTop: top, alignItems: 'center' }}>
                    <TextS style={styles.title}>Kirish</TextS>

                    <View style={styles.iconContainer}>
                        <HomeIcon />
                    </View>

                    <View style={styles.infoContainer}>
                        <TextS style={styles.title}>Kirish / Ro‘yxatdan o‘tish</TextS>
                        <TextS style={styles.subtitle}>
                            Tasdiqlash kodini olish uchun quyidagi maydonga telefon raqamingizni kiriting.
                        </TextS>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.phoneCode}>
                            <Image source={{ uri: Flag }} style={{ width: 28, height: 20 }} />
                            <TextS style={styles.phoneText}>+998</TextS>
                        </View>
                        <TextInput
                            placeholder="XX XXX XX XX"
                            style={styles.input}
                            keyboardType="numeric"
                            placeholderTextColor={'#DFDFDF'}
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>

                {errorMessage !== '' && (
                    <Animated.View style={[styles.errorContainer, { opacity }]}>
                        <TextS style={styles.errorText}>{errorMessage}</TextS>
                    </Animated.View>
                )}

                <TouchableOpacity activeOpacity={0.8} style={[styles.button,]} onPress={LoginFunc}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#002930" />
                    ) : (
                        <TextS style={styles.buttonText}>Davom etish</TextS>
                    )}
                </TouchableOpacity>

                
            </View>
            
        </ScrollView>
    )
}

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    inner: {
        justifyContent: 'space-between',
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#002930'
    },
    iconContainer: {
        width: 162,
        height: 162,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 25
    },
    subtitle: {
        color: '#494949',
        textAlign: 'center',
        width: '70%'
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: 30,
        overflow: 'hidden'
    },
    phoneCode: {
        height: '100%',
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phoneText: {
        color: '#00CB82',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 8
    },
    input: {
        width: '60%',
        height: 50,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#00414C',
        fontFamily: 'Nunito'
    },
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    errorText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        width: '100%',
        backgroundColor: '#02EFFF',
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#002930'
    }
})
