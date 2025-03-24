import { Avater } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import TextS from "./TextS";
import { useUser } from "@/hooks/useUser";
import { useToken } from "@/hooks/useAuth";
import { useCallback, useState } from "react";
import { HomeType } from "@/types/type";
import { BASE_URL, getUserInfo } from "@/api/api";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

type props = {
    name: string;
    group: string;
    photoId: string;
}
const UserCard = ({ name, group, photoId }: props) => {


    // const nameParts = data.student.fullName.split(" ")
    // const firstName = nameParts[0];
    // const lastName = nameParts.slice(1).join(" ");

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.image}>
                   
                        <Image
                            source={{ uri: `${BASE_URL}/api/attachment/v1/attachment/download?id=${photoId}&view=open` }}
                            style={{ width: "100%", height: "100%" }}
                            contentFit="cover"
                            priority="high"
                            cachePolicy="memory-disk"
                        />
                    
                </View>
                <View>
                    <TextS style={styles.name}>{name}</TextS>

                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                <View style={[styles.image, { height: 10, backgroundColor: "transparent" }]}></View>
                <TextS style={styles.groupText}>{group}</TextS>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 121,
        backgroundColor: "#fff",
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderRadius: 14,
    },
    image: {
        width: 62,
        height: 62,
        borderRadius: 100,
        backgroundColor: "#f2f2f2",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    imageInner: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontSize: 24,
        marginLeft: 16,
        fontWeight: "bold",
    },
    groupText: {
        marginLeft: 18,
        color: "#00E0EF",
        fontWeight: "500",
    },
});

export default UserCard;
