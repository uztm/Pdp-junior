import { Check, Python, Timer } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native"
import TextS from "./TextS";
import { HomeType } from "@/types/type";
import { useState } from "react";




interface LessonCardProps {
    data: HomeType
}

const LessonCard: React.FC<LessonCardProps> = ({ data }) => {

    const b = ['Qatnashgan', 'Darsda', 'Kelmadi']
    const a = ['TUGAGAN', 'BOSHLANGAN', '-']
    const [lessonStatus, setLessonStatus] = useState(a[2])
    const [attStatus, setAttStatus] = useState(b[2])


    const formatTimeFromString = (time: string) => {
        const [hours, minutes] = time.split(":"); // Split the string into hours and minutes
        return `${hours}:${minutes}`;
    };
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.image}>
                    <Image
                        source={{ uri: Python }}
                        style={{ width: 50, height: 50 }}
                        contentFit="cover"  // Ensures high-quality scaling
                        priority="high"      // Loads images with higher priority
                        cachePolicy="memory-disk" // Caches images for better performance
                    />
                </View>
                <View style={{ marginLeft: 16, height: 60, justifyContent: 'space-between' }}>
                    <TextS style={{ fontSize: 30, fontWeight: 'bold', }}>{data.group}</TextS>

                    <TextS style={{ color: '#00CDDB', fontSize: 14, fontWeight: '400' }}>{data.lesson.lessonDate[2]}.{data.lesson.lessonDate[1]}.{data.lesson.lessonDate[0]} / {formatTimeFromString(data.lessonStartTime)} - {formatTimeFromString(data.lessonEndTime)}</TextS>
                </View>
            </View>

            <View style={{ height: '70%', justifyContent: 'space-between' }}>
                <View style={{ marginTop: 20 }}>
                    <View style={[styles.stat, { marginBottom: 7, backgroundColor: '#E6FCFE' }]}>
                        <TextS style={{ fontSize: 18, color: '#00414C', fontWeight: 'bold' }}>Coin</TextS>
                        <TextS style={{ fontSize: 18, color: '#00414C', fontWeight: 'bold' }}>{data.lesson.coin}</TextS>
                    </View>
                    <View style={[styles.stat, { backgroundColor: data.lesson.attendance === 'Kelmadi' ? '#FFF4F4' : '#F9FFF4' }]}>
                        <TextS style={{ fontSize: 18, color: '#00414C', fontWeight: 'bold' }}>Davomat</TextS>
                        <TextS style={{ fontSize: 18, color: data.lesson.attendance === 'Kelmadi' ? '#EA4017' : '#5BB600', fontWeight: 'bold', }}>{data.lesson.attendance}</TextS>
                    </View>
                </View>
                <View style={{
                    width: '100%', height: 38, borderRadius: 14, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
                    backgroundColor: data.lesson.status === '-' ? '#FFFEF6' : '#F9FFF4',
                    borderColor: data.lesson.status === '-' ? '#F98900' : '#6FDD00',
                }}>
                    <Image source={{
                        uri: data.lesson.status === '-' ? Timer : Check
                    }}
                        style={{ width: 24, height: 24 }}
                    />
                    <TextS style={{
                        fontSize: 16, fontWeight: 'bold', marginLeft: 8,
                        color: data.lesson.status === '-' ? '#F98900' : '#63C700',
                    }}>{data.lesson.status === '-' ? 'Endi boshlanadi' : data.lesson.status}</TextS>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 270,
        backgroundColor: '#fff',
        borderRadius: 14,
        marginTop: 16,
        padding: 16
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 69,
        height: 69,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 14
    },
    stat: {
        width: '100%',
        height: 38,
        borderRadius: 14,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14

    }
})

export default LessonCard;