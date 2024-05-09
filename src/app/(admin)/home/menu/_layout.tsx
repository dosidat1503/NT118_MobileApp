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
        name="editMenu"
        options={{
          title: 'Thiết lập thực đơn',
          headerShown: false
        }}
      >
      </Stack.Screen>
    </Stack>
  )
}