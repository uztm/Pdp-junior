import { Eco, Sch, Uni } from "@/constants/images";
import { Image } from "expo-image";
import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Dimensions, Animated } from "react-native";

const banners = [
    { id: "1", color: "red", image: Eco },
    { id: "2", color: "green", image: Sch },
    { id: "3", color: "blue", Image: Uni },
];

const { width } = Dimensions.get("window");
const ITEM_GAP = 5; // Отступ между баннерами
const ITEM_WIDTH = width * .9; // Динамическая ширина баннера
const TOTAL_WIDTH = ITEM_WIDTH + ITEM_GAP; // Полная ширина с учетом отступов

const Carousel = () => {
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % banners.length;

            flatListRef.current?.scrollToOffset({
                offset: nextIndex * TOTAL_WIDTH,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View style={{ width, height: 120, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <FlatList
                ref={flatListRef}
                data={banners}
                horizontal
                keyExtractor={(item) => item.id}
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={TOTAL_WIDTH} // Фиксация на каждом баннере
                decelerationRate="fast"
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: ITEM_WIDTH,
                            height: 90,
                            backgroundColor: item.color,
                            marginHorizontal: ITEM_GAP / 2,
                            borderRadius: 10,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            key={item.id}
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                            
                        />
                    </View>
                )}
                contentContainerStyle={{
                    paddingHorizontal: (width - ITEM_WIDTH) / 2,
                }}
            />
        </View>
    );
};

export default Carousel;
