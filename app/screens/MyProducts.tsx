import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BASE_URL, getMyGifts } from '@/api/api';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '@/hooks/useUser';
import { useToken } from '@/hooks/useAuth';
import TextS from '@/components/shared/TextS';

import { Logo } from '@/constants/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

type Data = {
    studentFullName: string,
    coinName: string,
    amountCoin: number,
    verificationCode: string,
    status: string,
    attachmentId: string,
}

export default function MyProducts() {
    const { top } = useSafeAreaInsets()
    const [data, setData] = useState<Data[]>([])
    const { user } = useUser()
    const { token } = useToken();
    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                console.log("User ID found:", user.id);
                fetchData(user.id);  // Вызываем fetchData напрямую с user.id
            }
        }, [user?.id]) // Теперь зависимость корректная
    );


    const fetchData = async (id: any) => {
        if (token && id) {
            try {

                const response = await getMyGifts(token, id);
                console.log(response);
                setData(response.data);

            } catch (error) {
                console.log(error);
            }
        }
    };

    const router = useRouter()
    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.header}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={.8} onPress={() => router.back()}>
                        <AntDesign name="arrowleft" size={24} color="#02EFFF" />
                    </TouchableOpacity>
                    <TextS style={{ color: '#002930', fontSize: 24, fontWeight: 'bold', marginLeft: 10 }}>Sovg'alar</TextS>
                </View>
                <Image
                    source={{ uri: Logo }}
                    style={{ width: 147, height: 51 }}
                    contentFit="cover"
                    priority="high"
                    cachePolicy="memory-disk"
                />
            </View>

            <View style={[styles.notifier]}>
                <MaterialCommunityIcons name="information-outline" size={28} color="#63C700" />
                <TextS style={{ color: '#63C700', fontWeight: '500', marginLeft: 10, width: '90%' }}>Sovg'ani qabul qilish uchun tasdiqlash ko'dini ko'rsating.</TextS>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
                    {data && data.length > 1 ?
                        (
                            data.map((item) => (
                                <View key={item.amountCoin} style={styles.card} >
                                    <View style={[styles.notifier, { backgroundColor: '#E6FCFE', borderColor: '#02EFFF', marginBottom: 10 }]}>
                                        <TextS style={{ color: '#02EFFF', fontWeight: 'bold', fontSize: 24 }}>
                                            {item.verificationCode.replace(/(\d{2})(\d{2})(\d{3})/, '$1-$2-$3')}
                                        </TextS>

                                    </View>
                                    <View style={{ flexDirection: 'row', }}>

                                        <View style={{
                                            width: '100%',
                                            aspectRatio: 1,
                                            backgroundColor: '#f2f2f2',
                                            borderRadius: 12,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Image
                                                source={{ uri: `${BASE_URL}/api/attachment/v1/attachment/download?id=${item.attachmentId}&view=open` }}
                                                style={{ width: '60%', height: '60%', borderRadius: 12 }}

                                            />

                                        </View>
                                    </View>

                                    <TextS style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24, color: '#00414C' }}>{item.coinName}</TextS>
                                    {/* <TextS>{item.amountCoin}</TextS> */}

                                    {/* <TextS>{`${BASE_URL}/api/attachment/v1/attachment/download?id=${item.photoId}&view=open`}</TextS> */}

                                    <View style={[styles.notifier, {
                                        backgroundColor: item.status === 'COMPLETED' ? '#F9FFF4' : '#FFFEF6',
                                        borderColor: item.status === 'COMPLETED' ? '#6FDD00' : '#F98900',

                                    }]}>
                                        {item.status === 'COMPLETED' ? <AntDesign name="checkcircleo" size={24} color="#6FDD00" /> : <Ionicons name="time-outline" size={24} color="#F98900" />}
                                        <TextS style={{ color: item.status === 'COMPLETED' ? '#6FDD00' : '#F98900', fontWeight: '500', marginLeft: 10, width: '90%' }}>
                                            {item.status === 'COMPLETED' ? 'Topshirilgan' : 'Kutilmoqda'}
                                        </TextS>
                                    </View>

                                </View>
                            ))
                        ) : (
                            <View style={{ height: 400, alignItems: 'center', justifyContent: 'center' }}>
                                <TextS style={{ color: '#ccc', fontWeight: 'bold', fontSize: 18 }}>No Gifts Aviable</TextS>
                            </View>
                        )
                    }
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    notifier: {
        backgroundColor: '#F9FFF4',
        borderWidth: 1,
        borderColor: '#6FDD00',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',

    },
    card: {
        width: '48%',
        overflow: 'hidden',
        borderRadius: 14,
        backgroundColor: '#fff',
        marginTop: 10,
        padding: 10,

    }
})