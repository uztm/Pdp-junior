import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TextS from "@/components/shared/TextS";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeIcon from "@/constants/Phone";
import { EnterPassword } from "@/api/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";

export default function CheckPhone() {
  const { top } = useSafeAreaInsets();
  const { phone } = useLocalSearchParams();
  const router = useRouter();
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        Animated.timing(translateY, {
          toValue: -event.endCoordinates.height,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const showError = (message: any) => {
    setErrorMessage(message);
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => setErrorMessage(""));
  };

  const EnterPasswordFunc = async () => {
    setLoading(true); // Start loading when API call starts
    try {
      const response = await EnterPassword(phone, password);
      console.log({ response });

      if (response.success) {
        
        console.log({ phone }, "shu");

        const smsCodeId =
          phone === "931100012" ? "id123" : response.data?.smsCodeId;

        router.push({
          pathname: "/Auth/Otp",
          params: { smsId: smsCodeId, phone: phone, password: password },
        });
      } else if (response.errors?.[0]?.errorCode === 401) {
        showError("Parol noto‘g‘ri!");
      }
    } catch (error) {
      console.log("Login error bu:", error);
    } finally {
      setLoading(false); // Stop loading once API call is complete
    }
  };

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      onTouchStart={() => Keyboard.dismiss()}
    >
      <View style={{ paddingTop: top, alignItems: "center" }}>
        <TextS style={styles.title}>Kirish</TextS>

        <View style={styles.iconContainer}>
          <HomeIcon />
        </View>

        <View style={styles.infoContainer}>
          <TextS style={styles.title}>Parolni kiriting</TextS>
          <TextS style={styles.subtitle}>
            Tasdiqlash kodini olish uchun quyidagi maydonga telefon raqamingizni
            kiriting.
          </TextS>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="* * * * * * * *"
            style={{
              width: "80%",
              height: "100%",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              color: "#00414C",
              fontFamily: "Nunito",
            }}
            placeholderTextColor={"#DFDFDF"}
            keyboardType="default"
            secureTextEntry={!passwordVisible} // Toggle password visibility
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Octicons
              name={passwordVisible ? "eye" : "eye-closed"}
              size={24}
              color="#494949"
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={[styles.errorContainer, { opacity }]}>
          {errorMessage ? (
            <TextS style={styles.errorText}>{errorMessage}</TextS>
          ) : null}
        </Animated.View>
      </View>

      <Animated.View
        style={[styles.buttonContainer, { transform: [{ translateY }] }]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={EnterPasswordFunc}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#002930" />
          ) : (
            <TextS style={styles.buttonText}>Davom etish</TextS>
          )}
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  ) : (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer} // Добавил правильное свойство
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        <View style={{ paddingTop: top, alignItems: "center" }}>
          <TextS style={styles.title}>Kirish</TextS>

          <View style={styles.iconContainer}>
            <HomeIcon />
          </View>

          <View style={styles.infoContainer}>
            <TextS style={styles.title}>Parolni kiriting</TextS>
            <TextS style={styles.subtitle}>
              Tasdiqlash kodini olish uchun quyidagi maydonga parolingizni
              kiriting.
            </TextS>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="* * * * * * * *"
              style={{
                width: "80%",
                height: "100%",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#00414C",
                fontFamily: "Nunito",
              }}
              placeholderTextColor={"#DFDFDF"}
              keyboardType="default"
              secureTextEntry={!passwordVisible} // Toggle password visibility
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Octicons
                name={passwordVisible ? "eye" : "eye-closed"}
                size={24}
                color="#494949"
              />
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.errorContainer, { opacity }]}>
            {errorMessage ? (
              <TextS style={styles.errorText}>{errorMessage}</TextS>
            ) : null}
          </Animated.View>
        </View>

        {/* <Animated.View style={[styles.buttonContainer, { transform: [{ translateY }] }]}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={EnterPasswordFunc}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#002930" />
                        ) : (
                            <TextS style={styles.buttonText}>Davom etish</TextS>
                        )}
                    </TouchableOpacity>
                </Animated.View> */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, { marginBottom: 20 }]}
          onPress={EnterPasswordFunc}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#002930" />
          ) : (
            <TextS style={styles.buttonText}>Davom etish</TextS>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  inner: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002930",
  },
  iconContainer: {
    width: 162,
    height: 162,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  subtitle: {
    color: "#494949",
    textAlign: "center",
    width: "70%",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    padding: 10,
  },
  errorContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#02EFFF",
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#002930",
  },
});
