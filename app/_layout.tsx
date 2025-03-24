import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useToken } from "../hooks/useAuth";

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito: require('../assets/fonts/Nunito-VariableFont_wght.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { token, isLoading } = useToken(); // Теперь следим за `isLoading`

  useEffect(() => {
    console.log({ token });

    if (!isLoading) {
      if (!token) {
        router.replace('/Auth/CheckPhone');
      }
    }
  }, [isLoading, token]);

  if (isLoading) {
    return null; // Не рендерим ничего, пока загружается токен
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Auth/Login" options={{ headerShown: false }} />
        <Stack.Screen name="Auth/CheckPhone" options={{ headerShown: false }} />
        <Stack.Screen name="Auth/Otp" options={{ headerShown: false }} />
        <Stack.Screen name="Auth/Password" options={{ headerShown: false }} />
        <Stack.Screen name="Auth/NewPassword" options={{ headerShown: false }} />
        <Stack.Screen name="screens/PaymentHistory" options={{ headerShown: false }} />
        <Stack.Screen name="screens/MyProducts" options={{ headerShown: false }} />
        <Stack.Screen name="screens/Payment" options={{ headerShown: false }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

