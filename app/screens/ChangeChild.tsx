import { View, StyleSheet, Button } from "react-native";
import React from "react";
import { useUser, updateUserId, setUser } from "@/hooks/useUser";


export default function ChangeChild() {
    const { user, setUserState } = useUser(); // 👈 Теперь есть setUserState

    
    const handleUpdateId = async (id: string) => {
        await updateUserId(id, setUserState); // 👈 Передаём setUserState
     
    };

    const handleCreateUser = async () => {
        await setUser("Moxirjon Komilov",  "F12 Frontend", setUserState);
    };

    return (
        <View style={styles.container}>
            <Button title="1 id => Abdumalik Maxammadsobitov dc1a" onPress={() => handleUpdateId("2029ba5c-1ecc-46fe-9a91-842a1771dc1a")} />
            <Button title="2 id => Kamoliddin Komilov dc60" onPress={() => handleUpdateId("38bcbdf6-af51-43d3-b042-99388893dc60")} />
            <Button title="3 id => Moxirjon Komilov e743" onPress={() => handleUpdateId("94fd71ff-77e9-4916-9d27-88ab161ae743")} />

            <Button title="Create User" onPress={handleCreateUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
});
