import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import React, { useCallback, useState } from 'react';
import TextS from '@/components/shared/TextS';
import { BASE_URL, exchange, getShop, getUserInfo } from '@/api/api';
import { useToken } from '@/hooks/useAuth';
import { Shop } from '@/types/type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Logo } from '@/constants/images';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '@/hooks/useUser';

type Coin = {
    activeCoin: number;
};

export default function Index() {
    const [data, setData] = useState<Shop[]>([]);
    const { token } = useToken();
    const [activeCoin, setActiveCoin] = useState<Coin | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Shop | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [messageOpacity] = useState(new Animated.Value(0));  // For the fade-in effect

    const [isSuccessVisible, setIsSuccessVisible] = useState(false)
    const { user } = useUser();

    const get = async () => {
        try {
            const response = await getShop(token);
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async (id: string) => {
        if (token && id) {
            try {
                const response = await getUserInfo(token, id);
                setActiveCoin(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (token && user?.id) {
                get();
                fetchData(user.id);
            }
        }, [token, user?.id])
    );

    const handleExchange = (item: Shop) => {
        setSelectedProduct(item);
        setModalVisible(true);
    };

    const confirmExchange = async () => {
        if (user?.id && selectedProduct?.id) {
            console.log(`User ID: ${user.id}, Product ID: ${selectedProduct.id}`);
            const response = await exchange(token, user?.id, selectedProduct.id);

            if (response.success) {
                // Set the success message and show it
                setSuccessMessage("Sovga muvafaqiyatli kabul qilindi");
                setIsSuccessVisible(true);

                // Hide modal after a delay
                setTimeout(() => {
                    setModalVisible(false);
                    setIsSuccessVisible(false); // Hide the success message after the animation
                }, 2000); // Hide after 2 seconds
            }
        }
    };

    const { top } = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
                <View style={styles.header}>
                    <TextS style={styles.title}>Shop</TextS>
                    <Image source={{ uri: Logo }} style={styles.logo} contentFit="cover" />
                </View>
            </View>

            <View style={{ width: '100%', paddingHorizontal: 20, marginVertical: 10 }}>
                <View style={{ width: 'auto', backgroundColor: '#F9FFF4', borderWidth: 1, borderRadius: 16, borderColor: '#6FDD00', padding: 20 }}>
                    <TextS style={{ fontSize: 18, fontWeight: 'bold', color: '#6FDD00', }}>Balans: {activeCoin?.activeCoin}</TextS>
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.itemsContainer}>
                    {data.map(item => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: `${BASE_URL}/api/attachment/v1/attachment/download?id=${item.fileId}&view=open` }}
                                    style={styles.image}
                                    contentFit="cover"
                                />
                            </View>
                            <TextS style={styles.coinText}>{item.coinCost} coin</TextS>
                            <TextS style={styles.nameText}>{item.name}</TextS>
                            <TouchableOpacity
                                style={styles.exchangeButton}
                                activeOpacity={0.7}
                                onPress={() => handleExchange(item)}
                            >
                                <TextS style={styles.buttonText}>Almashtirish</TextS>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Modal */}
            <Modal transparent={true} visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedProduct && (
                            <>
                                <View style={{ padding: 20, backgroundColor: '#f2f2f2', borderRadius: 10 }}>
                                    <Image
                                        source={{ uri: `${BASE_URL}/api/attachment/v1/attachment/download?id=${selectedProduct.fileId}&view=open` }}
                                        style={styles.modalImage}
                                        contentFit="cover"
                                    />
                                </View>
                                <TextS style={styles.modalText}>{selectedProduct.name}</TextS>
                                <TextS style={styles.modalCoinText}>{selectedProduct.coinCost} coin</TextS>

                                {activeCoin && activeCoin.activeCoin < selectedProduct.coinCost ? (
                                    <TextS style={styles.errorText}>Ushbu sovg'ani olish uchun sizda <TextS style={{color: '#02EFFF'}}>{selectedProduct.coinCost - activeCoin.activeCoin} Coin</TextS> yetarli emas</TextS>
                                ) : (
                                    <TouchableOpacity style={styles.confirmButton} onPress={confirmExchange}>
                                        <TextS style={styles.buttonText}>Tasdiqlash</TextS>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <TextS style={styles.cancelButtonText}>Bekor qilish</TextS>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Success message */}
            {successMessage && (
                <Animated.View style={[styles.successMessageContainer, { opacity: messageOpacity }]}>
                    <TextS style={styles.successMessageText}>{successMessage}</TextS>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
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
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 2,
    },
    card: {
        width: '49%',
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        borderRadius: 16,
    },
    imageContainer: {
        width: '100%',
        height: 150,
        borderRadius: 14,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 16,
    },
    coinText: {
        fontWeight: 'bold',
        color: '#EA4017',
        fontSize: 18,
        marginTop: 5,
    },
    nameText: {
        color: '#00E0EF',
        fontWeight: '500',
        fontSize: 18,
    },
    exchangeButton: {
        width: '100%',
        backgroundColor: '#CFFCFF',
        height: 26,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#002930',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    modalImage: {
        width: 200,
        aspectRatio: 1,
        borderRadius: 16,
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    modalCoinText: {
        fontSize: 18,
        color: '#EA4017',
    },
    errorText: {
        color: '#848A9C',
        marginTop: 10,
        width: 230,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#00E0EF',
        padding: 10,
        borderRadius: 100,
        marginTop: 10,
        width: 240,
        alignItems: 'center',
    },
    cancelButton: {
        marginTop: 10,
        width: 240,
        alignItems: 'center',
        backgroundColor: '#FFF4F4',
        borderRadius: 100,
        padding: 10,
        borderWidth: 1,
        borderColor: '#FF896D',
    },
    cancelButtonText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18
    },
    successMessageContainer: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#00E0EF',
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 240,
    },
    successMessageText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
