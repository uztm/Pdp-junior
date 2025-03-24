import { Avater } from "@/constants/images";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import TextS from "./TextS";
import { setUser, useUser } from "@/hooks/useUser";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "@/api/api";
import { Feather } from "@expo/vector-icons";


type Prop = {
    name: string;
    group: string;
    photoId?: string | null;
}

const UserHome = ({ name, group, photoId }: Prop) => {
    const getName = (custom: string) => {
        if (!custom) return ["", ""];

        const nameParts = custom.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        return [firstName, lastName];
    };

    const { user, setUserState } = useUser(); // 👈 Теперь есть setUserState

    const set = async () => {
        await setUser(name, group, setUserState);
    }

    useFocusEffect(
        useCallback(() => {
            set()
        }, []) // Теперь зависимость корректная
    );
    const [firstName, lastName] = getName(name);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.image}>
                    {photoId === null ?
                        <Feather name="user" size={28} color="#fff" />
                        :
                        <Image
                            source={{ uri: `${BASE_URL}/api/attachment/v1/attachment/download?id=${photoId}&view=open` }}
                            style={{ width: "100%", height: "100%" }}
                            contentFit="cover"
                            priority="high"
                            cachePolicy="memory-disk"
                        />
                    }


                </View>
                <View>
                    <TextS style={styles.name}>{firstName} {`\n`}{lastName}</TextS>
                    
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                <View style={[styles.image, { height: 10, backgroundColor: "transparent" }]}></View>
                <TextS style={{ marginLeft: 18, color: "#00E0EF", fontWeight: "500" }}>{group}</TextS>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        
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
    name: {
        fontSize: 28,
        marginLeft: 16,
        fontWeight: "bold",
    },
});

export default UserHome;
