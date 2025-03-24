import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Linking, Platform } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import UserCard from '@/components/shared/userCard'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TopCards from '@/components/shared/topCards'
import LessonCard from '@/components/shared/lessonCard'
import { Insta, Logo, Tg, Wb, Yt } from '@/constants/images'
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useToken } from '@/hooks/useAuth'
import { getUserInfo } from '@/api/api'
import { HomeType } from '@/types/type'
import { useUser } from '@/hooks/useUser'
import TextS from '@/components/shared/TextS'
import DebtCard from '@/components/shared/debtCard'
import Carousel from '@/components/shared/corusel'
import UserHome from '@/components/shared/userHome'

const LinkData = [
    { id: 0, link: 'https://www.instagram.com/pdpuz.junior', image: Insta },
    { id: 1, link: 'https://youtube.com/@pdpjunioruz', image: Yt },
    { id: 2, link: 'https://t.me/PDPJunior', image: Tg },
    { id: 3, link: 'https://junior.pdp.uz', image: Wb },
]

import { useFocusEffect } from '@react-navigation/native';


// ...



export default function Index() {
    const { token } = useToken();
    const { user } = useUser();
    const [data, setData] = useState<HomeType>();
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();


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
                setRefreshing(true);
                const response = await getUserInfo(token, id);

                console.log(response.data);

                setData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setRefreshing(false);
            }
        }
    };


    const payment = () => {
        router.push('/screens/Payment')
    }

    useEffect(() => {
        console.log('log from home');
        console.log(user?.fullName, user?.id);
    }, [user])



    const { top } = useSafeAreaInsets();

    return (
        <ScrollView
            style={{ backgroundColor: '#f2f2f2' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => (fetchData(user?.id))} />
            }
        >
            <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? top + 20 : top }]}>
                <View style={styles.logo}>
                    <Image source={{ uri: Logo }} style={{ width: 147, height: 51 }} />
                </View>
                {data ? (
                    <>
                        <View style={{ paddingHorizontal: 20, width: '100%' }}>
                            {data && <UserHome name={data?.student.fullName} group={data.group} photoId={data.student.photoId} />}
                        </View>
                        {data && data.allDebtor > 0 ? (
                            <View style={{ width: '100%', marginTop: 16 }}>
                                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                                    <DebtCard debt={data?.allDebtor} />
                                    <TouchableOpacity
                                        onPress={payment}
                                        style={styles.payButton}
                                        activeOpacity={0.9}
                                    >
                                        <TextS style={styles.payButtonText}>Qarzni so‘ndirish</TextS>
                                    </TouchableOpacity>
                                </View>
                                <Carousel />
                                <View style={styles.followUsContainer}>
                                    <TextS style={styles.followUsText}>Bizni kuzatib boring</TextS>
                                    <View style={styles.linksContainer}>
                                        {LinkData.map(item => (
                                            <TouchableOpacity key={item.id} onPress={() => Linking.openURL(item.link)}>
                                                <Image source={{ uri: item.image }} style={styles.icon} />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <View style={{ paddingHorizontal: 20, width: '100%' }}>
                                    <TopCards att={data?.attendanceAveragePercent} coin={data?.activeCoin} />
                                    {data?.lesson && <LessonCard data={data} />}
                                </View>
                                <Carousel />
                            </View>
                        )}
                    </>
                ) : (
                    <View style={{ paddingHorizontal: 20, width: '100%', height: 500, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <TextS style={{ color: '#ccc', fontSize: 18, fontWeight: 'bold' }}>No data aviable</TextS>
                    </View>
                )}
            </View>

            {/* <TouchableOpacity onPress={() => router.navigate('/screens/Skelton')}>
                <TextS>GO TO SKELTON</TextS>
            </TouchableOpacity> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
    },
    logo: {
        marginBottom: 34,
    },
    payButton: {
        height: 50,
        width: '100%',
        marginTop: 10,
        backgroundColor: '#02EFFF',
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#002930',
    },
    followUsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    followUsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#002930',
        marginBottom: 20,
    },
    linksContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        justifyContent: 'space-between',
    },
    icon: {
        width: 60,
        height: 60,
    },
});
