import { View, Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

const LessonCardSkeleton = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.image}>
                    <Animated.View style={[styles.skeleton, { opacity, width: 50, height: 50, borderRadius: 10 }]} />
                </View>
                <View style={{ marginLeft: 16, height: 60, justifyContent: 'space-between' }}>
                    <Animated.View style={[styles.skeleton, { opacity, width: 120, height: 24, borderRadius: 4 }]} />
                    <Animated.View style={[styles.skeleton, { opacity, width: 180, height: 16, borderRadius: 4 }]} />
                </View>
            </View>

            <View style={{ height: '70%', justifyContent: 'space-between' }}>
                <View style={{ marginTop: 20 }}>
                    <View style={[styles.stat, { marginBottom: 7 }]}> 
                        <Animated.View style={[styles.skeleton, { opacity, width: 80, height: 18, borderRadius: 4 }]} />
                        <Animated.View style={[styles.skeleton, { opacity, width: 40, height: 18, borderRadius: 4 }]} />
                    </View>
                    <View style={styles.stat}>
                        <Animated.View style={[styles.skeleton, { opacity, width: 80, height: 18, borderRadius: 4 }]} />
                        <Animated.View style={[styles.skeleton, { opacity, width: 40, height: 18, borderRadius: 4 }]} />
                    </View>
                </View>
                <View style={styles.statusBox}>
                    <Animated.View style={[styles.skeleton, { opacity, width: 24, height: 24, borderRadius: 4 }]} />
                    <Animated.View style={[styles.skeleton, { opacity, width: 100, height: 16, borderRadius: 4, marginLeft: 8 }]} />
                </View>
            </View>
        </View>
    );
};

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
    },
    statusBox: {
        width: '100%',
        height: 38,
        borderRadius: 14,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    skeleton: {
        backgroundColor: '#E0E0E0',
    }
});

export default LessonCardSkeleton;
