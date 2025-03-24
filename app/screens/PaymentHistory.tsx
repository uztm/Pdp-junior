import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToken } from '@/hooks/useAuth';
import { getPaymentHistory, getUserInfo } from '@/api/api';
import UserCard from '@/components/shared/userCard';
import { useUser } from '@/hooks/useUser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeType, Payment } from '@/types/type';
import { Image } from 'expo-image';
import { Cancel, Check } from '@/constants/images';
import TextS from '@/components/shared/TextS';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function PaymentHistory() {
    const { user, isLoading } = useUser();
    const { top, bottom } = useSafeAreaInsets()
    const [data, setData] = useState<Payment[]>([]); // Initialize as an empty array


    const { token } = useToken(); // Теперь следим за `isLoading`
    const [dataUser, setDataUser] = useState<HomeType>()

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                console.log("User ID found:", user.id);
                get()
                fetchData(user.id)
            }
        }, [user?.id, token]) // Теперь зависимость корректная
    );


    const get = async () => {
        try {
            const response = await getPaymentHistory(token, user?.id);
            setData(response.data)
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async (id: any) => {
        if (token && id) {
            try {

                const response = await getUserInfo(token, id);
                setDataUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const router = useRouter()

    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0'); // Day with leading zero
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month with leading zero
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0'); // Hours with leading zero
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes with leading zero

        return `${day}.${month}.${year} / ${hours}:${minutes}`;
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('en-GB').format(amount);
    };


    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="#02EFFF" />
                </TouchableOpacity>
                <TextS style={styles.title}>Tranzaksiyalar</TextS>
                <TextS>{'       '}</TextS>
            </View>
            <UserCard name={dataUser ? dataUser.student.fullName : 'Full Name'} group={dataUser ? dataUser.group : 'Group'} />
            <ScrollView style={{ marginTop: 20 }}>
                <View style={styles.warapper}>
                    {data.length > 0 ? (
                        data.map((payment, index) => (
                            <View key={payment.id} style={styles.card}>
                                <View style={styles.box}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 24, height: 24 }}>
                                            <Image
                                                source={{
                                                    uri: payment.canceled ? Cancel : Check,
                                                }}
                                                style={{ width: 24, height: 24 }}
                                            />
                                        </View>
                                        <TextS style={{ fontSize: 20, fontWeight: 'bold', color: '#00414C', marginLeft: 8 }}>
                                            {formatMoney(payment.amount)} so‘m

                                        </TextS>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 24, height: 24 }}></View>
                                        <TextS style={{ color: '#BBBDC3' }}>{formatDate(payment.date)}</TextS>
                                    </View>
                                </View>

                                <TextS style={{ marginLeft: 34, color: '#BBBDC3', fontWeight: '600' }}>
                                    {payment.canceled ? 'Ha' : 'T\'olangan'}
                                </TextS>

                                {/* Dashed Line except for the last item */}
                                {index < data.length - 1 && (
                                    <View style={styles.dashedLine} />
                                )}
                            </View>
                        ))
                    ) : (
                        <Text>No payment history available</Text>
                    )}


                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2F2F2',
        alignItems: 'center'
    },
    title: {
        color: '#002930',
        fontSize: 24,
        fontWeight: 'bold'
    },
    card: {
        width: '100%',
    },
    dashedLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#f2f2f2',
        marginVertical: 10
    },
    warapper: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginTop: 30
    },
    box: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})