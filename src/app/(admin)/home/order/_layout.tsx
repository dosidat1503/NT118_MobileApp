import { Stack, Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"

export default function OrderStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Shop',
          headerShown: false,
        }}
      />
    </Stack>
  )
}