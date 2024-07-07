import { Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import ListVouchers from "./listVouchers"
import EditVoucherScreen from "./editVoucher"

const Stack = createStackNavigator();

export default function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="listVouchers"
        options={{ headerShown: false }}
        component={ListVouchers}
      />
      <Stack.Screen
        name="editVoucher"
        options={{ headerShown: false }}
        component={EditVoucherScreen}
      />
    </Stack.Navigator>
  )
}