import { Stack, Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"

export default function SaleStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Shop',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createPizza"
        options={{
          title: 'Food creation',
          headerShown: false
        }}
      >
      </Stack.Screen>
    </Stack>
  )
}