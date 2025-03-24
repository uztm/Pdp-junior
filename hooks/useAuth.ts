import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useToken = () => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("auth_token");
        setTokenState(storedToken);
      } catch (error) {
        console.error("Failed to load token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  return { token, isLoading };
};

export const setToken = async (token: string | null) => {
  try {
    if (token) {
      await AsyncStorage.setItem("auth_token", token);
    } else {
      await AsyncStorage.removeItem("auth_token");
    }
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};
