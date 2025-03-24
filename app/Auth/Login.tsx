import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { setToken } from "../../hooks/useAuth";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { updateUserId } from '@/hooks/useUser';




export default function Login() {
  const { phone } = useLocalSearchParams()

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNTVkMDc0MC1lZjFjLTQxOWEtNjgzMzEwZGQtZDFhOC00MzM3LTg4ODktZjg0OWE0N2JkNTI4LWFkNzAtYmZjNjJmMmFkNzZhIiwiaWF0IjoxNzM4OTQ3MTkyLCJleHAiOjE3NDE1MzkxOTJ9.dE_JeudY8KZWzLR_x1XThleap0u6lPLqAxrMJMp9pKg"

  const Router = useRouter()

  const handleLogin = async () => {
    try {
      await setToken(token)

      console.log('token added successfully');

      Router.replace('/(tabs)/(home)')
    } catch (err) {
      console.log(err)
    }
  }

  const { top, bottom } = useSafeAreaInsets()
  return (
    <View style={styles.container}>
      <Text>{phone}</Text>

      <Button title='login' onPress={handleLogin}>

      </Button>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'f2f2f2'
  }
})

// Add OTP Screen, Forgot Password Screen, and Sign Up Screen components here.