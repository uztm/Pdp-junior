import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Интерфейс данных пользователя
interface UserInfo {
  fullName: string;
  id: string;
  group: string;
  phoneNumber: string;
}

export const useUser = () => {
  const [user, setUserState] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    console.log("🔄 Reloading user info from AsyncStorage...");
    try {
      const storedFullName = await AsyncStorage.getItem("user_fullName");
      const storedId = await AsyncStorage.getItem("user_id");
      const storedGroup = await AsyncStorage.getItem("user_group");
      const storedPhoneNumber = await AsyncStorage.getItem("phone_number");

      if (storedFullName && storedId && storedGroup && storedPhoneNumber) {
        console.log("✅ User info loaded:", { storedFullName, storedId, storedGroup });
        setUserState({ fullName: storedFullName, id: storedId, group: storedGroup, phoneNumber: storedPhoneNumber });
      } else {
        console.log("⚠️ No user info found.");
        setUserState(null);
      }
    } catch (error) {
      console.error("❌ Failed to load user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadUser(); }, []));

  useEffect(() => { loadUser(); }, []);

  return { user, isLoading, setUserState };
};

export const setUser = async (fullName: string, group: string, setUserState: Function) => {
  console.log("Setting user info...");
  try {
    await AsyncStorage.setItem("user_fullName", fullName);
    await AsyncStorage.setItem("user_group", group);
    console.log("✅ User info saved:", { fullName, group });
    setUserState((prevUser: UserInfo | null) => prevUser ? { ...prevUser, fullName, group } : null);
  } catch (error) {
    console.error("❌ Failed to save user info:", error);
  }
};

export const setPhoneNumber = async (phone: string, setUserState: Function) => {
  console.log("Updating phone number...");
  try {
    await AsyncStorage.setItem("phone_number", phone);
    console.log("✅ Phone number updated:", phone);
    setUserState((prevUser: UserInfo | null) => prevUser ? { ...prevUser, phoneNumber: phone } : null);
  } catch (error) {
    console.error("❌ Failed to update phone number:", error);
  }
};

export const updateUserId = async (id: string, setUserState: Function) => {
  console.log("🔄 Updating user ID...");
  try {
    await AsyncStorage.setItem("user_id", id);
    console.log("✅ User ID updated:", id);
    setUserState((prevUser: UserInfo | null) => prevUser ? { ...prevUser, id } : null);
  } catch (error) {
    console.error("❌ Failed to update user ID:", error);
  }
};

export const removeUser = async (setUserState: Function) => {
  console.log("🗑 Removing user info...");
  try {
    await AsyncStorage.multiRemove(["user_fullName", "user_id", "user_group", "phone_number"]);
    setUserState(null);
    console.log("✅ User info removed successfully.");
  } catch (error) {
    console.error("❌ Failed to remove user info:", error);
  }
};
