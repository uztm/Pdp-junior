import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import React from 'react'
import TextS from '@/components/shared/TextS'
import { Image } from 'expo-image'
import { getChilds } from '@/api/api'
import { useToken } from '@/hooks/useAuth'
import { Front, Logo, PyBanner, Roboto, Scratch } from '@/constants/images'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {

    const { token } = useToken(); // Теперь следим за `isLoading`
    const { top } = useSafeAreaInsets()
    const get = async () => {
        try {
            await getChilds(token, '')

        } catch (e) {
            console.log({ e });

        }
    }
    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.header}>
                <TextS style={styles.title}>Courses</TextS>
                <Image source={{ uri: Logo }} style={styles.logo} contentFit="cover" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ overflow: 'hidden', width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <View style={{ width: '48%', height: 270, borderRadius: 20, backgroundColor: '#fff' }}>
                        <Image source={{
                            uri: Front
                        }} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={{ overflow: 'hidden', width: '48%', height: 270, borderRadius: 20, backgroundColor: '#fff' }}>
                        <Image source={{
                            uri: PyBanner
                        }} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={{ overflow: 'hidden', width: '48%', height: 270, borderRadius: 20, backgroundColor: '#fff', marginTop: 15 }}>
                        <Image source={{
                            uri: Roboto
                        }} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={{ overflow: 'hidden', width: '48%', height: 270, borderRadius: 20, backgroundColor: '#fff', marginTop: 15 }}>
                        <Image source={{
                            uri: Scratch
                        }} style={{ width: '100%', height: '100%' }} />
                    </View>
                </View>
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
        marginBottom: 10,
    },
    title: {
        color: '#002930',
        fontSize: 24,
        fontWeight: 'bold',
    },
    logo: {
        width: 147,
        height: 51,
    },
})