import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useToken } from '@/hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { getPatment, getUserInfo } from '@/api/api';
import { useUser } from '@/hooks/useUser';
import { ApiResponsePayment, HomeType } from '@/types/type';
import TextS from '@/components/shared/TextS';
import UserCard from '@/components/shared/userCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Click, Payme, Uzum } from '@/constants/images';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

type PaymentMethods = 'payme' | 'click' | 'uzum';



export default function Payment() {
    const { token } = useToken();
    const [data, setData] = useState<HomeType | null>(null); // Start with null for type safety
    const [paymentData, setPaymentData] = useState<ApiResponsePayment | null>(null); // Initialize as null
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethods | null>(null); // State for selected payment method

    const { top, bottom } = useSafeAreaInsets()
    const { user } = useUser();

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                console.log("User ID found:", user.id);
                fetchData(user.id);
            }
        }, [user?.id]) // Correct dependency
    );

    const fetchData = async (id: string) => {
        if (token && id) {
            try {
                const response = await getUserInfo(token, id);

                // Make sure data exists before calling getPatment
                const invoiceId = response.data.studentDebtors?.[0]?.invoiceId ?? null; // Handle undefined invoiceId gracefully
                if (invoiceId) {
                    const paymentResponse = await getPatment(token, invoiceId);
                    console.log(paymentResponse);
                    setPaymentData(paymentResponse);
                }

                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const formatMoney = (amount: any) => {
        return new Intl.NumberFormat('en-GB').format(amount);
    };

    const handlePaymentMethodSelect = (method: PaymentMethods) => {
        setSelectedMethod(method);
    };

    const handlePayment = () => {
        if (selectedMethod && paymentData) {
            const selectedLink = paymentData.data[selectedMethod]?.link; // Safe access with known method keys
            if (selectedLink) {
                Linking.openURL(selectedLink);
            }
        }
    };

    const router = useRouter()

    return (
        <View style={[styles.container, { paddingTop: top }]}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="#02EFFF" />
                </TouchableOpacity>
                <TextS style={styles.title}>Qarzdorlik</TextS>
                <TextS>{'       '}</TextS>
            </View>
            {/* Check if data is loaded before rendering */}
            <UserCard
                name={data?.student?.fullName ?? 'Full Name'}
                group={data?.group ?? 'Group'}
            />

            <View style={{ marginTop: 30, width: '100%', height: 80, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderRadius: 14 }}>
                <TextS style={{ fontSize: 25, fontWeight: 'bold', color: '#002930' }}>{formatMoney(paymentData?.data.invoiceInfo.mustPaidAmount)} uzs</TextS>
                <TextS style={{ fontSize: 12, color: '#848A9C' }}>To‘lovni amalga oshirish uchun quyidagi ilovalarni tanlang</TextS>
            </View>

            <View style={{ marginTop: 20 }}>
                <TextS style={{ color: '#002930', fontWeight: 'bold', fontSize: 18 }}>To‘lov turini tanlang</TextS>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 15 }}>
                {/* Payme */}
                <TouchableOpacity
                    style={[styles.paymentMethod, selectedMethod === 'payme' && styles.activeMethod]}
                    onPress={() => handlePaymentMethodSelect('payme')}
                >
                    <Image source={{
                        uri: Payme
                    }} style={{ width: 82, height: 23 }} />
                </TouchableOpacity>

                {/* Click */}
                <TouchableOpacity
                    style={[styles.paymentMethod, selectedMethod === 'click' && styles.activeMethod]}
                    onPress={() => handlePaymentMethodSelect('click')}
                >
                    <Image source={{
                        uri: Click
                    }} style={{ width: 82, height: 26 }} />
                </TouchableOpacity>

                {/* Uzum */}
                <TouchableOpacity
                    style={[styles.paymentMethod, selectedMethod === 'uzum' && styles.activeMethod]}
                    onPress={() => handlePaymentMethodSelect('uzum')}
                >
                    <Image source={{
                        uri: Uzum
                    }} style={{ width: 82, height: 31 }} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.continueButton, !selectedMethod && styles.disabledButton]}
                onPress={handlePayment}
                disabled={!selectedMethod}
            >
                <TextS style={{ fontWeight: 'bold', color: '#002930', fontSize: 18 }}>Davom etish</TextS>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    title: {
        color: '#002930',
        fontSize: 24,
        fontWeight: 'bold'
    },
    paymentMethod: {
        flex: 1,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    activeMethod: {
        borderColor: '#02EFFF', // Active border color
    },
    paymentText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#002930',
    },
    continueButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#02EFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 100,
    },
    disabledButton: {
        backgroundColor: '#dcdcdc', // Disabled button color
    }
});
