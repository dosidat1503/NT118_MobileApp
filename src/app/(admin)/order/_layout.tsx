import { Stack, Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import React from "react"
export default function OrderStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Orders',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        options={{
          title: 'Chi tiết đơn hàng',
          // headerShown: false,
          headerTitleAlign: 'center'
        }}
      />
    </Stack>
  )
}